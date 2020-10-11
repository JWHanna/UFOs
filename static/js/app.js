// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");
    // Declare a variable, tbody
    // Use d3.select to tell JavaScript to look for the <tbody> tags in the HTML

function buildTable(data) {
    // Clear out any existing data
    tbody.html("");
    
    // Loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");
    
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}
  
// Keep track of all filters
var filters = {};

function updateFilters() {

    // Save element, value, and id of filter that was changed
    let changedElement = d3.select(this);
    let filterVal = changedElement.property("value")
    let filterId = changedElement.attr("id")

    // Add filter data from input
    if (filterVal) {
        filters[filterId] = filterVal;
    }
    // clear the filter if no input data exists
    else {
        delete filters[filterId];
    }

    // Call function to apply all filters and rebuild the table
    filterTable();
}


function filterTable() {

    // Set the filteredData to the tableData
    let filteredData = tableData;

    // Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([key, val]) => {
        filteredData = filteredData.filter(row => row[key] === val);
    });
    

    // Finally, rebuild the table using the filtered Data
    buildTable(filteredData);
  }

// Telling D3 to execute handleClick() function when the button with an id of filter-btn is clicked
d3.selectAll("input").on("changedFilter", updateFilters);

// Build the table when the page loads
buildTable(tableData);