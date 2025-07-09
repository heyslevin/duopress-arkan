"use client";
import { ArrowUpRight, Camera } from "lucide-react";

/**
 * This file is used for onboarding when you don't have any posts yet and are using the template for the first time.
 * Once you have content, and know where to go to access the Sanity Studio and create content, you can delete this file.
 */

import Link from "next/link";

import { studioUrl } from "@/sanity/lib/api";

export default function Onboarding() {
  return (
    <div className="max-w-2xl mx-auto grid grid-flow-row gap-6 py-24 text-center bg-green-800 text-white rounded-lg p-8">
      <div>
        <h3 className="text-2xl font-semibold">No content blocks yet</h3>
        <p className="mt-1 text-sm text-white/80">
          Get started by creating adding some content blocks to this page.
        </p>
      </div>

      <div>
        <Link
          className="inline-flex rounded-full gap-2 items-center bg-white text-green-800 hover:bg-red-100 focus:bg-red-200 py-3 px-6 transition-colors duration-200"
          href={`${studioUrl}/structure/intent/create/template=post;type=post;path=title`}
          target="_blank"
        >
          Add some blocks
          <ArrowUpRight />
        </Link>
      </div>
    </div>
  );
}
