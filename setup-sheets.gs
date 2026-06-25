// ============================================================
//  EDITKARO.IN — Google Apps Script (setup-sheets.gs)
//  
//  HOW TO DEPLOY:
//  1. Open Google Sheets → Extensions → Apps Script
//  2. Paste this entire file
//  3. Click Deploy → New Deployment → Web App
//     - Execute as: Me
//     - Who has access: Anyone
//  4. Authorize when prompted
//  5. Copy the deployment URL
//  6. Paste it in script.js → GOOGLE_SHEETS_URL variable
// ============================================================

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);

    if (data.type === 'contact') {
      let sheet = ss.getSheetByName('Contacts');
      if (!sheet) {
        sheet = ss.insertSheet('Contacts');
        sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Message']);
      }
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name || '',
        data.email || '',
        data.phone || '',
        data.service || '',
        data.message || ''
      ]);
    }

    if (data.type === 'subscriber') {
      let sheet = ss.getSheetByName('Subscribers');
      if (!sheet) {
        sheet = ss.insertSheet('Subscribers');
        sheet.appendRow(['Timestamp', 'Email']);
      }
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.email || ''
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('EditKaro Sheets API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
