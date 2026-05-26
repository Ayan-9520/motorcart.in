export {
  getModelImages,
  getVehicleGallery,
  getVehicleHero,
  inferVehicleSegment,
  isListingSafeUrl,
  localAssetPath,
  HUB_HERO_IMAGES,
  SEGMENT_DEFAULTS,
  SEGMENT_POOLS,
  VEHICLE_SEGMENT_LABELS,
  type VehicleSegment,
} from "./vehicle-media-registry";

export {
  getPartImages,
  pickGallery,
  hashKey,
  MEDIA_DEFAULTS,
  ECOSYSTEM_HERO_IMAGES,
  PARTS_CATEGORY_IMAGES,
  PARTS_BRAND_TILES,
  SERVICE_CATEGORY_IMAGES,
  homeServiceImage,
  FEATURED_VEHICLE_IMAGES,
  AUCTION_LISTING_IMAGES,
  COMMUNITY_POST_IMAGES,
  COMMUNITY_AVATARS,
  dealerCoverImage,
  serviceCenterImage,
} from "./india-media-catalog";

export {
  isValidImageUrl,
  resolveVehicleGallery,
  resolveVehicleGalleryFromListing,
  resolveVehicleHero,
  resolvePartGallery,
  resolvePartHero,
  resolveAuctionImages,
  type VehicleResolveInput,
} from "./resolve-images";
