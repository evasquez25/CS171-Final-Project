// Function to convert date objects to strings or reverse
import { newsDeskDescriptions } from "./newsDeskDescriptions.js";

const width = 500;
const height = 500;

// const points = d3.range(20).map(() => ({
//     x: Math.random() * width,
//     y: Math.random() * height
// }))

// const circles = d3.selected("svg")
//     .selectAll("circles")
//     .data(points)
//     .join("circles")
//     .attr("cx", width / 2)
//     .attr("cy", height / 2)
//     .attr("r", 10)
//     .attr('color', "steelblue");

let dateFormatter = d3.timeFormat("%Y-%m-%d");
let dateParser = d3.timeParse("%Y-%m-%d");

let lineGraph;
let wordCloud;
let heatmap;
let sovietHeadlines;

d3.csv("data/randomized_data.csv", row => row).then(displayData => {
    lineGraph = new LineGraph("line-graph", displayData);
    wordCloud = new WordCloud("word-cloud", displayData);
    heatmap = new Heatmap("heatmap", displayData);
});

d3.csv("data/soviet_headlines.csv", row => {
    row.year = Math.floor(+row.year);
    return row;
}).then(headlineData => {
    sovietHeadlines = new SovietHeadlines("soviet-headlines", headlineData);
});

document.getElementById('news-desk-selector').addEventListener('change', () => {
    lineGraph.wrangleData();
    wordCloud.wrangleData();
    heatmap.wrangleData();
});

document.getElementById('news-desk-description-selector')
    .addEventListener('change', function() {
        const selectedValue = this.value;
        const description = newsDeskDescriptions.find(item => Object.keys(item)[0] === selectedValue);
        if (description) {
            document.getElementById('news-desk-description').textContent = description[selectedValue];
        }
    });

// instantiate the scrollama
const scroller = scrollama();

// setup the instance, pass callback functions
scroller
  .setup({
    step: ".step",
  })
  .onStepEnter((response) => {
    console.log("enter", response);
    // { element, index, direction }
  })
  .onStepExit((response) => {
    console.log("exit", response);
    // { element, index, direction }
  });
