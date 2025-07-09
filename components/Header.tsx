import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  HEADER_NAVIGATION_QUERY,
  HOME_PAGES_SLUGS,
  HOMEPAGE_QUERY,
} from "@/sanity/lib/queries";
import { GET_NAV_LINKS, settingsQuery } from "@/sanity/lib/queries";

import { sanityFetch } from "@/sanity/lib/live";
import Link from "next/link";
import React from "react";
import { navUrlProcessor } from "@/lib/helpers";
import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { cn } from "@/lib/utils";
import ResolvedLink from "./ResolvedLink";

export default async function Header({ headerTheme }: { headerTheme: string }) {
  const {
    data: {
      header: { navigation, websiteTitle },
      settings: { brandAssets },
    },
  } = await sanityFetch({
    query: HEADER_NAVIGATION_QUERY,
  });

  const { data } = await sanityFetch({
    query: HOME_PAGES_SLUGS,
  });

  // Extract the slug from the first item in the array, or use default
  const homepageSlug = (data && data[0]?.slug) || "home";

  let navItemsWithUrl = navUrlProcessor(navigation, homepageSlug);
  function NavTitle() {
    if (brandAssets?.primaryLogo) {
      return (
        <div className="h-7">
          <Link href="/">
            <Image
              width={getImageDimensions(brandAssets.primaryLogo.imageUrl).width}
              height={
                getImageDimensions(brandAssets.primaryLogo.imageUrl).height
              }
              src={brandAssets.primaryLogo.imageUrl}
              className={cn(
                "h-full w-auto",
                headerTheme === "light" && "",
                headerTheme === "dark" && "",
                headerTheme === "transparent" && "md:brightness-0 md:invert",
              )}
              alt="logo"
            />
          </Link>
        </div>
      );
    } else {
      return (
        <Link className="text-xl md:text-2xl" href="/">
          {websiteTitle || "My Website"}
        </Link>
      );
    }
  }

  return (
    <section
      className={cn(
        "",
        headerTheme === "transparent" &&
          "border-b border-white bg-primary text-white",
        headerTheme === "light" && "bg-muted text-primary",
        headerTheme === "dark" && "bg-black text-white",
      )}
    >
      <div
        className={cn(
          "sticky top-0 z-10 mx-auto flex w-full max-w-[1900px] flex-row justify-between px-4 py-3 text-white md:px-8",
        )}
      >
        <div className="flex flex-row items-center justify-start">
          <NavTitle />
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent
                className="h-full bg-white text-left text-black sm:text-left"
                side="top"
              >
                <SheetHeader>
                  <SheetTitle className="text-inherit">
                    <NavTitle />
                  </SheetTitle>
                  {/* <SheetDescription>Here it is</SheetDescription> */}
                </SheetHeader>
                <div className="flex flex-col pt-8 text-3xl text-primary">
                  {navItemsWithUrl.map((item) => {
                    return (
                      <div
                        key={item._key}
                        className="w-full border-b border-gray-300 py-2"
                      >
                        <SheetClose asChild>
                          <Link href={item.navUrl || "#"}>{item.text}</Link>
                        </SheetClose>
                      </div>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div
            className={cn(
              "hidden flex-row items-center gap-6 md:flex",
              headerTheme === "transparent" && "text-white",
              headerTheme === "light" && "text-primary",
            )}
          >
            {navItemsWithUrl.map((item) => {
              return (
                <Link
                  className="last-of-type:rounded-full last-of-type:bg-secondary last-of-type:p-3 last-of-type:px-6 last-of-type:text-white"
                  key={item._key}
                  href={item.navUrl || "#"}
                >
                  {item.text}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
