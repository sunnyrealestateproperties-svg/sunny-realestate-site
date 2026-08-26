/**
 * Sunny Real Estate — parcel database backend (Google Apps Script)
 * The Google Sheet is the database. This script is the API the website
 * and the admin panel talk to. Runs free inside your Google account.
 *
 * SETUP (once):
 * 1) Create a Google Sheet named "Sunny Parcels".
 * 2) File → Import → Upload → parcels-seed.csv → "Replace spreadsheet".
 *    Rename the tab (bottom-left) to exactly: Parcels
 * 3) Extensions → Apps Script → delete any code, paste this whole file.
 * 4) Change the PIN below. This code stays private in your account.
 * 5) Deploy → New deployment → type: Web app →
 *      Execute as: Me    ·    Who has access: Anyone
 *    → Deploy → authorize with your Google account → copy the Web app URL.
 * 6) Paste that URL into assets/config.js on the website, redeploy the site.
 */

const PIN = 'CHANGE-ME-1234';   // ← team PIN for the admin panel. Change it!

const HEADERS = ['id','name','type','region','locality','area','price','unit',
  'rank','status','lat','lng','exact','maplink','tour','highlights','verification','gap'];

function sheet_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Parcels');
  if (!sh) throw new Error('Tab "Parcels" not found — rename the sheet tab to Parcels.');
  return sh;
}

function readAll_() {
  const sh = sheet_();
  const values = sh.getDataRange().getValues();
  const head = values[0].map(h => String(h).trim());
  return values.slice(1).filter(r => String(r[0]).trim()).map(r => {
    const o = {};
    head.forEach((h, i) => o[h] = r[i]);
    return o;
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Public read — the website calls this on every page load. */
function doGet(e) {
  try {
    return json_({ ok: true, parcels: readAll_() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** Writes — admin panel only. Body: JSON {pin, action, parcel} */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (String(body.pin) !== PIN) return json_({ ok: false, error: 'Wrong PIN' });

    const sh = sheet_();
    const values = sh.getDataRange().getValues();
    const head = values[0].map(h => String(h).trim());
    const idCol = head.indexOf('id');
    const p = body.parcel || {};

    if (body.action === 'update') {
      for (let r = 1; r < values.length; r++) {
        if (String(values[r][idCol]).trim() === String(p.id).trim()) {
          head.forEach((h, c) => {
            if (h !== 'id' && p[h] !== undefined) sh.getRange(r + 1, c + 1).setValue(p[h]);
          });
          return json_({ ok: true, updated: p.id });
        }
      }
      return json_({ ok: false, error: 'ID not found: ' + p.id });
    }

    if (body.action === 'add') {
      if (!p.id) return json_({ ok: false, error: 'Missing id' });
      for (let r = 1; r < values.length; r++)
        if (String(values[r][idCol]).trim() === String(p.id).trim())
          return json_({ ok: false, error: 'ID already exists: ' + p.id });
      sh.appendRow(HEADERS.map(h => p[h] !== undefined ? p[h] : ''));
      return json_({ ok: true, added: p.id });
    }

    if (body.action === 'delete') {
      for (let r = 1; r < values.length; r++) {
        if (String(values[r][idCol]).trim() === String(p.id).trim()) {
          sh.deleteRow(r + 1);
          return json_({ ok: true, deleted: p.id });
        }
      }
      return json_({ ok: false, error: 'ID not found: ' + p.id });
    }

    return json_({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
