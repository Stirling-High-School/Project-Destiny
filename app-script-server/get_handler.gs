/* All handling related to processing GET requests */

function doGet(request) {
  /* Handle all GET requests */
  if (courseChoiceIdProvided(request)) {
    const course_choice_id = request.parameter.course_choice_id;
    if (courseChoiceIdResolver(course_choice_id) !== null) {
      if (isLive(course_choice_id)) {
        if (emailProvided(request)) {
          initializeConfiguration(course_choice_id);

          if (!checkFormAlreadySubmitted(request.parameter.email)) {
            // Request is valid

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
                wider_achievement_options: getSerializedWiderAchievement(), // David added:
              })
            );
          }

          return FORM_ALREADY_SUBMITTED_RESPONSE;
        }

        return NO_EMAIL_PROVIDED_RESPONSE;
      }

      return FORM_SHUT_RESPONSE;
    }

    return INVALID_COURSE_CHOICE_ID_RESPONSE;
  }

  // Return high level id summary for all courses
  return Response(
    "all_courses",
    200,
    (data = {
      config: getSerializedRootConfig(),
      courses: getAllSerializedCourses(),
    })
  );
}

function courseChoiceIdProvided(request) {
  /* Determine wether the parameters provided in a get request are valid */
  return "course_choice_id" in request.parameter;
}

function emailProvided(request) {
  /* Determine whether the request includes email as a parameter */
  return "email" in request.parameter;
}

function getSerializedAdditionalFormFields() {
  /* Get the additional form fields, serialized and ready for response */
  return loadSheetDataAsDict(
    CONFIG.CONFIGURATION_SPREADSHEET.getSheetByName("Additional Form Fields")
  );
}
