import { GOOGLE_DRIVE_IMAGE_IDS } from "@/config";

function svgPlaceholder(label) {
  const safeLabel = (label || "EveryDog Photo").replace(/[<>&"]/g, "");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e7f4fd" />
          <stop offset="100%" stop-color="#fff1de" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#bg)" />
      <circle cx="1280" cy="180" r="140" fill="#0B74B5" opacity="0.12" />
      <circle cx="220" cy="720" r="180" fill="#FF8A2A" opacity="0.12" />
      <text x="800" y="400" text-anchor="middle" font-size="72" font-family="Arial, sans-serif" font-weight="700" fill="#0f172a">
        EveryDog Photo
      </text>
      <text x="800" y="485" text-anchor="middle" font-size="34" font-family="Arial, sans-serif" fill="#475569">
        Configure this image in src/config.js
      </text>
      <text x="800" y="550" text-anchor="middle" font-size="28" font-family="Arial, sans-serif" fill="#64748b">
        ${safeLabel}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getGoogleDriveImageUrl(key, label) {
  const fileId = GOOGLE_DRIVE_IMAGE_IDS[key];

  if (!fileId) {
    return svgPlaceholder(label);
  }

  return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`;
}
