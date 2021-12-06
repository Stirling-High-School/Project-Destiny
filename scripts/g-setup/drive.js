const {google} = require('googleapis');

var fileMetadata = {
  'name': 'Course Choice',
  'mimeType': 'application/vnd.google-apps.folder'
};

/**
 * Creates a new drive folder.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {function} callback The callback to call with the ID of the new folder, this will run the next setup in setup.
 */
function createDriveFolder(auth, callback) {
  const drive = google.drive({version: 'v3', auth});

  drive.files.create({
    resource: fileMetadata,
    fields: 'id',
  }, function (err, file) {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      callback(file.data.id);
    }
  });
}

module.exports = { createDriveFolder };
