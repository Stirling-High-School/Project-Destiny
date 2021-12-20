function doGet(request) {
  /* Handle all GET requests */
  if (isValidGetRequest(request)) {
    const course_choice_id = request.parameter.course_choice_id;
    if (courseChoiceIdResolver(course_choice_id) !== null) {
      if (isLive(course_choice_id)) {
        // Course choice ID is valid
        initializeConfiguration(course_choice_id);

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
            form_class_options: getSerializedFormClasses(),
          })
        );
      }

      return FORM_SHUT_RESPONSE;
    }

    return INVALID_COURSE_CHOICE_ID_RESPONSE;
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
