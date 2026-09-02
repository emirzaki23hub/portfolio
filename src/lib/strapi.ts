import { portfolioData, Project, Skill, Experience } from "@/data";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "https://cms.strapi-emir.my.id";

const SITE_SLUG = process.env.NEXT_PUBLIC_STRAPI_SITE_SLUG || "emirzaki";

type StrapiSingleResponse<T> = { data: T | null };

async function strapiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(process.env.STRAPI_API_TOKEN
          ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
          : {}),
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/* ---------- media helpers ---------- */

function mediaUrl(media: any): string | undefined {
  const url: string | undefined = media?.url ?? media?.data?.attributes?.url;
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

/* ---------- mappers ---------- */

const CATEGORY_MAP: Record<string, Project["category"]> = {
  frontend: "Frontend",
  fullstack: "Fullstack",
  mobile: "Creative",
  creative: "Creative",
};

function mapProject(row: any, fallbackById: Map<string, Project>): Project {
  const key = String(row.slug ?? row.id);
  const fb = fallbackById.get(key);
  const services: string[] = Array.isArray(row.services) ? row.services : [];
  return {
    id: key,
    title: row.title ?? fb?.title ?? "",
    description: row.description ?? fb?.description ?? "",
    longDescription: row.longDescription ?? fb?.longDescription,
    image: mediaUrl(row.cover) ?? fb?.image,
    tech: services.length ? services : fb?.tech ?? [],
    category:
      CATEGORY_MAP[String(services[0] ?? "").toLowerCase()] ??
      fb?.category ??
      "Frontend",
    liveUrl: row.url ?? fb?.liveUrl,
    githubUrl: row.githubUrl ?? fb?.githubUrl,
    featured: row.featured ?? fb?.featured ?? false,
  };
}

function formatMonth(d?: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function mapExperience(row: any): Experience {
  const start = formatMonth(row.startDate);
  const end = row.current ? "Present" : formatMonth(row.endDate);
  return {
    role: row.role ?? "",
    company: row.company ?? "",
    location: row.location ?? "",
    period: [start, end].filter(Boolean).join(" – "),
    description: Array.isArray(row.responsibilities) ? row.responsibilities : [],
  };
}

function mapSkills(rows: any[]): Skill[] {
  const out: Skill[] = [];
  for (const cat of rows) {
    const category = cat.name as Skill["category"];
    const skills: string[] = Array.isArray(cat.skills) ? cat.skills : [];
    for (const name of skills) out.push({ name, category, level: 4 });
  }
  return out;
}

/* ---------- public API ---------- */

export type PortfolioData = typeof portfolioData;

export async function getPortfolioData(): Promise<PortfolioData> {
  const res = await strapiGet<StrapiSingleResponse<any>>(
    `sites/by-slug/${SITE_SLUG}`
  );
  const site = res?.data;

  const data: PortfolioData = JSON.parse(JSON.stringify(portfolioData));
  if (!site) return data; // CMS down / not found -> static fallback

  // personalInfo
  const p = site.profile;
  if (p) {
    data.personalInfo = {
      ...data.personalInfo,
      name: p.fullName ?? data.personalInfo.name,
      title: p.title ?? data.personalInfo.title,
      subtitle: p.tagline ?? data.personalInfo.subtitle,
      location: p.location ?? data.personalInfo.location,
      email: p.email ?? data.personalInfo.email,
      whatsapp: p.whatsappNumber
        ? `https://wa.me/${String(p.whatsappNumber).replace(/\D/g, "")}`
        : data.personalInfo.whatsapp,
      github: p.githubUrl || data.personalInfo.github,
      linkedin: p.linkedinUrl || data.personalInfo.linkedin,
      bio: p.bio ?? data.personalInfo.bio,
      detailedBio: p.bio ?? data.personalInfo.detailedBio,
    };
  }

  // projects: Strapi first, static entries fill any gaps (by id/slug)
  const projectRows: any[] = Array.isArray(site.projects) ? site.projects : [];
  if (projectRows.length) {
    const fallbackById = new Map(portfolioData.projects.map((pr) => [pr.id, pr]));
    const fromStrapi = [...projectRows]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((r) => mapProject(r, fallbackById));
    const strapiIds = new Set(fromStrapi.map((pr) => pr.id));
    const extras = portfolioData.projects.filter((pr) => !strapiIds.has(pr.id));
    data.projects = [...fromStrapi, ...extras];
  }

  // experiences
  const expRows: any[] = Array.isArray(site.experiences) ? site.experiences : [];
  if (expRows.length) {
    data.experiences = [...expRows]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(mapExperience);
  }

  // skills
  const skillRows: any[] = Array.isArray(site.skillCategories)
    ? site.skillCategories
    : [];
  if (skillRows.length) {
    data.skills = mapSkills(
      [...skillRows].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    );
  }

  // strip `undefined` so Next.js can serialize the props
  return JSON.parse(JSON.stringify(data)) as PortfolioData;
}
