function generatePrizesTable(prizesValues) {
    // creates a <table> element and a <tbody> element
    var prizeTabel = document.querySelector("#prize-table");
    var tabelBody = document.createElement("tbody");
  
    // creates table's values row
    var row = document.createElement("tr");
    var rowInfoCell = document.createElement("td");
    rowInfoCell.innerHTML = "Addition to your earnings if you get this prize"
    row.appendChild(rowInfoCell);
  
    for (var j = 0; j < prizesValues.length; j++) {
        var prize = prizesValues[j];
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(`${prize}p`);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }
  
    // add the row to the end of the table body
    tabelBody.appendChild(row);
  
    // put the <tbody> in the <table>
    prizeTabel.appendChild(tabelBody);
}

generatePrizesTable(prizesValues);