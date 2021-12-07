const fs = require('fs');
const { authorize } = require('./g-setup/g-auth');
const { createDriveFolder } = require('./g-setup/drive');
const { createSpreadsheet } = require('./g-setup/sheets');


// TODO: Implement failure callbacks, to proceed accordingly 

/**
 * Once authorized, run setup flow
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function setup(auth) {
  createDriveFolder(auth, (folderId) => {
    console.log("Drive folder id: " + folderId);
    createSpreadsheet(auth, (spreadsheetId) => {
      console.log(spreadsheetId);
    });
  });
}

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Apps Script API.
  authorize(JSON.parse(content), setup);
});
