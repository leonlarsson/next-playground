import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import projects from "../data";
import ProjectsGrid from "../components/ProjectsGrid";
import Tag from "../components/Tag";
import GradientBorder from "../../components/GradientBorder";

const getProject = (slug: string) => projects.find(project => project.slug === slug);

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const project = getProject(params.slug);

  const pageTitle = `${project?.name ?? "Project #404"} | Leon San José Larsson`;
  const pageDescription = project?.shortDescription ?? "You found Project #404.";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      type: "website",
      url: `https://leonlarsson.com/projects/${params.slug}`,
      title: pageTitle,
      description: pageDescription
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      creator: "@mozzyfx"
    }
  };
};

export default ({ params }: { params: { slug: string } }) => {
  const project = getProject(params.slug);
  const previousProject = project && projects[projects.indexOf(project) - 1];
  const nextProject = project && projects[projects.indexOf(project) + 1];

  return (
    <div>
      <div className="mx-auto mb-2 flex w-full max-w-5xl justify-between font-light text-neutral-800 dark:text-neutral-300 max-[400px]:text-sm">
        <div className="w-1/3 text-start">
          {previousProject && (
            <Link className="underline-offset-2 transition-all hover:font-normal hover:text-black hover:underline dark:hover:text-kinda-white" href={`/projects/${previousProject.slug}`} title={`Previous project, ${previousProject.name}.`} draggable={false}>
              <i className="fa-solid fa-arrow-left me-1" />
              Previous
            </Link>
          )}
        </div>

        <div className="w-1/3 text-center">
          <Link className="underline-offset-2 transition-all hover:font-normal hover:text-black hover:underline dark:hover:text-kinda-white" href="/projects" title={"Go back to all projects."} draggable={false}>
            All projects
          </Link>
        </div>

        <div className="w-1/3 text-end">
          {nextProject && (
            <Link className="underline-offset-2 transition-all hover:font-normal hover:text-black hover:underline dark:hover:text-kinda-white" href={`/projects/${nextProject.slug}`} title={`Next project, ${nextProject.name}.`} draggable={false}>
              Next
              <i className="fa-solid fa-arrow-right ms-1" />
            </Link>
          )}
        </div>
      </div>

      {project ? (
        <div>
          <span className="text-[2rem] font-extrabold transition-all max-sm:text-2xl">{project.name}</span>

          <p className="whitespace-pre-line">{project.description}</p>

          {project.tags && (
            <div className="mb-3 mt-1 flex flex-wrap justify-center gap-1">
              {project.year && <Tag tag={project.year} clickable />}
              {project.tags
                .sort((a, b) => a.localeCompare(b))
                .map(tag => (
                  <Tag key={tag} tag={tag} clickable />
                ))}
            </div>
          )}

          {/* Conditionally render project links */}
          {(project.link || project.githubLink || project.extraLinks) && (
            <>
              <span className="text-lg font-bold">Links:</span>
              <div className="flex flex-wrap justify-center gap-2">
                {project.link && (
                  <Link href={project.link} target={!project.link.startsWith("http") ? "_self" : "_blank"} className="button-with-border" draggable={false}>
                    {project.linkName ?? "Go to project"} <i className="fa-solid fa-link" />
                  </Link>
                )}

                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" className="button-with-border" draggable={false}>
                    Go to GitHub <i className="fa-brands fa-github" />
                  </a>
                )}

                {project.extraLinks?.map(extraLink => (
                  <a key={extraLink.link} href={extraLink.link} target="_blank" className="button-with-border" draggable={false}>
                    {extraLink.name} <i className={extraLink.type === "link" ? "fa-solid fa-link" : "fa-brands fa-github"} />
                  </a>
                ))}
              </div>
            </>
          )}

          {/* Only render preview if project.link exists */}
          {!project.hidePreview && project.link && (
            <GradientBorder extraClasses="mt-5">
              <details className="rounded transition-colors">
                <summary className="cursor-pointer p-2 text-lg font-semibold text-white">Preview {project.slug === "leon-home" && "(Inception style)"}</summary>
                <iframe src={project.link} className="h-[500px] w-full rounded bg-white lg:h-[500px] xl:h-[700px]"></iframe>
              </details>
            </GradientBorder>
          )}

          {/* Only render images if the exist */}
          {project.images && (
            <div className="mt-5">
              <span className="text-lg font-bold">Image{project.images.length > 1 && "s"}:</span>

              {/* Style: display as many cols as there are images */}
              <div className={`container mx-auto grid gap-2 ${project.images.length === 1 ? "grid-cols-1" : ""} ${project.images.length === 2 ? "grid-cols-2" : ""} ${project.images.length === 3 ? "grid-cols-3" : ""} max-lg:grid-cols-1`}>
                {project.images.map((image, index) => (
                  <div key={index} className="w-full rounded">
                    {/* Style: Only use w-full if more than 1 image and on lg and up. Lower than lg means 1 col, where we should not stretch images */}
                    <Image src={image} quality={100} alt={`Project image for ${project.name}.`} className={`m-auto ${project.images!.length > 1 ? "lg:w-full" : ""} rounded-lg border border-kinda-black dark:border-kinda-white/50`} priority placeholder="blur" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-1 flex flex-col gap-2">
          <div className="text-red-500 dark:text-red-400">
            Project <span className="rounded bg-black p-1 font-semibold text-white dark:bg-kinda-white dark:text-kinda-black">{decodeURIComponent(params.slug)}</span> not found
          </div>

          {projects.filter(project => project.slug.includes(params.slug)).length > 0 && (
            <div>
              <span>Maybe you were looking for:</span>
              <ProjectsGrid projects={projects.filter(project => project.slug.includes(params.slug))} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
