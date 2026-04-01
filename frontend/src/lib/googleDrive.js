import { useEffect, useState } from "react";
import { GOOGLE_DRIVE_IMAGE_IDS, GOOGLE_SCRIPT_URL } from "@/config";

const CACHE_PREFIX = "everydog_drive_image_v1";
const CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 12000;
const REQUEST_RETRIES = 2;

export function svgPlaceholder(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="100%" stop-color="#eef6fb" />
        </linearGradient>
        <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#edf2f7" />
          <stop offset="50%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#edf2f7" />
          <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="1.6s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#bg)" />
      <circle cx="1290" cy="190" r="128" fill="#0B74B5" opacity="0.08" />
      <circle cx="110" cy="710" r="150" fill="#FF8A2A" opacity="0.08" />
      <rect x="250" y="300" rx="24" ry="24" width="1100" height="60" fill="url(#shimmer)" />
      <rect x="420" y="400" rx="18" ry="18" width="760" height="34" fill="url(#shimmer)" opacity="0.9" />
      <rect x="510" y="462" rx="18" ry="18" width="580" height="34" fill="url(#shimmer)" opacity="0.75" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const imageCache = new Map();

function getCacheKey(key, fileId) {
  return `${CACHE_PREFIX}:${key}:${fileId}`;
}

function readCachedImage(key, fileId) {
  if (typeof window === "undefined" || !fileId) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(getCacheKey(key, fileId));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed?.dataUrl || !parsed?.savedAt) {
      return null;
    }

    if (Date.now() - parsed.savedAt > CACHE_MAX_AGE_MS) {
      window.localStorage.removeItem(getCacheKey(key, fileId));
      return null;
    }

    return parsed.dataUrl;
  } catch {
    return null;
  }
}

function writeCachedImage(key, fileId, dataUrl) {
  if (typeof window === "undefined" || !fileId || !dataUrl) {
    return;
  }

  try {
    window.localStorage.setItem(
      getCacheKey(key, fileId),
      JSON.stringify({
        dataUrl,
        savedAt: Date.now(),
      }),
    );
  } catch {
    // Ignore storage quota or private-mode write failures.
  }
}

async function requestImageFromScript(key, fileId) {
  const url = new URL(GOOGLE_SCRIPT_URL);
  url.searchParams.set("asset", "image");
  url.searchParams.set("key", key);
  url.searchParams.set("id", fileId);

  let lastError = null;

  for (let attempt = 0; attempt <= REQUEST_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });

      const result = await response.json();
      if (!result.success || !result.data_url) {
        throw new Error(result.message || `Image fetch failed for ${key}`);
      }

      return result.data_url;
    } catch (error) {
      lastError = error;
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  throw lastError || new Error(`Image fetch failed for ${key}`);
}

export async function fetchGoogleDriveImage(key, label) {
  const fileId = GOOGLE_DRIVE_IMAGE_IDS[key];
  const imageToken = `${key}:${fileId || "missing"}`;

  if (!fileId) {
    return svgPlaceholder(label);
  }

  if (!GOOGLE_SCRIPT_URL) {
    return svgPlaceholder(label);
  }

  if (!imageCache.has(imageToken)) {
    const cached = readCachedImage(key, fileId);

    if (cached) {
      imageCache.set(imageToken, Promise.resolve(cached));
      return imageCache.get(imageToken);
    }

    imageCache.set(
      imageToken,
      requestImageFromScript(key, fileId)
        .then((dataUrl) => {
          writeCachedImage(key, fileId, dataUrl);
          return dataUrl;
        })
        .catch((error) => {
          imageCache.delete(imageToken);
          throw error;
        })
    );
  }

  return imageCache.get(imageToken);
}

export function useGoogleDriveImage(key, label) {
  const fileId = GOOGLE_DRIVE_IMAGE_IDS[key];
  const [src, setSrc] = useState(() => readCachedImage(key, fileId) || svgPlaceholder(label));

  useEffect(() => {
    let active = true;

    fetchGoogleDriveImage(key, label)
      .then((resolvedSrc) => {
        if (active) {
          setSrc(resolvedSrc);
        }
      })
      .catch(() => {
        if (active) {
          setSrc(svgPlaceholder(label));
          window.setTimeout(() => {
            if (!active) {
              return;
            }

            fetchGoogleDriveImage(key, label)
              .then((resolvedSrc) => {
                if (active) {
                  setSrc(resolvedSrc);
                }
              })
              .catch(() => {
                if (active) {
                  setSrc(svgPlaceholder(label));
                }
              });
          }, 1500);
        }
      });

    return () => {
      active = false;
    };
  }, [key, label]);

  return src;
}
