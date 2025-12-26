import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mazeegroup.net";

  // Static pages
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/all-product`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/all-projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/welcome`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Project pages - დინამიური პროექტები
  const projectRoutes = [
    { id: 1, slug: "hilton-baku" },
    { id: 2, slug: "park-hotel-tsinandali" },
    { id: 3, slug: "radisson-blu-batumi" },
    { id: 4, slug: "wyndham-batumi" },
    { id: 5, slug: "mgallery-tbilisi" },
    { id: 6, slug: "rooms-hotel-kazbegi" },
    { id: 7, slug: "stamba-hotel" },
    { id: 8, slug: "biltmore-tbilisi" },
  ].map((project) => ({
    url: `${baseUrl}/project-detail/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Catalog pages - თუ გაქვს დინამიური კატეგორიები
  const catalogRoutes = [
    { id: 1, name: "furniture" },
    { id: 2, name: "lighting" },
    { id: 3, name: "decor" },
    // დაამატე შენი კატეგორიები
  ].map((category) => ({
    url: `${baseUrl}/catalog/${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...catalogRoutes];
}
