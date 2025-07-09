import _ from "lodash";

interface NavItem {
  _key: string;
  typeOfLink: "href" | "page";
  text: string;
  title: string | null;
  slug?: string;
  sectionId?: string;
  externalUrl?: string;
  navUrl?: string;
}

export function navUrlProcessor(
  navItems: NavItem[],
  homepageSlug: string,
): NavItem[] {
  return navItems
    .filter((item) => item.text) // Filter out items with no text
    .map((item) => {
      if (item.typeOfLink === "href") {
        item.navUrl = item.externalUrl;
        return item;
      } else if (item.typeOfLink === "page") {
        let path = item.slug === homepageSlug ? "" : item.slug;
        if (item.sectionId && item.sectionId !== "initial") {
          item.navUrl = `/#${_.kebabCase(item.sectionId)}`;
          return item;
        } else {
          item.navUrl = `/${path}`;
          return item;
        }
      }
      return item; // Default case to handle any other typeOfLink values
    });
}
