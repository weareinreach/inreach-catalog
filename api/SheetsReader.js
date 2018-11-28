const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
//const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
//const TOKEN_PATH = 'token.json';


class SheetsReader {
  constructor (key, id) {
    this.sheets = google.sheets({
      version: 'v4', 
      auth: key
    });
    this.id = id;
  }

  getTabs() { 
    //console.log(this.id);
    return this.sheets.spreadsheets.get({
      spreadsheetId: this.id
    }).then(res => (res.data.sheets));
  }

  getRows(tab) {
    return (this.sheets.spreadsheets.values.get({
      spreadsheetId: this.id,
      range: tab.properties.title+'!A1:'+this._columnToLetter(tab.properties.gridProperties.columnCount)+tab.properties.gridProperties.rowCount
    }).then(res => {
      return res.data.values;
    }))

  }

  _columnToLetter(column) {
    var temp, letter = '';
    while (column > 0)
    {
      temp = (column - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      column = (column - temp - 1) / 26;
    }
    return letter;
  }


}

module.exports = SheetsReader;

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}