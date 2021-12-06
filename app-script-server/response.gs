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
