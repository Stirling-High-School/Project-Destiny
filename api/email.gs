/* All handling related to formatting and sending confirmation emails */

function sendEmail(formResponseData) {
  Logger.log(formResponseData);
  GmailApp.sendEmail(formResponseData.email, "Your Course Choices", "", {
    htmlBody: generateEmailBody(formResponseData),
  });
}

function generateEmailBody(formResponseData) {
  const MESSAGE = "";

  let body = `<!DOCTYPE html>
  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
      <title>Your Course Choices</title>
      <meta charset="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <!--[if mso]>
          <xml>
              <o:OfficeDocumentSettings>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                  <o:AllowPNG/>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />
      <!--<![endif]-->
      <style>
          * {
              box-sizing: border-box;
          }

          body {
              margin: 0;
              padding: 0;
          }

          th.column {
              padding: 0
          }

          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          }

          #MessageViewBody a {
              color: inherit;
              text-decoration: none;
          }

          p {
              line-height: inherit
          }

          @media (max-width:640px) {
              .icons-inner {
                  text-align: center;
              }

              .icons-inner td {
                  margin: 0 auto;
              }

              .row-content {
                  width: 100% !important;
              }

              .stack .column {
                  width: 100%;
                  display: block;
              }
          }
      </style>
  </head>

  <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
          <tbody>
              <tr>
                  <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                          role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000;"
                                          width="620">
                                          <tbody>
                                              <tr>
                                                  <th class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                          <p
                                                                              style="margin: 0; font-size: 14px; text-align: center;">
                                                                              <strong><span style="font-size:18px;">Hi
                                                                                      ${formResponseData.name}, here are
                                                                                      your course
                                                                                      choices</span></strong><strong><span
                                                                                      style="font-size:18px;">!</span></strong>
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:25px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #71777D; line-height: 1.2;">
                                                                          <p
                                                                              style="margin: 0; font-size: 14px; text-align: center;">
                                                                              Thank you for submitting your course
                                                                              choices, this email is confirmation that we
                                                                              have received your choices!
                                                                              <br><br>
                                                                              If any of the following information is
                                                                              incorrect, or you wish to change your
                                                                              choices, please contact the member of staff
                                                                              responsible for school course choices,
                                                                              they'll be happy to help you out!
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </th>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                          role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; color: #333;"
                                          width="620">
                                          <tbody>
                                              <tr>
                                                  <th class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #FFFFFF; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                          <p style="margin: 0; font-size: 14px;">Subject
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </th>
                                                  <th class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="25%">
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #FFFFFF; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                          <p style="margin: 0; font-size: 14px;"><span
                                                                                  style="font-size:14px;">Level</span><br />
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </th>
                                                  <th class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="25%">
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #FFFFFF; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                          <p style="margin: 0; font-size: 14px;"><span
                                                                                  style="font-size:14px;">Weighting</span><br />
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </th>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>`;

  for (choice of formResponseData.choices) {
    body += `<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
      role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                    <tr>
                        <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #333;"
                                width="620">
                                <tbody>
                                    <tr>
                                        <th class="column"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                            width="50%">
                                            <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                width="100%">
                                                <tr>
                                                    <td
                                                        style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:25px;">
                                                        <div style="font-family: sans-serif">
                                                            <div
                                                                style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                <p style="margin: 0; font-size: 14px;">
                                                                    <span style="color:#000000;font-size:14px;">
                                                                        ${choice.subject}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </th>
                                        <th class="column"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                            width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                width="100%">
                                                <tr>
                                                    <td
                                                        style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:25px;">
                                                        <div style="font-family: sans-serif">
                                                            <div
                                                                style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                <p style="margin: 0; font-size: 14px;">${choice.level}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </th>
                                        <th class="column"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                            width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                width="100%">
                                                <tr>
                                                    <td
                                                        style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:25px;">
                                                        <div style="font-family: sans-serif">
                                                            <div
                                                                style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                <p style="margin: 0; font-size: 14px;">${choice.weight}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>`;
  }

  if (formResponseData.wider_achievement_options) {
    body += `<br><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                            role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; color: #333;"
                                            width="620">
                                            <tbody>
                                                <tr>
                                                    <th class="column"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                            role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td
                                                                    style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div
                                                                            style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #FFFFFF; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                            <p style="margin: 0; font-size: 14px;">Wider Achievement Choices
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </th>
                                
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>`;

    for (let i in formResponseData.wider_achievement_options) {
      body += `<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                  <tbody>
                      <tr>
                          <td>
                              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                  role="presentation"
                                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #333;"
                                  width="620">
                                  <tbody>
                                      <tr>
                                          <th class="column"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                              width="100%">
                                              <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                  role="presentation"
                                                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                  width="100%">
                                                  <tr>
                                                      <td
                                                          style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:25px;">
                                                          <div style="font-family: sans-serif">
                                                              <div
                                                                  style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                  <p style="margin: 0; font-size: 14px;">
                                                                      <span style="color:#000000;font-size:14px;">
                                                                          ${formResponseData.wider_achievement_options[i]}
                                                                      </span>
                                                                  </p>
                                                              </div>
                                                          </div>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </th>
                                  
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>`;
    }
  }

  if (formResponseData.optional_fields) {
    body += `<br><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                            role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; color: #333;"
                                            width="620">
                                            <tbody>
                                                <tr>
                                                    <th class="column"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                            role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td
                                                                    style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div
                                                                            style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #FFFFFF; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                            <p style="margin: 0; font-size: 14px;">Question
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </th>
                                                    <th class="column"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                          role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td
                                                                  style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                  <div style="font-family: sans-serif">
                                                                      <div
                                                                          style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #FFFFFF; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                          <p style="margin: 0; font-size: 14px;"><span
                                                                                  style="font-size:14px;">Response</span><br />
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>`;

    for (let i in formResponseData.optional_fields) {
      body += `<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                  <tbody>
                      <tr>
                          <td>
                              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                  role="presentation"
                                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #333;"
                                  width="620">
                                  <tbody>
                                      <tr>
                                          <th class="column"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                              width="50%">
                                              <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                  role="presentation"
                                                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                  width="100%">
                                                  <tr>
                                                      <td
                                                          style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:25px;">
                                                          <div style="font-family: sans-serif">
                                                              <div
                                                                  style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                  <p style="margin: 0; font-size: 14px;">
                                                                      <span style="color:#000000;font-size:14px;">
                                                                          ${i}
                                                                      </span>
                                                                  </p>
                                                              </div>
                                                          </div>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </th>
                                          <th class="column"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                            width="50%">
                                            <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                width="100%">
                                                <tr>
                                                    <td
                                                        style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:25px;">
                                                        <div style="font-family: sans-serif">
                                                            <div
                                                                style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;">
                                                                <p style="margin: 0; font-size: 14px;">${formResponseData.optional_fields[i]}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </th>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>`;
    }
  }

  body += `<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-12" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                        role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000;"
                                        width="620">
                                        <tbody>
                                            <tr>
                                                <th class="column"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                    width="100%">
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="text_block" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        width="100%">
                                                        <tr>
                                                            <td>
                                                                <div style="font-family: sans-serif">
                                                                    <div
                                                                        style="font-size: 12px; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                        <p
                                                                            style="margin: 0; font-size: 14px; text-align: center;">
                                                                            <span style="font-size:12px;">
                                                                                ${MESSAGE}
                                                                            </span><br />
                                                                        </p>
                                                                        <p
                                                                            style="margin: 0; font-size: 14px; text-align: center;">
                                                                            <br />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- End -->
</body>

</html>`;

  return body;
}
