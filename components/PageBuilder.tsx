import Link from "next/link";

import BlockRenderer from "@/components/BlockRenderer";
import { Page } from "@/sanity.types";
import { studioUrl } from "@/sanity/lib/api";
import Onboarding from "./Onboarding";

type PageBuilderPageProps = {
  page: Page;
};

export default function PageBuilder({ page }: PageBuilderPageProps) {
  if (page?.pageBuilder && page.pageBuilder.length > 0) {
    console.log({ page });
    return (
      <>
        {page.pageBuilder.map((block: any, index: number) => (
          <BlockRenderer key={block._key} index={index} block={block} />
        ))}
      </>
    );
  }

  // If there are no blocks in the page builder.
  return <Onboarding />;
}
