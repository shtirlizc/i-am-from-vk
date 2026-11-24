import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const routes = defineCollection({
  loader: glob({
    base: "./src/content/routes",
    pattern: "*/index.md",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string().trim().min(1),
      position: z.string().trim().min(1),
      city: z.string().trim().min(1),
      image: image().optional(),
      message: z.string().default(""),
      tags: z.array(z.string().trim().min(1)).default([]),
    }),
});

export const collections = { routes };
