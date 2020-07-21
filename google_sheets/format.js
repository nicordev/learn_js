
function formatPairRows() {
    let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadSheet.getSheets()[0];
    let cell = sheet.getRange('B4:D4');
    
    for (let row = 4; row <= 1000; row += 2) {
      cell = sheet.getRange(`B${row}:D${row}`);
      //cell.setFontStyle('normal');
      cell.setBackgroundRGB(159, 182, 206);
    }
  }
  