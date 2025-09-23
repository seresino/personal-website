export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

// Keep this for the About page
export interface About {
  _id: string;
  title: string;
  content: string;
  profileImage?: SanityImage;
  email: string;
  instagram: string;
}

// UPDATED Project interface to match your schema
export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  projectType: "film" | "code";
  coverImage: SanityImage;
  content: any[]; // This will hold the Portable Text content
}
