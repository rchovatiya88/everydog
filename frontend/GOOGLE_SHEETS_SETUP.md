# Google Sheets Integration Setup

## Step 1: Open Google Apps Script

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1sBaotDowQ9b331tvL9d8RoMlz_K-MB-Qur-L957l_aQ/edit
2. Click **Extensions** → **Apps Script**
3. This opens the Apps Script editor

## Step 2: Paste the Script

1. **Delete** everything in the editor
2. **Copy-paste** the entire contents of the file `google-apps-script.js` (in this same folder)
3. Click the **Save** icon (or Ctrl+S)
4. Name the project: `EveryDog League API`

## Step 3: Run Setup (Creates Sheet Tabs + Headers)

1. In the Apps Script editor, select the function **`setupSheets`** from the dropdown at the top
2. Click **Run**
3. It will ask for permissions → Click **Review Permissions** → Choose your Google account → Click **Advanced** → **Go to EveryDog League API (unsafe)** → **Allow**
4. Check your Google Sheet — you should now see 3 tabs: `Event Registrations`, `Newsletter`, `Contact Messages`

## Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
3. Set:
   - **Description**: `EveryDog League API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. **Copy the Web App URL** — it looks like: `https://script.google.com/macros/s/XXXXX/exec`

## Step 5: Add the URL to Your Frontend

1. Open `/app/frontend/src/config.js`
2. Replace the placeholder URL with your actual Apps Script URL:
   ```js
   export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec";
   ```
3. Rebuild and redeploy to Netlify

## That's it! Your forms now save data to Google Sheets.

### How it works:
- **Newsletter signups** → "Newsletter" tab
- **Event registrations** → "Event Registrations" tab  
- **Contact messages** → "Contact Messages" tab

### To view submissions:
Just open your Google Sheet — all data appears in real-time with timestamps.
