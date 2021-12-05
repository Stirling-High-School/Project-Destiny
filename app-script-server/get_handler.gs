function doGet(request) {
  /* Handle all GET requests */
  if (isValidGetRequest(request)) {
    const courseChoiceName = courseChoiceIdResolver(
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

function isValidGetRequest(request) {
  /* Determine wether the parameters provided in a get request are valid */
  for (const [parameter, _] of Object.entries(request.parameters)) {
    if (!getParameters.includes(parameter)) {
      return false;
    }
  }

  return true;
}

function getSerializedAdditionalFormFields() {
  /* Get the additional form fields, serialized and ready for response */
  return loadSheetDataAsDict(
    CONFIGURATION_SPREADSHEET.getSheetByName("Additional Form Fields")
  );
}
