// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");
    // Declare a variable, tbody
    // Use d3.select to tell JavaScript to look for the <tbody> tags in the HTML

function buildTable(data) {
// Clear out any existing data
    // References the table, pointing JavaScript directly to the table in the HTML page to be built
    tbody.html("");
}
    // Parentheses with empty quotes (("");) is an empty string

// Loop through each object in the data and append a row and cells for each value in the row
data.forEach((dataRow) => {
    let row = tbody.append("tr");
    // Append a row to the table body

    // Loop through each field in the dataRow and add each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
    );
});

function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    
    // Check to see if a date was entered and filter the data using that date.
    if (date) {
      // Apply `filter` to the table data to only keep the rows where the `datetime` value matches the filter value
      filteredData = filteredData.filter(row => row.datetime === date);
    };
    
    // Rebuild the table using the filtered data
        // @NOTE: If no date was entered, then filteredData will just be the original tableData.
    buildTable(filteredData);
};
  
// Telling D3 to execute handleClick() function when the button with an id of filter-btn is clicked
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);