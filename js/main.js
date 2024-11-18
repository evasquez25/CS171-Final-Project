
// Load data
d3.csv("../nyt_data.csv").then(function(data) {
    console.log(data);
    const wordCloud = new WordCloud("word-cloud-container", data);
});