import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  // Remember to use environment variables in a real project!
  // projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  projectId: "dlpmtshq",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-09-23",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export const projectsQuery = `*[_type == "project"] | order(title asc) {
  _id,
  title,
  slug,
  projectType,
  coverImage
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  projectType,
  coverImage,
  content,
  videos[],
  gallery[]
}`;

// This query for the About page is still correct
export const aboutQuery = `*[_type == "about"][0] {
  _id,
  title,
  content,
  profileImage,
  email,
  instagram
}`;
