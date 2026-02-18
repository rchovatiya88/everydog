// ============================================================
// EveryDog League — Google Apps Script
// Paste this ENTIRE file into Google Apps Script editor
// (Extensions → Apps Script from your Google Sheet)
// ============================================================

var SHEET_ID = '1sBaotDowQ9b331tvL9d8RoMlz_K-MB-Qur-L957l_aQ';

// ---- SETUP: Run this once to create sheet tabs + headers ----
function setupSheets() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  
  // Event Registrations tab
  var regSheet = getOrCreateSheet(ss, 'Event Registrations');
  if (regSheet.getLastRow() === 0) {
    regSheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Dog Name', 'Dog Breed',
      'Dog Size', 'Experience Level', 'Event ID', 'Event Name',
      'Event Date', 'Waiver Signed'
    ]);
    regSheet.getRange(1, 1, 1, 11).setFontWeight('bold');
  }
  
  // Newsletter tab
  var newsSheet = getOrCreateSheet(ss, 'Newsletter');
  if (newsSheet.getLastRow() === 0) {
    newsSheet.appendRow(['Timestamp', 'Email']);
    newsSheet.getRange(1, 1, 1, 2).setFontWeight('bold');
  }
  
  // Contact Messages tab
  var contactSheet = getOrCreateSheet(ss, 'Contact Messages');
  if (contactSheet.getLastRow() === 0) {
    contactSheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Message', 'Volunteer Interest'
    ]);
    contactSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }
  
  Logger.log('Setup complete! Check your Google Sheet for 3 new tabs.');
}

function getOrCreateSheet(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

// ---- WEB APP HANDLERS ----

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var timestamp = new Date().toLocaleString('en-US', {timeZone: 'America/Chicago'});
    var result = { success: true, message: '' };
    
    switch (data.type) {
      case 'registration':
        var regSheet = ss.getSheetByName('Event Registrations');
        // Check for duplicate
        var emails = regSheet.getRange(2, 3, Math.max(regSheet.getLastRow() - 1, 1), 1).getValues();
        var eventIds = regSheet.getRange(2, 8, Math.max(regSheet.getLastRow() - 1, 1), 1).getValues();
        for (var i = 0; i < emails.length; i++) {
          if (emails[i][0] === data.email && eventIds[i][0] === data.event_id) {
            result.success = false;
            result.message = "You're already registered for this event!";
            return ContentService.createTextOutput(JSON.stringify(result))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
        regSheet.appendRow([
          timestamp,
          data.name || '',
          data.email || '',
          data.dog_name || '',
          data.dog_breed || '',
          data.dog_size || '',
          data.experience_level || '',
          data.event_id || '',
          data.event_name || '',
          data.event_date || '',
          data.waiver_signed ? 'Yes' : 'No'
        ]);
        result.message = 'Registration successful! See you there!';
        break;
        
      case 'newsletter':
        var newsSheet = ss.getSheetByName('Newsletter');
        // Check for duplicate
        var existingEmails = newsSheet.getRange(2, 2, Math.max(newsSheet.getLastRow() - 1, 1), 1).getValues();
        for (var j = 0; j < existingEmails.length; j++) {
          if (existingEmails[j][0] === data.email) {
            result.success = false;
            result.message = "You're already subscribed!";
            return ContentService.createTextOutput(JSON.stringify(result))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
        newsSheet.appendRow([timestamp, data.email || '']);
        result.message = "Welcome to the pack! You're now subscribed.";
        break;
        
      case 'contact':
        var contactSheet = ss.getSheetByName('Contact Messages');
        contactSheet.appendRow([
          timestamp,
          data.name || '',
          data.email || '',
          data.message || '',
          data.volunteer_interest ? 'Yes' : 'No'
        ]);
        result.message = "Thanks for reaching out! We'll get back to you soon.";
        break;
        
      default:
        result.success = false;
        result.message = 'Unknown form type: ' + data.type;
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Server error: ' + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'EveryDog League API is running'
  })).setMimeType(ContentService.MimeType.JSON);
}
