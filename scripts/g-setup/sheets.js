const {google} = require('googleapis');

var resource = {
  properties: {
    title: 'Configuration test',
  }
};

/**
 * Creates a new spreadsheet.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {function} callback The callback to call with the ID of the new spreadsheet, this will run the next step in setup.
 */
function createSpreadsheet(auth, callback) {
  const sheets = google.sheets({version: 'v4', auth});

  sheets.spreadsheets.create({
    resource,
    fields: 'spreadsheetId',
  }, (err, spreadsheet) => {
    if (err) {
      console.log(err);
    } else {
      callback(spreadsheet.data.spreadsheetId);
    }
  });
}

module.exports = { createSpreadsheet };
