/**
 * Stock imagery — OSS-hosted URLs from image search, vision-verified
 * (clean photographs, no watermarks/mockups). Components handle null
 * gracefully with warm CSS placeholders.
 */
export const IMAGES: Record<string, string | null> = {
  // cozy warmly-lit restaurant interior, neatly set tables
  interior: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0242b7c4c1f1.jpeg",
  // two guests at a restaurant table, one scanning the QR menu on her phone
  qrScan: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/27c233910449.jpeg",
  // vibrant top-down Indian thali platter
  food: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/82a011c13f9a.jpeg",
  // gourmet dish finished with a sauce pour
  chef: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cd9efc3568b2.jpg",
  // guests enjoying a meal together outdoors
  diners: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fa4bb937787a.jpg",
  // kitchen team working together during service
  owner: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1a18b19c5107.jpg",
};

export function img(key: keyof typeof IMAGES): string | null {
  return IMAGES[key];
}
