import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/lib/api";
import _ from "lodash";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

type Project = {
  id: number; // Unique identifier for the project
  name: string; // Name of the project
  // Add more fields as necessary
};

export function splitGalleryData(projects: Project[], numGalleries: 2 | 4) {
  const chunks: Project[][] = Array.from({ length: numGalleries }, () => []);

  projects.forEach((project, index) => {
    const galleryIndex = index % numGalleries;
    chunks[galleryIndex].push(project);
  });

  return chunks;
}
export const animateIn =
  "intersect-full intersect:motion-blur-in-md intersect:motion-translate-y-in-25 intersect:motion-opacity-in-0 fill-both";

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: any | undefined) {
  if (!link) return null;

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = "href";
  }

  switch (link.linkType) {
    case "href":
      return link.href || null;
    case "page":
      if (link?.page) {
        let path =
          link.page?.slug?.current === "home"
            ? "/"
            : `/${link.page?.slug?.current}`;

        if (link.linkToSection && link.linkToSection !== "initial") {
          return `${path}/#${_.kebabCase(link.linkToSection)}`;
        } else {
          return `${path}`;
        }
      }
    /*       if (link?.page) {
        return `/${link.page?.slug?.current}`;
      }
      return null; */
    case "post":
      if (link?.post) {
        return `/posts/${link.post}`;
      }
      return null;
    default:
      return null;
  }
}
