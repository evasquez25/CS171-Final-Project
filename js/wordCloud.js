class WordCloud {
    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 27, bottom: 20, left: 0};
        vis.width = document.getElementById(vis.parentElement).clientWidth - vis.margin.left - vis.margin.right;
        vis.height = 400 - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select(`#${vis.parentElement}`)
            .append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", `translate(${vis.margin.left}, ${vis.margin.top})`);

        // Group for word cloud
        vis.wordGroup = vis.svg.append("g")
            .attr("transform", `translate(${vis.width / 2}, ${vis.height / 2})`);

        vis.wrangleData();
    }

    wrangleData() {
        let vis = this;
        const newsDesk = document.getElementById('news-desk-selector').value;

        const categoryData = vis.data.filter(d =>
            d.ndc === newsDesk
        );

        let wordCounts = {};
        categoryData.forEach(d => {
            const word = d.word.toLowerCase();
            wordCounts[word] = wordCounts[word] ? wordCounts[word] + d.word_frequency : d.word_frequency;
        })

        vis.displayData = Object.entries(wordCounts)
            .map(([text, count]) => ({text, count: +count}))
            .sort((a, b) => b.count - a.count);

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // Calculate most frequent word and normalize
        const maxSize = d3.max(vis.displayData, d => d.count);

        const layout = d3.layout.cloud()
            .size([vis.width, vis.height])
            .words(vis.displayData)
            .padding(5)
            .rotate(() => ~~(Math.random() * 2) * 90)
            .fontSize(d => (d.count / maxSize) * 250)
            .on("end", draw);

        layout.start();

        // Draw  word cloud
        function draw(words) {
            const wordSelection = vis.wordGroup.selectAll("text")
                .data(words, d => d.text); // Use word text as the key

            // Transition for existing words
            wordSelection
                .transition()
                .duration(750)
                .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
                .style("font-size", d => `${d.size}px`);

            // Add new words
            wordSelection
                .enter()
                .append("text")
                .attr("text-anchor", "middle")
                .style("font-size", "0px") // Start small
                .style("fill", () => `hsl(${Math.random() * 360}, 70%, 50%)`)
                .attr("transform", `translate(0, 0)`) // Start from the center
                .text(d => d.text)
                .transition()
                .duration(750)
                .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
                .style("font-size", d => `${d.size}px`);

            // Remove old words
            wordSelection
                .exit()
                .transition()
                .duration(750)
                .style("opacity", 0)
                .remove();
        }
    }
}
