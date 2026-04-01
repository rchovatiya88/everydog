# Google Drive Image Hosting Setup

This replaces the old `customer-assets.emergentagent.com` image URLs for the landing page images.

## What Changed

The landing-page images now load through your existing Google Apps Script web app.

The frontend sends the Google Drive file ID to the Apps Script endpoint, and the script returns a browser-safe image `data:` URL. This avoids the `403 Forbidden` issue that often happens with direct `drive.google.com/uc?...` image embeds.

The file IDs are still configured in:

- `/frontend/src/config.js`

The image helper builds each URL from the Google Drive file ID.

## Step 1: Create a Folder in Google Drive

1. Open Google Drive
2. Create a folder named `EveryDog Website Images`
3. Upload the homepage and gallery images into that folder

Recommended file names:

- `hero.jpg`
- `small-dog.jpg`
- `frizgility.jpg`
- `howlidays.jpg`
- `funkey.jpg`
- `skyhoundz.jpg`
- `fall-fest-2.jpg`
- `rock-n-rollers.jpg`
- `st-pattys.jpg`

## Step 2: Share the Images with the Google Account That Owns the Apps Script

The Apps Script must be able to read these files with `DriveApp.getFileById(...)`.

If you upload the files using the same Google account that owns the Apps Script project, you're set.

If you upload them using a different Google account:

1. Share each image with the Apps Script owner account
2. Give that account at least **Viewer** access

## Step 3: Optional Public Sharing

Public sharing is not required for the website anymore because the browser is no longer loading the Drive URL directly.

You can still set **Anyone with the link** to **Viewer** if you want, but the important part is that the Apps Script owner has access to the file.

## Step 4: Copy the File IDs

Each shared Google Drive file URL looks something like:

`https://drive.google.com/file/d/FILE_ID/view?usp=sharing`

Copy just the `FILE_ID` part.

## Step 5: Paste the IDs into the Frontend

Open:

- `/frontend/src/config.js`

Fill in the `GOOGLE_DRIVE_IMAGE_IDS` object:

```js
export const GOOGLE_DRIVE_IMAGE_IDS = {
  hero: "YOUR_FILE_ID",
  smallDog: "YOUR_FILE_ID",
  frizgility: "YOUR_FILE_ID",
  howlidays: "YOUR_FILE_ID",
  funkey: "YOUR_FILE_ID",
  skyhoundz: "YOUR_FILE_ID",
  fallFest2: "YOUR_FILE_ID",
  rockNRollers: "YOUR_FILE_ID",
  stPattys: "YOUR_FILE_ID",
};
```

## Step 6: Update the Apps Script Web App

1. Open Google Sheets
2. Go to **Extensions -> Apps Script**
3. Replace the script with the latest version from:
   - `/frontend/google-apps-script.js`
4. Save the script
5. Deploy a **new version** of the web app, or update the existing deployment

## Step 7: Rebuild and Redeploy

After updating `src/config.js`, rebuild and redeploy the frontend.

## Notes

- Until a file ID is added, the site shows a local placeholder image instead of a broken image.
- Admin-uploaded event images are separate. Those are still stored in browser `localStorage` as data URLs.
- This change only affects the landing-page photos defined in `src/data/events.js`.
