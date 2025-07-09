import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { HOME_GET_PAGEQUERY, HOME_PAGES_SLUGS } from "@/sanity/lib/queries";
import PageWithHeader from "@/components/PageWithHeader";

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: HOME_PAGES_SLUGS,
    perspective: "published",
    stega: false,
  });
  return data;
}

type Props = {
  params: Promise<{ slug: string }>;
};

/* export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: HOME_GET_PAGEQUERY,
    params,
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}
 */
export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: HOME_GET_PAGEQUERY, params }),
  ]);

  if (!page?._id) {
    return notFound();
  }

  return <PageWithHeader page={page as any} />;
}
