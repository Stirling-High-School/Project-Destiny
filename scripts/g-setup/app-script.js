const {google} = require('googleapis');

/**
 * Creates a new script project, upload a file, and log the script's URL.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function callAppsScript(auth) {
  const script = google.script({version: 'v1', auth});
  script.projects.create({
    resource: {
      title: 'My Script',
    },
  }, (err, res) => {
    if (err) return console.log(`The API create method returned an error: ${err}`);
    script.projects.updateContent({
      scriptId: res.data.scriptId,
      auth,
      resource: {
        files: [{
          name: 'hello',
          type: 'SERVER_JS',
          source: 'function helloWorld() {\n  console.log("Hello, world!");\n}',
        }, {
          name: 'appsscript',
          type: 'JSON',
          source: '{\"timeZone\":\"America/New_York\",\"exceptionLogging\":' +
           '\"CLOUD\"}',
        }],
      },
    }, {}, (err, res) => {
      if (err) return console.log(`The API updateContent method returned an error: ${err}`);
      console.log(`https://script.google.com/d/${res.data.scriptId}/edit`);
    });
  });
}

module.exports = { callAppsScript };
