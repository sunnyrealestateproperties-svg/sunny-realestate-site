# Team panel — one-time setup (about 10 minutes)

After this, anyone on the team can mark a parcel **Sold**, change a price, or
**add a new parcel** from a phone — and it goes live on sunnyrealestate.io in
seconds. No developer, no redeploy.

How it works: a private Google Sheet is the database. The website reads from it
on every visit. The Team panel (yoursite.com/admin.html) writes to it, protected
by a PIN. If Google is ever unreachable, the site quietly falls back to its
built-in listings — it never breaks.

## Step 1 — Create the sheet
1. Go to sheets.google.com (Sunny's Google account) → Blank spreadsheet.
2. Name it **Sunny Parcels**.
3. File → Import → Upload → choose **parcels-seed.csv** (in this folder)
   → Import location: **Replace spreadsheet** → Import data.
4. Rename the tab at the bottom-left to exactly: **Parcels**

All 30 current parcels are now in the sheet.

## Step 2 — Add the script
1. In the sheet: **Extensions → Apps Script**.
2. Delete whatever code is there. Open **apps-script-code.gs** (in this folder),
   copy ALL of it, paste it in.
3. On the line near the top, change `CHANGE-ME-1234` to your own team PIN.
4. Click the save icon.

## Step 3 — Publish it
1. Click **Deploy → New deployment**.
2. Gear icon → select type: **Web app**.
3. Set: *Execute as:* **Me** · *Who has access:* **Anyone**.
4. Click **Deploy** → **Authorize access** → choose Sunny's account →
   (if Google shows a warning: Advanced → Go to project) → **Allow**.
5. Copy the **Web app URL** (ends in `/exec`).

## Step 4 — Connect the website
1. In the site folder, open **assets/config.js** in any text editor.
2. Paste the URL between the quotes:  `api: "https://script.google.com/…/exec"`
3. Re-upload the site folder to Vercel (drag and drop, same as before).

Done. Open **sunnyrealestate.io/admin.html**, enter the PIN, and try changing a
status — refresh the main site and watch it update.

## Daily use
- **Mark sold:** admin.html → find the parcel → status → Sold → Save.
  (Sold parcels drop to the bottom of the list with a Sold badge, and come off
  the maps and the homepage.)
- **Change a price:** edit the price box → Save.
- **Add a parcel:** + Add parcel → fill the form → done.
- **Power users:** you can also edit the Google Sheet directly — any column,
  any row. The site picks it up on the next page load.

## Housekeeping
- The PIN lives only inside the Apps Script in Sunny's Google account — change
  it any time (edit the line → Deploy → Manage deployments → edit → Deploy).
- Don't rename the sheet columns or the "Parcels" tab.
- The `status` column accepts: `av`, `partly`, `pre`, `sold`.
- To give a new parcel an exact map pin, paste its Google Maps link in the
  `maplink` column and set `exact` to 1 (the admin form does this for you).
