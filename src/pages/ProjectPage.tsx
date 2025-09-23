import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, projectBySlugQuery, urlFor } from "@/lib/sanity";
import type { Project } from "@/lib/sanity-types";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react"; // <-- IMPORT THIS

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function getProject() {
      try {
        const data = await client.fetch<Project>(projectBySlugQuery, { slug });
        if (!data) {
          navigate("/404", { replace: true });
        } else {
          setProject(data);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }
    getProject();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return null;
  }

  // Use `coverImage`
  const headerImageUrl = project.coverImage?.asset?._ref
    ? urlFor(project.coverImage).width(1920).height(1080).url()
    : `/placeholder.svg`;

  return (
    <div>
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${headerImageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2">
          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            Read More
          </Button>
        </div>
      </div>

      <div className="bg-black text-white py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-6 md:mb-8 text-center text-balance">
            {project.title}
          </h1>

          {/* This is the new part: Render the portable text content */}
          {project.content && (
            <div className="prose prose-invert prose-lg mx-auto text-white/80 space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed">
              <PortableText value={project.content} />
            </div>
          )}
          {/* All old fields like description, technologies, etc. are now removed */}
        </div>
      </div>
    </div>
  );
}
