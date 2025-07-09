import { sanityFetch } from "@/sanity/lib/live";

import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageDimensions } from "@sanity/asset-utils";
import {
  GLOBAL_SETTINGS_QUERY,
  FOOTER_QUERY,
  HOME_PAGES_SLUGS,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { navUrlProcessor } from "@/lib/helpers";
import ResolvedLink from "./ResolvedLink";
export default async function Footer() {
  const {
    data: { settings },
  } = await sanityFetch({ query: GLOBAL_SETTINGS_QUERY });

  const {
    data: { footerNavigation, footerText, footerLogos },
  } = await sanityFetch({
    query: FOOTER_QUERY,
  });

  const { data } = await sanityFetch({
    query: HOME_PAGES_SLUGS,
  });

  // Extract the slug from the first item in the array, or use default
  const homepageSlug = (data && data[0]?.slug) || "home";

  let navItemsWithUrl = navUrlProcessor(footerNavigation, homepageSlug);

  // Provide default empty objects to prevent potential null/undefined errors
  const brandAssets = settings?.brandAssets || {};
  const socials = settings?.socials || {};
  const contactInfo = settings?.contactInfo || {};
  const legal = settings?.legal || {};
  return (
    <>
      <main className="mx-auto flex h-auto w-full max-w-[1900px] flex-col bg-primary px-4 py-6 text-white md:px-8 lg:py-16">
        <div className="flex flex-col gap-4 md:w-full md:flex-row">
          {/* Logo Block */}
          <div className="w-full md:w-1/3">
            {brandAssets?.primaryLogo?.asset && (
              <Image
                src={urlForImage(brandAssets.primaryLogo)?.url() as string}
                className="h-auto max-w-44 brightness-0 invert"
                width={getImageDimensions(brandAssets.primaryLogo.asset).width}
                height={
                  getImageDimensions(brandAssets.primaryLogo.asset).height
                }
                alt={brandAssets.primaryLogo.alt || "Company Logo"}
              />
            )}
          </div>

          {/* Navigation Block */}
          <section className="flex w-full flex-col gap-2 pr-0 md:w-1/3 md:gap-4 md:pr-4">
            <p className="text-base md:text-xl">
              {settings?.tagline || "Company Name"}
            </p>
            <div className="flex flex-col">
              {footerNavigation.map((item) => {
                return (
                  <ResolvedLink
                    className="py-1 text-sm opacity-60 md:text-base"
                    key={item._key}
                    link={item.link}
                  >
                    {item.text}
                  </ResolvedLink>
                );
              })}
            </div>
          </section>

          {/* Contact Block */}
          <section className="flex w-full flex-col gap-2 text-balance pr-0 pt-0 md:w-1/3 md:gap-4 md:pr-4 md:pt-0">
            <p className="text-base md:text-xl">Contact</p>
            <div className="flex flex-col gap-5 pt-1">
              {contactInfo?.address ? (
                <p className="text-sm md:text-base">{contactInfo.address}</p>
              ) : null}
              {contactInfo?.phone ? (
                <p className="whitespace-pre-wrap text-sm md:text-base">
                  {contactInfo.phone}
                </p>
              ) : null}
              {contactInfo?.email ? (
                <p className="text-sm md:text-base">{contactInfo.email}</p>
              ) : null}
            </div>
          </section>

          {/* Social Block */}
          {Object.keys(socials).length > 0 && (
            <section className="flex w-full pr-0 md:w-1/4 md:flex-row md:pr-4">
              <div className="flex w-full flex-col gap-2 md:gap-4">
                <p className="text-base md:text-xl">Follow</p>
                <div className="flex w-full flex-col">
                  {socials?.instagram ? (
                    <a
                      href={`https://www.instagram.com/${socials.instagram}`}
                      className="py-1 text-sm md:text-base"
                    >
                      Instagram
                    </a>
                  ) : null}
                  {socials?.linkedIn ? (
                    <a
                      href={`https://www.linkedin.com/${socials.linkedIn}`}
                      className="py-1 text-sm md:text-base"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                  {socials?.x ? (
                    <a
                      href={`https://x.com/${socials.x}`}
                      className="py-1 text-sm md:text-base"
                    >
                      X
                    </a>
                  ) : null}
                  {settings?.socials?.newsletter ? (
                    <a
                      href={settings.socials.newsletter.url}
                      className="py-1 text-sm md:text-base"
                    >
                      {settings.socials.newsletter.title}
                    </a>
                  ) : null}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <section className="flex w-full flex-col bg-accent-foreground">
        <div className="mx-auto flex h-auto w-full max-w-[1900px] flex-col-reverse gap-4 px-4 py-6 text-black md:flex-row md:px-8 lg:py-10">
          <div className="flex w-full max-sm:gap-4 md:w-1/3 md:flex-col">
            <p className="text-xs md:text-sm">
              Copyright {new Date().getFullYear()}
            </p>
            <p className="text-xs opacity-20 md:text-sm">
              Code by{" "}
              <a
                href="https://www.firmalt.com"
                className="border-b border-black"
              >
                Firmalt
              </a>
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 md:w-2/3">
            <p className="text-xs opacity-40 md:text-sm">{footerText}</p>
            <div className="relative flex w-full flex-row flex-wrap items-center gap-4">
              {footerLogos?.images?.map((image) => (
                <div className="relative">
                  <Link href={image.caption || ""}>
                    <Image
                      key={image._key}
                      src={urlForImage(image)?.url() as string}
                      alt={image.alt || "Logo"}
                      width={getImageDimensions(image.asset).width}
                      height={getImageDimensions(image.asset).height}
                      className="max-h-16 max-w-24 object-contain max-sm:max-h-8 max-sm:max-w-12"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
