import { portfolioData, Project, Skill, Experience } from "@/data";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "https://cms.strapi-emir.my.id";

type StrapiListResponse<T> = { data: T[] };
type StrapiSingleResponse<T> = { data: T | null };

async function strapiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${path}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/* ---------- media helpers ---------- */

function mediaUrl(cover: any): string | undefined {
  const url: string | undefined = cover?.url ?? cover?.data?.attributes?.url;
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
  return {
    id: key,
    title: row.title ?? fb?.title ?? "",
    description: row.description ?? fb?.description ?? "",
    longDescription: row.longDescription ?? fb?.longDescription,
    image: mediaUrl(row.cover) ?? fb?.image,
    tech: Array.isArray(row.techStack) ? row.techStack : fb?.tech ?? [],
    category:
      CATEGORY_MAP[String(row.category ?? "").toLowerCase()] ??
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
  const [profileRes, projectsRes, expRes, skillRes] = await Promise.all([
    strapiGet<StrapiSingleResponse<any>>("profile"),
    strapiGet<StrapiListResponse<any>>(
      "projects?populate=cover&sort=order:asc&pagination[pageSize]=100"
    ),
    strapiGet<StrapiListResponse<any>>("experiences?sort=order:asc"),
    strapiGet<StrapiListResponse<any>>("skill-categories?sort=order:asc"),
  ]);

  const data: PortfolioData = JSON.parse(JSON.stringify(portfolioData));

  // personalInfo
  const p = profileRes?.data as any;
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

  // projects: Strapi is the source of truth; static entries only fill field gaps (by id/slug)
  const projectRows = projectsRes?.data ?? [];
  if (projectRows.length) {
    const fallbackById = new Map(portfolioData.projects.map((pr) => [pr.id, pr]));
    data.projects = projectRows.map((r) => mapProject(r, fallbackById));
  }

  // experiences
  const expRows = expRes?.data ?? [];
  if (expRows.length) data.experiences = expRows.map(mapExperience);

  // skills
  const skillRows = skillRes?.data ?? [];
  if (skillRows.length) data.skills = mapSkills(skillRows);

  // strip `undefined` so Next.js can serialize the props
  return JSON.parse(JSON.stringify(data)) as PortfolioData;
}
