function doGet(request) {
  /* Handle all GET requests */
  if (isValidGetRequest(request)) {
    if (courseChoiceIdResolver(request.parameter.course_choice_id) !== null) {
      // Course choice ID is valid
      initializeConfiguration(request.parameter.course_choice_id);

      const courses = loadSheetDataAsDict(
        CONFIG.CONFIGURATION_SPREADSHEET.getSheetByName("Course Choices")
      );

      return Response(
        "fetch_course",
        200,
        (data = {
          choices: serializeCourses(courses),
          additional_fields: getSerializedAdditionalFormFields(),
          config: getSerializedConfig(),
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
    CONFIG.CONFIGURATION_SPREADSHEET.getSheetByName("Additional Form Fields")
  );
}
