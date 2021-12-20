function Response(type, status_code, data = null, errors = null) {
  /* Build a response object. To see schema see backend docs in Notion */
  var response = {
    type: type,
    status_code: status_code,
  };

  if (data !== null) {
    response.data = data;
  }

  if (errors !== null) {
    response.errors = errors;
  }

  return ContentService.createTextOutput(JSON.stringify(response));
}

// PREDEFINED RESPONSES
const FORM_SHUT_RESPONSE = Response(
  "form_shut",
  400,
  (errors = [
    {
      message: "This course choice form is not currently active",
      description: `Please contact the member of staff responsible for course choice if you believe this to be a mistake`,
      type: 400,
    },
  ])
);

const INVALID_COURSE_CHOICE_ID_RESPONSE = Response(
  "invalid_course_choice_id",
  404,
  (errors = [
    {
      message: "Invalid course_choice_id",
      description: `Please provide a valid course_choice_id to submit the course choice form`,
      type: 404,
    },
  ])
);
