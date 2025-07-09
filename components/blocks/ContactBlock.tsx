"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import BlockContainer from "../BlockContainer";
import { MapPin, Mail, Phone, PhoneCall } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";
// Field type definitions
interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "checkbox" | "select";
  required: boolean;
  placeholder?: string;
  options?: Array<{
    label: string;
    value: string;
  }>;
}

interface ContactInfo {
  email?: {
    email?: string;
  };
  phone?: string;
  address?: string;
}

export type ContactBlockType = {
  _key: string;
  _type: "contactBlock";
  heading?: string;
  caption?: string;
  text?: string;
  contactInfo?: ContactInfo;
  formFields?: FormField[];
  submitButtonText?: string;
  successMessage?: string;
  layout?: "form-left" | "info-left" | "form-above" | "info-above";
  settings?: {
    contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
    };
  };
  image?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  };
};

type ContactBlockProps = {
  block: ContactBlockType;
  index?: number;
};

export default function ContactBlock({ block }: ContactBlockProps) {
  if (!block) return null;

  const { heading, caption, text, image } = block;
  const globalInfo = block.settings?.contactInfo;
  const contactInfo = block.contactInfo;

  const hasEmail = contactInfo?.email?.email;
  const hasImage = image?.asset?._ref;

  return (
    <>
      <BlockContainer
        backgroundClassName="bg-muted"
        className="flex-col px-4 py-6 md:px-8 md:py-12"
      >
        <div
          className={cn(
            "flex w-full flex-col-reverse gap-4 pb-8 md:h-[500px] md:flex-row md:gap-8",
          )}
        >
          {/* Left Column */}
          <section className="flex h-full w-full flex-col justify-between gap-4 md:w-1/2 md:gap-6">
            <div className="flex w-full flex-col gap-3 md:w-3/5 md:gap-4">
              {heading && (
                <h2 className="text-2xl font-black uppercase md:text-6xl">
                  {heading}
                </h2>
              )}

              {caption && <div className="text-xs md:text-sm">{caption}</div>}

              {text && <p className="text-base md:text-2xl">{text}</p>}
            </div>

            {/* Contact Buttons */}
            {hasEmail && (
              <div className="mt-4 flex w-full flex-col gap-3 md:mt-0 md:flex-row md:gap-4">
                <a
                  className="w-full"
                  href={`mailto:${contactInfo.email.email}`}
                >
                  <button className="flex w-full items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm md:text-base">
                    <Mail className="mr-1 h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
                    Email us
                  </button>
                </a>
              </div>
            )}
          </section>

          {/* Right Column */}
          {hasImage && (
            <section className="mt-6 h-[250px] w-full bg-gray-100 md:-mb-48 md:mt-0 md:h-auto md:w-1/2">
              <div className="relative h-full w-full">
                <Image
                  src={urlForImage(image)?.url() as string}
                  alt={image?.alt || ""}
                  fill
                  className="object-cover"
                />
              </div>
            </section>
          )}
        </div>
      </BlockContainer>

      {globalInfo && (
        <BlockContainer
          backgroundClassName="bg-primary"
          className="w-full px-4 py-6 md:px-8 md:py-10"
        >
          <section className="w-full text-white">
            <div className="flex w-full flex-col gap-3 md:w-2/5 md:gap-1">
              {globalInfo.address && (
                <div className="flex items-start">
                  <MapPin className="mr-2 mt-1 h-4 w-4 flex-shrink-0 md:mr-3 md:h-5 md:w-5" />
                  <p className="text-balance text-sm md:text-base">
                    {globalInfo.address}
                  </p>
                </div>
              )}

              {globalInfo.email && (
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 flex-shrink-0 md:mr-3 md:h-5 md:w-5" />
                  <a
                    href={`mailto:${globalInfo.email}`}
                    className="text-sm hover:underline md:text-base"
                  >
                    {globalInfo.email}
                  </a>
                </div>
              )}

              {globalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 flex-shrink-0 md:mr-3 md:h-5 md:w-5" />
                  <a
                    href={`tel:${globalInfo.phone}`}
                    className="text-sm hover:underline md:text-base"
                  >
                    {globalInfo.phone}
                  </a>
                </div>
              )}
            </div>
          </section>
        </BlockContainer>
      )}
    </>
  );
}
