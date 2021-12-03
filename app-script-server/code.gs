const getParameters = ["course_choice_id"];
const postDataOptions = ["email", "name", "form_class", "choices"];
const nonCourseChoiceOptions = ["Subject"];

function doGet(request) {
  /* Handle all GET requests */
  if (isValidGetRequest(request)) {
    const courseChoiceName = courseChoiceIsResolver(
      request.parameters.course_choice_id
    );
    if (courseChoiceName !== null) {
      const courses = loadSheetDataAsDict(
        CONFIGURATION_SPREADSHEET.getSheetByName(courseChoiceName)
      );
      return Response(
        "fetch_course",
        200,
        (data = {
          choices: serializeCourses(courses),
          additional_fields: getSerializedAdditionalFormFields(),
        })
      );
    }
    return Response(
      "fetch_course",
      404,
      (errors = [
        {
          message: "Invalid course_choice_id",
          description: `Please provide a valid course_choice_id to fetch course choice information`,
          type: 404,
        },
      ])
    );
  }
  return Response(
    "fetch_course",
    404,
    (errors = [
      {
        message: "course_choice_id not provided",
        description:
          "Please provide a valid course_choice_id to fetch course choice information",
        type: 404,
      },
    ])
  );
}

function doPost(request) {
  /* Handle all POST requests */
}

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

function isValidGetRequest(request) {
  /* Determine wether the parameters provided in a get request are valid */
  for (const [parameter, _] of Object.entries(request.parameters)) {
    if (!getParameters.includes(parameter)) {
      return false;
    }
  }

  return true;
}

function isValidPostRequest(request) {
  /* Determine wether the body of the provided POST request is valid */
  if (!request.postData.contents.includes("data")) {
    return false;
  }

  for (const [parameter, _] of Object.entires(request.postData.contents.data)) {
    if (!postDataOptions.includes(parameter)) {
      return false;
    }
  }

  return true;
}

function serializeCourses(course_data) {
  /* Convert raw course choice data from the spreadsheet into a json serialized object */
  var response = [];
  for (var course of course_data) {
    var r = {
      subject: course.Subject,
    };
    var c = [];

    for (const [option, enabled] of Object.entries(course)) {
      if (!nonCourseChoiceOptions.includes(option) && enabled) {
        c.push(option);
      }
    }

    if (c.length !== 0) {
      r.levels = c;
      response.push(r);
    }
  }
  return response;
}

function getSerializedAdditionalFormFields() {
  /* Get the additional form fields, serialized and ready for response */
  return loadSheetDataAsDict(
    CONFIGURATION_SPREADSHEET.getSheetByName("Additional Form Fields")
  );
}

function courseChoiceIsResolver(choiceChoiceId) {
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
