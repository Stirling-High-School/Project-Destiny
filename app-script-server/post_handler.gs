// TODO Potentially add deeper validation, inline with config and additional_fields

function doPost(request) {
  /* Handle all POST requests */
  var contents = JSON.parse(request.postData.contents);

  if (isValidPostRequest(contents)) {
    if (courseChoiceIdResolver(contents.data.course_choice_id) !== null) {
      // Course choice ID is valid
      initializeConfiguration(contents.data.course_choice_id);

      if (!checkFormAlreadySubmitted(contents.data.email)) {
        storeFormResponse(contents.data);

        Logger.log("Form submission success");
        return Response(
          "form_submit",
          201,
          (data = {
            complete: true,
            message: "Form has successfully been submitted",
          })
        );
      }

      Logger.log("Form already submitted");
      return FORM_ALREADY_SUBMITTED_RESPONSE;
    }

    Logger.log("Invalid course choice ID");
    return INVALID_COURSE_CHOICE_ID_RESPONSE;
  }

  return Response(
    "form_submit",
    400,
    (errors = [{ message: "Invalid request", description: "", type: 400 }])
  );
}

function isValidPostRequest(contents) {
  /* Determine wether the body of the provided POST request is valid */
  Logger.log(contents);
  if (!("data" in contents)) {
    return false;
  }

  for (const parameter of postDataOptions) {
    if (!(parameter in contents.data)) {
      return false;
    }
  }

  return true;
}
