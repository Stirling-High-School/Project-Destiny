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
  const data = loadSheetDataAsDict(META);
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
  var course_levels_data = loadSheetDataAsDict(COURSE_LEVELS);
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

function storeFormResponse(formResponseData, course_choice_name) {
  /* Insert the course choice form into the appropriate spreadsheet.
  Assumes course_choice_name is already valid, note this isn't the course_choice_id */
  var sheet = FORM_RESPONSES_SPREADSHEET.getSheetByName(course_choice_name);
  sheet.appendRow([" "]);
  sheet
    .getRange(
      sheet.getLastRow(),
      1,
      1,
      sheet.getDataRange().getValues()[0].length
    )
    .setBackground(SHEET_BORDER_COLOR);
  var choices = [...formResponseData.choices];
  delete formResponseData.choices;

  var optionalFields = Object.assign({}, formResponseData.optional_fields);
  delete formResponseData.optional_fields;

  appendSheetDataAsDict(sheet, {
    ...formResponseData,
    ...optionalFields,
    ...choices[0],
    choice_count: choices.length,
    submitted_at: new Date(),
  });

  for (const choice of choices.slice(1)) {
    appendSheetDataAsDict(sheet, choice);
  }
}

function test() {
  // Test writing of form to spreadsheet
  storeFormResponse(
    {
      email: "angus.henderson@citnow.com",
      name: "Angus Henderson",
      form_class: "6E1",
      choices: [
        {
          subject: "Maths",
          level: "Advanced Higher",
          weight: 1,
        },
        {
          subject: "Computing Science",
          level: "Advanced Higher",
          weight: 1,
        },
        {
          subject: "Physics",
          level: "Advanced Higher",
          weight: 1,
        },
      ],
      course_choice_id: "s45",
      optional_fields: {
        planned_destination: "Graduate Apprenticeship",
        planned_destination_details:
          "Looking to do a Graduate Apprenticeship in Software Engineering, potentially in fintech",
        expected_leaving_date: 2022,
        career_aspiration: "Software Engineer",
      },
    },
    "S4-5 Course Choices"
  );
}
