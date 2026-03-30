# Google Drive Image Hosting Setup

This replaces the old `customer-assets.emergentagent.com` image URLs for the homepage and gallery.

## What Changed

The homepage/gallery images now load from Google Drive file IDs configured in:

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
- `fall-fest-3.jpg`

## Step 2: Make the Images Public

For each image:

1. Right-click the file
2. Click **Share**
3. Under **General access**, choose **Anyone with the link**
4. Set access to **Viewer**

## Step 3: Copy the File IDs

Each shared Google Drive file URL looks something like:

`https://drive.google.com/file/d/FILE_ID/view?usp=sharing`

Copy just the `FILE_ID` part.

## Step 4: Paste the IDs into the Frontend

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
  fallFest3: "YOUR_FILE_ID",
};
```

## Step 5: Rebuild and Redeploy

After updating `src/config.js`, rebuild and redeploy the frontend.

## Notes

- Until a file ID is added, the site shows a local placeholder image instead of a broken image.
- Admin-uploaded event images are separate. Those are still stored in browser `localStorage` as data URLs.
- This change only affects the static homepage/gallery photos defined in `src/data/events.js`.
