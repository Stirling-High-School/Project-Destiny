const CONFIGURATION_SPREADSHEET_ID =
  "1laQGLcOqh0ukifaVeAjvBG7N9mWerIDB7tYOz1cZOa4";
const FORM_RESPONSES_SPREADSHEET_ID =
  "1QBErgKFQLoZm5II91zFlBb49YopauZRxZ7yUyV7CPn0";

const CONFIGURATION_SPREADSHEET = SpreadsheetApp.openById(
  CONFIGURATION_SPREADSHEET_ID
);
const FORM_RESPONSES_SPREADSHEET = SpreadsheetApp.openById(
  FORM_RESPONSES_SPREADSHEET_ID
);

// Map of request id's to sheet names
const META = CONFIGURATION_SPREADSHEET.getSheetByName("Course ID Map");
const COURSE_LEVELS = CONFIGURATION_SPREADSHEET.getSheetByName("Course Levels");

// TODO I feel like this can be standardised in a better way
const getParameters = ["course_choice_id"];
const postDataOptions = [
  "email",
  "name",
  "form_class",
  "choices",
  "course_choice_id",
  "optional_fields",
];
const nonCourseChoiceOptions = ["Subject", "Department"];

const SHEET_BORDER_COLOR = "#4285f4";
