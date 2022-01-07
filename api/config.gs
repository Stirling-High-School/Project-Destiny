/* Project wide configuration */
const ROOT_CONFIGURATION_SPREADSHEET_ID =
  "1laQGLcOqh0ukifaVeAjvBG7N9mWerIDB7tYOz1cZOa4";
const ROOT_CONFIGURATION_SPREADSHEET = SpreadsheetApp.openById(
  ROOT_CONFIGURATION_SPREADSHEET_ID
);

var CONFIG = {
  // ROOT LEVEL CONFIGURATION
  COURSE_ID_MAP: ROOT_CONFIGURATION_SPREADSHEET.getSheetByName("Course ID Map"),
  // Map of request id's to sheet names
  COURSE_LEVELS: ROOT_CONFIGURATION_SPREADSHEET.getSheetByName("Course Levels"),

  // CONFIGURATION DEPENDANT ON SELECTED LEVEL
  CONFIGURATION_SPREADSHEET: null,
  FORM_RESPONSES_SPREADSHEET: null,

  // Color of border separating form responses - feel free to edit!
  SHEET_BORDER_COLOR: "#4285f4",
};

function initializeConfiguration(course_choice_id) {
  // Fetch configuration data from the course_choice_id provided, assumes this is a valid id!
  const sheet_data = loadSheetDataAsDict(CONFIG.COURSE_ID_MAP);
  const course_choice_metadata = getAttributesForKey(
    "course_choice_id",
    course_choice_id,
    sheet_data
  );

  CONFIG.CONFIGURATION_SPREADSHEET = SpreadsheetApp.openById(
    course_choice_metadata.config_spreadsheet_id
  );
  CONFIG.FORM_RESPONSES_SPREADSHEET = SpreadsheetApp.openById(
    course_choice_metadata.form_responses_spreadsheet_id
  );
}

const all_courses_without_keys = [
  "config_spreadsheet_id",
  "form_responses_spreadsheet_id",
];
const postDataOptions = [
  "email",
  "name",
  "form_class",
  "choices",
  "course_choice_id",
  "optional_fields",
];
const nonCourseChoiceOptions = ["Subject", "Department"];
