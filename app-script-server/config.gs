const CONFIGURATION_SPREADSHEET_ID =
  "1laQGLcOqh0ukifaVeAjvBG7N9mWerIDB7tYOz1cZOa4";

const CONFIGURATION_SPREADSHEET = SpreadsheetApp.openById(
  CONFIGURATION_SPREADSHEET_ID
);

// Map of request id's to sheet names
// TODO: Potentially change the name of this, meta is a bit too general, meta should be key value pairs, not a dedicated table
const META = CONFIGURATION_SPREADSHEET.getSheetByName("Meta Data");
