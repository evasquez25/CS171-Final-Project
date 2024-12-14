const width = 500;
const height = 500;

let newsDeskData;
let newsDeskDescriptions;
let lineGraph;
let wordCloud;
let heatmap;
let sovietHeadlines
let financialCrisisHeadlines;


d3.csv("data/lineGraph_heatMap_data.csv", row => {
  row.year = Math.floor(row.year);
  row.headline_count = +row.headline_count;
  row.avg_headline_len = Math.round(+row.avg_headline_len)
  return row
}).then(displayData => {
  lineGraph = new LineGraph("line-graph", displayData);
  heatmap = new Heatmap("heatmap", displayData);
});

d3.csv("data/wordcloud_data.csv", row => row).then(displayData => {
  wordCloud = new WordCloud("word-cloud", displayData);
});

d3.csv("data/news_desk_descriptions.csv", row => row).then(data => {
  newsDeskDescriptions = new NewsDeskDescriptions("news-desk-description", 
                                                   data);
});


d3.csv("data/soviet_headlines.csv", row => {
  row.year = Math.floor(+row.year);
  return row;
}).then(headlineData => {
  sovietHeadlines = new HeadlinesDisplay("soviet-headlines", headlineData);
});

d3.csv("data/financial_crisis_headlines.csv", row => {
  row.year = Math.floor(+row.year);
  return row;
}).then(headlineData => {
  financialCrisisHeadlines = new HeadlinesDisplay("financial-crisis-headlines", headlineData);
});

document.getElementById('news-desk-selector').addEventListener('change', () => {
  lineGraph.wrangleData();
  wordCloud.wrangleData();
  heatmap.wrangleData();
  newsDeskDescriptions.wrangleData();
});

document.getElementById('sovietHeadlinesButton').addEventListener("click", () => {
  sovietHeadlines.wrangleData();
});

document.getElementById('financialCrisisButton').addEventListener("click", () => {
  financialCrisisHeadlines.wrangleData();
});