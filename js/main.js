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

// let slider = document.getElementById("slider");
// noUiSlider.create(slider, {
//     start: [1991, 2020],
//     connect: true,
//     range: {
//         min: 1991,
//         max: 2020
//     },
//     step: 1
// });


let dateFormatter = d3.timeFormat("%Y-%m-%d");
let dateParser = d3.timeParse("%Y-%m-%d");

let newsDeskData;
let newsDeskDescriptions;
let lineGraph;
let wordCloud;
let heatmap;
let sovietHeadlines;


d3.csv("data/randomized_data.csv", row => {
  row.year = Math.floor(row.year);
  return row
}).then(displayData => {
  lineGraph = new LineGraph("line-graph", displayData);
  wordCloud = new WordCloud("word-cloud", displayData);
  heatmap = new Heatmap("heatmap", displayData);

  // lineGraph.updateSlider();
});

d3.csv("data/news_desk_descriptions.csv", row => row).then(data => {
  newsDeskDescriptions = new NewsDeskDescriptions("news-desk-description", 
                                                   data);
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
  newsDeskDescriptions.wrangleData();
});

const scroller = scrollama();

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

// Scroll animation
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  steps.forEach((step) => observer.observe(step));
});