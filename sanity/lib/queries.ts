import { defineQuery, groq } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const HOME_PAGES_SLUGS = defineQuery(`
  *[_type == "page" && isHome.status==true && defined(slug.current)]
  {"slug": slug.current}
`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const linkFields = /* groq */ `
    link {
      ...,
      _type == "link" => {
        "page": page->slug.current,
        "post": post->slug.current
      }
    }
`;

const heroLinkFields = /* groq */ `
    button {
      ...,
      buttonText,
      link {
        ...,
        _type == "link" => {
          "page": page->slug.current,
          "post": post->slug.current
        }
      }
    }
`;

export const HOMEPAGE_QUERY = groq`
  *[isHomepage == true]{'slug':slug.current, _id}[0]
`;

export const FOOTER_QUERY = groq`
  *[_type == "header"][0]{
    ...,
    footerNavigation[] {
      ...,
      link {
        ...,
        'page': page->
      }
    },
    footerText,
    footerLogos {
      ...,
    }
  }
`;

export const HEADER_NAVIGATION_QUERY = groq`
{
  "settings": *[_type == "settings"][0]{
    ...,
    brandAssets {
      ...,
      primaryLogo {
        ...,
        "imageUrl": asset->url,
        "blurDataUrl": asset->metadata.lqip
      }
    }
  },
  "header": *[_type == "header"][0]{
    navigation[] {
      ...,
      text,
      _key,
      "slug": link.page->slug.current,
      "sectionId": link.linkToSection,
      "typeOfLink": link.linkType
    },
    "websiteTitle": *[_type == "settings"][0].title
  }
}
`;

const PRODUCTS_QUERY = groq`
  *[_type == "products"] {
    ...,
    "link": productInfoLink {
      ...,
      'page': page->,
    },
    "image": image {
      ...,
      "imageUrl": asset->.url,
      "blurDataUrl": asset->metadata.lqip
    },

  }
`;

const BUTTON_QUERY = groq`
  button {
    ...,
    link {
      ...,
      'page': page->
    }
  }
`;

//To-do: Will have to fix queries when going from test block, to separating all the blocks into own types. Type == "tabs". Switch "tabs"  to _type == tabs.
const PAGE_BUILDER_CONTENT_QUERY = /* groq */ `
  "pageBuilder": pageBuilder[] {
    ...,
    "settings": *[_type == "settings"][0] {
      ...,
      'homepageSlug': ${HOME_PAGES_SLUGS}[0].slug,
      brandAssets {
        ...,
        primaryLogo {
          ...,
          "fullAsset": asset->,
          "imageUrl": asset->url,
          "blurDataUrl": asset->metadata.lqip
        },
        secondaryLogo {
          ...,
          "fullAsset": asset->,
          "imageUrl": asset->url,
          "blurDataUrl": asset->metadata.lqip
        }
      }
    },
    _type == "callToAction" => {
      ...,
      'products': ${PRODUCTS_QUERY},
      button {
        ...,
        link {
          ...,
          'page': page->
        }
      }
    },
    _type == "hero" => {
      ...,
      claims[] {
        ...,
        claim
      },
      ${heroLinkFields}
    },
    _type == "imagesCarousel" => {
      ...,
      carouselImages[] {
        ...,
        "image": carouselImage {
          ...,
          "imageUrl": asset->.url,
          "blurDataUrl": asset->metadata.lqip
        }
      }
    },
    _type == "stepsType" => {
      ...,
      steps[] {
        ...,
      }
    },
    _type == "tabs" => {
      ...,
      "tabs": tabs[] {
        ...,
        "image": image {
          ...,
          "imageUrl": asset->.url,
          "blurDataUrl": asset->metadata.lqip
        }
      }
    },
    _type == "gallery" => {
      ...,
      "gallery": gallery[] {
        ...,
        "image": {
          ...,
          "fullAsset": asset->,
          "imageUrl": asset->url,
          "blurDataUrl": asset->metadata.lqip
        }
      }
    },
    _type == "tools" => {
      ...,
      tools[] {
        ...,
        apps[] {
          ...,
          icon {
            ...,
            "fullAsset": asset->
          }
        }
      }
    },
    _type == "testimonials" => {
      ...,
      testimonials[] {
        ...,
        logo {
          ...,
          "fullAsset": asset->
        }
      }
    },
    _type == "footer" => {
      ...,
      link {
        ...,
        'page': page->
      },
      logo {
        ...,
        "fullAsset": asset->
      }
    },
    _type == "paragraph" => {
      ...,
      children[] {
        ...,
        _type == 'image' => {
          ...,
          asset->
        }
      }
    },
    _type == "textAndImage" => {
      ...,
      "image": {
        ...,
        "imageUrl": asset->.url,
        "blurDataUrl": asset->metadata.lqip
      }
    },
    _type == "form" => {
      ...
    },
    _type == "metrics" => {
      ...
    },
    _type == "accordion" => {
      ...
    },
    _type == "productBlock" => {
      ...,
      'products': ${PRODUCTS_QUERY}
    },
    _type == "productDetailsType" => {
      ...,
      "product": product->{
        ...,
        title,
        image,
        summary,
        tagline,
        description,
        idealText,
        clientTypes,
        benefits,
        intereses,
        requisitos,
      }
    },
    _type == "documentationType" => {
      ...,
      documents[] {
        ...,
        "file": file.asset->url
      }
    }
  }
`;

export const GET_NAV_LINKS = defineQuery(`
  *[_type == "header"][0] {
  ...,
  navigation[] {
    ...,
    "link": link {
      ...,
      "page": page->.slug.current,
    }
  }
}
  `);

export const HOME_GET_PAGEQUERY = defineQuery(`
  *[_type == 'page' && isHome.status == true][0]{
    _id,
    name,
    slug,
    heading,
    subheading,
    ${PAGE_BUILDER_CONTENT_QUERY},
  }
`);

PAGE_BUILDER_CONTENT_QUERY;
export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    ...,
    _id,
    name,
    slug,
    heading,
    subheading,
    ${PAGE_BUILDER_CONTENT_QUERY},
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkFields}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const GLOBAL_SETTINGS_QUERY = groq`  
  {"settings": *[_type == "settings"][0]{
    ...,
    brandAssets {
      ...,
      primaryLogo {
        ...,
        "fullAsset": asset->,
        "imageUrl": asset->url,
        "blurDataUrl": asset->metadata.lqip
      }
    }
  }}
`;

// const PAGE_BUILDER_CONTENT_QUERY = defineQuery(`
//   content[] {
//     ...,
//     defined(projectLinkArea.externalUrl) => {
//       "url": projectLinkArea.externalUrl,
//       openInNewWindow
//     },
//     defined(image) => {
//       "image": image {
//         ...,
//         "imageUrl": asset->.url,
//         "blurDataURL": asset->.metadata.lqip
//       }
//     },
//     defined(images) => {
//       "images": images[] {
//         ...,
//         "imageUrl": asset->.url,
//         "blurDataURL": asset->.metadata.lqip
//       }
//     },
//     defined(tabs) => {
//       tabs[] {
//         ...,
//         "image": image {
//           ...,
//           "imageUrl": asset->.url,
//           "blurDataURL": asset->.metadata.lqip
//         }
//       }
//     },
//     defined(accordion) => {
//       accordion[] {
//         ...
//       }
//     },
//     defined(projects) => {
//       title,
//       heading,
//       projects[]-> {
//         gallery,
//         projectInfo[] {
//           title,
//           text
//         },
//         title,
//         status,
//         defined(projectLinkArea.externalUrl) => {
//           "url": projectLinkArea.externalUrl,
//           openInNewWindow,
//           urlTitle
//         },
//         gallery[] {
//           _key,
//           alt,
//           "imageUrl": asset->.url,
//           "blurDataURL": asset->.metadata.lqip
//         }
//       }
//     }
//   }
// `);
// export const HOME_PAGE_BUILDER_QUERY = defineQuery(`
// *[_type == "pageBuilder" && isHomepage == true] {
//   title,
//   slug,
//   ${PAGE_BUILDER_CONTENT_QUERY}

// }[0]
// `);
