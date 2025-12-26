import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mazeegroup.net";

  // Static pages
  const routes = ["", "/all-product", "/all-projects", "/catalog"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  // Project pages - შენი პროექტებიდან
  const projects = [
    { id: 1, slug: "hilton-baku" },
    { id: 2, slug: "park-hotel-tsinandali" },
    { id: 3, slug: "radisson-blu-batumi" },
    // დანარჩენი პროექტები...
  ].map((project) => ({
    url: `${baseUrl}/project-detail/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projects];
}
