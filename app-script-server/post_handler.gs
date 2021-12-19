// TODO Add proper POST request body data validation

function doPost(request) {
  /* Handle all POST requests */
  var contents = JSON.parse(request.postData.contents);

  if (isValidPostRequest(contents)) {
    storeFormResponse(
      contents.data,
      courseChoiceIdResolver(contents.data.course_choice_id)
    );
    return Response(
      "form_submit",
      201,
      (data = {
        complete: true,
        message: "Form has successfully been submitted",
      })
    );
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

  for (const parameter of Object.keys({ ...contents.data })) {
    if (!postDataOptions.includes(parameter)) {
      return false;
    }
  }

  return true;
}
