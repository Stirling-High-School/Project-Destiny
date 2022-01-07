/* Generic request handling logic */

function isLive(course_choice_id) {
  /* Determines wether the course choice form is currently live,
  assumes initialization has occurred and course_choice_id is valid */
  return getAttributesForKey(
    "Year Group",
    course_choice_id,
    loadSheetDataAsDict(
      ROOT_CONFIGURATION_SPREADSHEET.getSheetByName("Course Choices Live")
    )
  )["Is Live"];
}
