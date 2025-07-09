import { NavLink } from "@/sanity/lib/types";
import { Suspense } from "react";
import BlockContainer from "../BlockContainer";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import StyledResolvedLink from "../StyledResolvedLink";
import { Hero as HeroType } from "@/sanity.types";

export default function Hero({ block }: { block: HeroType }) {
  if (!block) return null;

  const hasClaims =
    block.claims && Array.isArray(block.claims) && block.claims.length > 0;

  return (
    <>
      {block.style === "left" && (
        <BlockContainer
          backgroundClassName="bg-primary"
          className="flex flex-col px-4 py-6 text-white md:px-8 md:py-10"
        >
          <section className="flex w-full flex-col justify-start gap-6">
            {block.heading && (
              <h1 className="max-w-3xl text-balance font-display text-6xl md:text-9xl">
                {block.heading}
              </h1>
            )}

            {block.caption && (
              <h2 className="max-w-md text-sm md:text-xl">{block.caption}</h2>
            )}

            {block.button?.text && block.button?.link && (
              <Suspense fallback={null}>
                <div className="flex">
                  <StyledResolvedLink
                    button={block.button as NavLink}
                    style="primary"
                  />
                </div>
              </Suspense>
            )}
          </section>
          {/* Claims */}
          {hasClaims && (
            <section className="grid w-full grid-cols-1 gap-6 py-6 md:mt-10 md:grid-cols-3 md:gap-8 md:py-8">
              {block.claims.map((claim) => {
                if (!claim?._key || !claim?.image?.asset?._ref) return null;

                return (
                  <div key={claim._key} className="flex flex-col gap-3">
                    <div className="relative h-4 w-4 md:h-8 md:w-8">
                      <Image
                        src={urlForImage(claim.image).url()}
                        alt={claim.image.alt || "Claim icon"}
                        fill
                      />
                    </div>
                    <div className="mb-2 flex flex-col">
                      {claim.title && (
                        <h2 className="mb-3 text-sm md:text-lg">
                          {claim.title}
                        </h2>
                      )}
                      {claim.description && (
                        <p className="text-sm opacity-85 md:text-lg md:leading-[1.2]">
                          {claim.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </BlockContainer>
      )}
      {block.style === "center" && (
        <BlockContainer
          backgroundClassName="bg-primary"
          className="flex flex-col px-4 py-6 text-white"
        >
          <section className="flex w-full flex-col items-center gap-6 text-center">
            {block.caption && (
              <h2 className="max-w-sm text-sm md:text-base">{block.caption}</h2>
            )}

            {block.heading && (
              <h1 className="max-w-4xl text-balance font-display text-6xl md:text-[80px]">
                {block.heading}
              </h1>
            )}

            {block.text && (
              <h2 className="max-w-md text-sm md:text-base">{block.text}</h2>
            )}

            <div className="flex gap-4">
              {block.button?.text && block.button?.link && (
                <Suspense fallback={null}>
                  <div className="flex">
                    <StyledResolvedLink
                      button={block.button as NavLink}
                      style="primary"
                    />
                  </div>
                </Suspense>
              )}

              {block.buttonSecondary?.text && block.buttonSecondary?.link && (
                <Suspense fallback={null}>
                  <div className="flex">
                    <StyledResolvedLink
                      button={block.buttonSecondary as NavLink}
                      style="outline"
                    />
                  </div>
                </Suspense>
              )}
            </div>
          </section>
          {/* Claims */}
          {hasClaims && (
            <section className="grid w-full grid-cols-1 gap-6 py-6 md:grid-cols-3 md:gap-8 md:py-10">
              {block.claims.map((claim) => {
                if (!claim?._key || !claim?.image?.asset?._ref) return null;

                return (
                  <div key={claim._key} className="flex flex-col gap-3">
                    <div className="relative h-4 w-4 md:h-10 md:w-10">
                      <Image
                        src={urlForImage(claim.image).url()}
                        alt={claim.image.alt || "Claim icon"}
                        fill
                      />
                    </div>
                    <div className="flex flex-col">
                      {claim.title && (
                        <h2 className="text-sm md:text-lg">{claim.title}</h2>
                      )}
                      {claim.description && (
                        <p className="text-sm opacity-85 md:text-lg">
                          {claim.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </BlockContainer>
      )}
    </>
  );
}
