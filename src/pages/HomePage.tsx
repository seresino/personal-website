import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client, projectsQuery, urlFor } from "@/lib/sanity";
import type { Project } from "@/lib/sanity-types";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ... useEffect logic is unchanged ...
    async function getProjects() {
      try {
        const data = await client.fetch<Project[]>(projectsQuery);
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    // --- THIS IS THE KEY FIX ---
    // We make this div a full-height, scrolling container and apply the snap type here.
    <div className="relative w-full h-screen overflow-y-auto snap-y snap-mandatory">
      {projects
        .filter((project) => project.slug && project.slug.current)
        .map((project) => {
          const imageUrl = project.coverImage?.asset?._ref
            ? urlFor(project.coverImage).width(1920).height(1080).url()
            : `/placeholder.svg`;

          return (
            <Link
              key={project._id}
              to={`/${project.projectType}/${project.slug.current}`}
              // The `snap-start` class on the direct children now works perfectly.
              className="block relative h-screen w-full cursor-pointer snap-start"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            </Link>
          );
        })}
    </div>
  );
}
