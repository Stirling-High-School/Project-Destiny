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

const NO_EMAIL_PROVIDED_RESPONSE = Response(
  "no_email_provided",
  400,
  (errors = [
    {
      message: "No email provided",
      description:
        "Please provide an email address so we can ensure no response is submitted multiple times",
      type: 400,
    },
  ])
);

const FORM_ALREADY_SUBMITTED_RESPONSE = Response(
  "form_already_submitted",
  422,
  (errors = [
    {
      message: "Form already submitted",
      description:
        "This email address has already been used to submit a form response, you cannot submit another form using the same email",
      type: 422,
    },
  ])
);
