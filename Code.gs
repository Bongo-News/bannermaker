function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById("138bYvORkls5GW4nM6WDPtvNX0JzFPN2trqjJX2EpCsM").getActiveSheet();

    // শিটে ডাটা যোগ করা
    sheet.appendRow([new Date(), data.headline, data.text, data.image]);

    return ContentService.createTextOutput("Success")
      .setMimeType(ContentService.MimeType.TEXT);
  } catch(err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.openById("138bYvORkls5GW4nM6WDPtvNX0JzFPN2trqjJX2EpCsM").getActiveSheet();
    var lastRow = sheet.getLastRow();
    var values = sheet.getRange(lastRow, 2, 1, 3).getValues()[0];

    var result = {
      headline: values[0],
      text: values[1],
      image: values[2]
    };

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}
