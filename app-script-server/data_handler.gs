function loadSheetDataAsDict(sheet) {
  /* Load data from the provided sheet in a list of
  object. Keys are determined by values given on
  row 1 (basically just like a CSV file) */
  var response = [];
  var data = sheet.getDataRange().getValues();
  const headers = data[0];

  for (const row of data.slice(1)) {
    var row_obj = {};
    for (const i in row) {
      row_obj[headers[i]] = row[i];
    }
    response.push(row_obj);
  }
  return response;
}
