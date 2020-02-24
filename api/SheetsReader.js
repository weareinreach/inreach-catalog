const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
//const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
//const TOKEN_PATH = 'token.json';

class SheetsReader {
  constructor(key, id) {
    this.sheets = google.sheets({
      version: 'v4',
      auth: key
    });
    this.id = id;
  }

  getTabs() {
    //console.log(this.id);
    return this.sheets.spreadsheets
      .get({
        spreadsheetId: this.id
      })
      .then(res => res.data.sheets);
  }

  getRows(tab) {
    return this.sheets.spreadsheets.values
      .get({
        spreadsheetId: this.id,
        range:
          tab.properties.title +
          '!A1:' +
          this._columnToLetter(tab.properties.gridProperties.columnCount) +
          tab.properties.gridProperties.rowCount
      })
      .then(res => {
        return res.data.values;
      });
  }

  _columnToLetter(column) {
    var temp,
      letter = '';
    while (column > 0) {
      temp = (column - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      column = (column - temp - 1) / 26;
    }
    return letter;
  }
}

module.exports = SheetsReader;
