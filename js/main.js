// Function to convert date objects to strings or reverse
import { newsDeskDescriptions } from "./newsDeskDescriptions.js";

let dateFormatter = d3.timeFormat("%Y-%m-%d");
let dateParser = d3.timeParse("%Y-%m-%d");

let lineGraph;
let wordCloud;
let heatmap;

d3.csv("data/randomized_data.csv", row => row).then(displayData => {
    lineGraph = new LineGraph("line-graph", displayData);
    wordCloud = new WordCloud("word-cloud", displayData);
    heatmap = new Heatmap("heatmap", displayData);
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


