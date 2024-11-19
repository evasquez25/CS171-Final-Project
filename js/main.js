// Function to convert date objects to strings or reverse
let dateFormatter = d3.timeFormat("%Y-%m-%d");
let dateParser = d3.timeParse("%Y-%m-%d");
let lineGraph;

// (1) Load data with promises
d3.csv("data/randomized_data.csv", row => row).then(displayData => {
    lineGraph = new LineGraph("line-graph", displayData);
});
