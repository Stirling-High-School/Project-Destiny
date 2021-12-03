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
      if (row[i]) {
        if (typeof row[i] === "string") {
          if (
            row[i].charAt(0) === "[" &&
            row[i].charAt(row[i].length - 1) == "]"
          ) {
            // The current cell is a list
            row_obj[headers[i]] = JSON.parse(row[i].replace(/'/g, '"'));
            continue;
          }
        }
        row_obj[headers[i]] = row[i];
      }
    }
    response.push(row_obj);
  }
  return response;
}
