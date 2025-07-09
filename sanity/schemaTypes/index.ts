// import page from "./page";
import person from "./documents/person";
import page from "./documents/page";
import post from "./documents/post";
import callToAction from "./blocks/callToActionType";
import infoSection from "./objects/infoSection";
import settings from "./singletons/settings";
import link from "./objects/link";
import blockContent from "./objects/blockContent";
import heroType from "./blocks/heroType";
import tabsType from "./blocks/tabsType";
import galleryType from "./blocks/galleryType";
import paragraphType from "./blocks/paragraphType";
import textAndImageType from "./blocks/textAndImageType";
import styleSettings from "./singletons/styleSettings";
import header from "./singletons/header";
import navLink from "./objects/navLink";
import formType from "./blocks/formType";
import metricsType from "./blocks/metricsType";
import accordionType from "./blocks/accordionType";
import testBlockType from "./blocks/testBlockType";
import projects from "./objects/projects";
import photoGallery from "./objects/photoGallery";
import imagesCarousel from "./blocks/imagesCarouselType";
import productBlock from "./blocks/productBlockType";
import products from "./documents/products";
import tabsDoubleImage from "./blocks/tabsDoubleImageType";
import stepsType from "./blocks/stepsType";
import miniGalleriesType from "./blocks/miniGalleriesType";
import productDetailsType from "./blocks/productDetailsType";
import documentationType from "./blocks/documentationType";

export const schemaTypes = [
  // Singletons
  settings,
  styleSettings,
  header,
  // Documents
  page,
  post,
  person,
  products,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  navLink,
  projects,
  photoGallery,
  // Blocks
  formType,
  galleryType,
  heroType,
  paragraphType,
  tabsDoubleImage,
  textAndImageType,
  metricsType,
  accordionType,
  testBlockType,
  imagesCarousel,
  productBlock,
  stepsType,
  miniGalleriesType,
  productDetailsType,
  documentationType,
];
