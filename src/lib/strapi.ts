import { portfolioData, Project, Skill, Experience } from "@/data";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "https://cms.strapi-emir.my.id";

async function strapiGet<T>(query: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${query}`, {
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

/* ---------- helpers ---------- */

function mediaUrl(media: any): string | undefined {
  const url: string | undefined = media?.url ?? media?.data?.attributes?.url;
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function formatMonth(d?: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  return isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const CATEGORY_MAP: Record<string, Project["category"]> = {
  frontend: "Frontend",
  fullstack: "Fullstack",
  mobile: "Creative",
  creative: "Creative",
};

/* ---------- mappers ---------- */

function mapProject(row: any, fallbackById: Map<string, Project>): Project {
  const key = String(row.slug ?? row.id);
  const fb = fallbackById.get(key);
  return {
    id: key,
    title: row.title ?? fb?.title ?? "",
    description: row.shortDescription ?? fb?.description ?? "",
    longDescription: row.fullDescription ?? fb?.longDescription,
    image: mediaUrl(row.featuredImage) ?? fb?.image,
    tech:
      Array.isArray(row.techStack) && row.techStack.length
        ? row.techStack
        : fb?.tech ?? [],
    category:
      CATEGORY_MAP[String(row.category ?? "").toLowerCase()] ??
      fb?.category ??
      "Frontend",
    liveUrl: row.liveUrl ?? fb?.liveUrl,
    githubUrl: row.githubUrl ?? fb?.githubUrl,
    featured: row.isFeatured ?? fb?.featured ?? false,
  };
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
    for (const name of Array.isArray(cat.skills) ? cat.skills : []) {
      out.push({ name, category, level: 4 });
    }
  }
  return out;
}

/* ---------- public API ---------- */

export type PortfolioData = typeof portfolioData;

export async function getPortfolioData(): Promise<PortfolioData> {
  const [profileRes, projRes, expRes, skillRes] = await Promise.all([
    strapiGet<any>(`emirzaki-profile?populate=*`),
    strapiGet<any>(
      `emirzaki-projects?populate=featuredImage&sort=order:asc&pagination[pageSize]=100`
    ),
    strapiGet<any>(`emirzaki-experiences?sort=order:asc`),
    strapiGet<any>(`emirzaki-skills?sort=order:asc`),
  ]);

  const data: PortfolioData = JSON.parse(JSON.stringify(portfolioData));

  // personalInfo <- emirzaki-profile single type
  const p = profileRes?.data;
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

  // projects
  const projectRows: any[] = projRes?.data ?? [];
  if (projectRows.length) {
    const fallbackById = new Map(portfolioData.projects.map((pr) => [pr.id, pr]));
    const fromStrapi = projectRows.map((r) => mapProject(r, fallbackById));
    const ids = new Set(fromStrapi.map((pr) => pr.id));
    const extras = portfolioData.projects.filter((pr) => !ids.has(pr.id));
    data.projects = [...fromStrapi, ...extras];
  }

  // experiences
  const expRows: any[] = expRes?.data ?? [];
  if (expRows.length) data.experiences = expRows.map(mapExperience);

  // skills
  const skillRows: any[] = skillRes?.data ?? [];
  if (skillRows.length) data.skills = mapSkills(skillRows);

  return JSON.parse(JSON.stringify(data)) as PortfolioData;
}
