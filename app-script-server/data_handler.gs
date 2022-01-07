/* Set of code to streamline relationships between data stored
/* Set of code to streamline relationships between data stored
in spreadsheets and data sent/received from the client. This also
includes a set of utilities for serializing and deserializing data
to allow it to be transported and refrences respectively */

function loadSheetDataAsDict(sheet) {
  /* Load data from the provided sheet in a list of
  object. Keys are determined by values given on
  row 1 (basically just like a CSV file) */
  var response = [];
  var data = sheet.getDataRange().getValues();
  const headers = data[0];

  for (const row of data.slice(1)) {
    var row_obj = {};
    for (const i in row) {
      if (row[i]) {
        if (typeof row[i] === "string") {
          if (
            row[i].charAt(0) === "[" &&
            row[i].charAt(row[i].length - 1) == "]"
          ) {
            // The current cell is a list
            row_obj[headers[i]] = JSON.parse(row[i].replace(/'/g, '"'));
            continue;
          }
        }
        row_obj[headers[i]] = row[i];
      }
    }
    response.push(row_obj);
  }
  return response;
}

function appendSheetDataAsDict(sheet, data) {
  /* Write a dictionary to a given sheet, keys are mapped to the headers
  given on line 1 of the provided sheet. NOTE No data vaidation
  takes place here */
  // Get the header rows for data keys
  const keys = sheet.getDataRange().getValues()[0];
  var row = [];

  for (const key of keys) {
    if (data.hasOwnProperty(key)) {
      // Prevent key error
      row.push(data[key]);
    } else {
      row.push("");
    }
  }
  sheet.appendRow(row);
}

function courseChoiceIdResolver(choiceChoiceId) {
  /* Convert course_choice_id to the display name of the corresponding sheet
  null returned if no id is found */
  const data = loadSheetDataAsDict(CONFIG.COURSE_ID_MAP);
  for (const row of data) {
    if (choiceChoiceId == row.course_choice_id) {
      return row.display_name;
    }
  }
  return null;
}

function serializeCourses(course_data) {
  /* Convert raw course choice data from the spreadsheet into a json serialized object */
  var response = [];
  var course_levels_data = loadSheetDataAsDict(CONFIG.COURSE_LEVELS);
  for (var course of course_data) {
    var r = {
      subject: course.Subject,
      department: course.Department,
    };
    var c = [];

    for (const [option, enabled] of Object.entries(course)) {
      if (!nonCourseChoiceOptions.includes(option) && enabled) {
        const level_data = getAttributesForKey(
          "display_name",
          option,
          course_levels_data
        );
        if (level_data) {
          c.push(level_data);
        }
      }
    }

    if (c.length !== 0) {
      r.levels = c;
      response.push(r);
    }
  }
  return response;
}

function getAttributesForKey(attribute_name, attribute_value, sheet_data) {
  /* Given an attribute name and value, find it within sheet_data and dictionary representation of sheet values */
  for (const row of sheet_data) {
    if (row[attribute_name] === attribute_value) {
      return row;
    }
  }
  return null;
}

function storeFormResponse(formResponseData) {
  /* Insert the course choice form into the appropriate spreadsheet.
  Assumes configuration has already been initialized */

  const emailData = JSON.parse(JSON.stringify(formResponseData));

  var sheet =
    CONFIG.FORM_RESPONSES_SPREADSHEET.getSheetByName("Form Responses");
  sheet.appendRow([" "]);
  sheet
    .getRange(
      sheet.getLastRow(),
      1,
      1,
      sheet.getDataRange().getValues()[0].length
    )
    .setBackground(CONFIG.SHEET_BORDER_COLOR);
  var choices = [...formResponseData.choices];
  delete formResponseData.choices;

  // Lower case all keys in optionalFields
  var key,
    keys = Object.keys(formResponseData.optional_fields);
  var n = keys.length;
  var optionalFields = {};
  while (n--) {
    key = keys[n];
    optionalFields[key.toLowerCase()] = formResponseData.optional_fields[key];
  }

  delete formResponseData.optional_fields;

  var wider_achievement_options =
    "wider_achievement_options" in formResponseData
      ? formResponseData.wider_achievement_options
      : [""];

  appendSheetDataAsDict(sheet, {
    ...formResponseData,
    ...optionalFields,
    ...choices[0],
    wider_achievement_options: wider_achievement_options[0],
    choice_count: choices.length,
    submitted_at: new Date(),
  });

  // Remove rows already added to sheet
  choices.shift();
  wider_achievement_options.shift();

  while (choices.length !== 0 || wider_achievement_options.length !== 0) {
    var data = {};
    if (choices.length !== 0) {
      data = { ...data, ...choices[0] };
      choices.shift();
    }
    if (wider_achievement_options.length !== 0) {
      data = {
        ...data,
        wider_achievement_options: wider_achievement_options[0],
      };
      wider_achievement_options.shift();
    }

    appendSheetDataAsDict(sheet, data);
  }

  /* Send confirmation email */
  sendEmail(emailData);
}

function checkFormAlreadySubmitted(email) {
  /* Determine whether a given user, identifiable under an email address, has already submitted a form response */
  for (const row of loadSheetDataAsDict(
    CONFIG.FORM_RESPONSES_SPREADSHEET.getSheetByName("Form Responses")
  )) {
    if (row.email === email) {
      return true;
    }
  }
  return false;
}

function __loadConfig(sheet) {
  /* Load key value config data from a provided config sheet */
  const response = {};
  for (const row of loadSheetDataAsDict(sheet)) {
    response[row.key] = row.value;
  }
  return response;
}

function getSerializedConfig() {
  /* Fetch all configuration data from the initialized config sheet, these are
  simply key value pairs */
  return __loadConfig(
    CONFIG.CONFIGURATION_SPREADSHEET.getSheetByName("Config")
  );
}

function getSerializedRootConfig() {
  /* Fetch all configuration data from the project root config sheet, these are
  simply key value pairs */
  return __loadConfig(ROOT_CONFIGURATION_SPREADSHEET.getSheetByName("Config"));
}

function getSerializedFormClasses() {
  /* Fetch all form classes from the Form Classes sheet from the initialized
  config spreadsheet, these are a list of strings */
  var response = [];
  for (const row of loadSheetDataAsDict(
    CONFIG.CONFIGURATION_SPREADSHEET.getSheetByName("Form Classes")
  )) {
    response.push(row.form_class);
  }
  return response;
}

// David added:
function getSerializedWiderAchievement() {
  /* Fetch all wider achievement options from the Wider Achievement Choices sheet from the initialized
  config spreadsheet, these are a list of strings */
  var response = [];
  try {
    for (const row of loadSheetDataAsDict(
      CONFIG.CONFIGURATION_SPREADSHEET.getSheetByName(
        "Wider Achievement Choices"
      )
    )) {
      response.push(row.wider_achievement);
    }
    return response;
  } catch {
    return null;
  }
}

function getAllSerializedCourses() {
  /* Load Course ID Map data from root project configuration */
  const data = loadSheetDataAsDict(CONFIG.COURSE_ID_MAP);
  for (const row of data) {
    all_courses_without_keys.forEach((e) => delete row[e]);
  }
  return data;
}
