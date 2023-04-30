function generatePrioritiesTable(players, priorities) {
    var prioritiesTabel = document.querySelector("#priorities-table");
    var tabelBody = document.createElement("tbody");

    var prioritiesTextList = [
        "1<sup>st</sup> priority (highest)",
        "2<sup>nd</sup> priority",
        "3<sup>rd</sup> priority",
        "4<sup>th</sup> priority (lowest)"
    ];
    
    for (var i = 0; i < prioritiesTextList.length; i++) {
        // Create a <tr> element and the leftmost <td> element
        // that contains a description of the values in that row
        var row = document.createElement("tr");
        var rowInfoCell = document.createElement("td");
        rowInfoCell.innerHTML = prioritiesTextList[i];
        row.appendChild(rowInfoCell);
        
        for (var j = 0; j < priorities.length; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            var playerIdx = priorities[j][i];
            var cellText = document.createTextNode(`${players[playerIdx]}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tabelBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    prioritiesTabel.appendChild(tabelBody);
}

generatePrioritiesTable(players, prizesPriorities);