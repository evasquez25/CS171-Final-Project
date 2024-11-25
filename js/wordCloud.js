
class WordCloud {
    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        vis.width = document.getElementById(vis.parentElement).clientWidth - vis.margin.left - vis.margin.right;
        vis.height = 500 - vis.margin.top - vis.margin.bottom;

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
            d.news_desk_category &&
            d.news_desk_category.includes(newsDesk)
        );

        // Filter titles
        const stopWords = new Set([
            "the", "a", "an", "and", "to", "of", "in", "on", "at", "for", "by",
            "with", "as", "from", "that", "this", "is", "was", "it", "are", "be",
            "or", "not", "but", "they", "their", "you", "we", "our", "your", "he",
            "she", "them", "his", "her", "its", "all", "will", "can", "too", "into",
            "what", "when", "where", "how", "why", "who", "which", "whom", "whose"
        ]);

        const wordCounts = {};
        console.log("our data: ", vis.data);
        categoryData.forEach(d => {
            d.headline
                .toLowerCase()
                .replace(/[^\w\s]/g, "") // Remove punctuation
                .split(/\s+/)           // Split into words
                .filter(word => !stopWords.has(word) && word.length > 2) // Filter stop words
                .forEach(word => {
                    wordCounts[word] = (wordCounts[word] || 0) + 1;
                });
        });

        // Convert to array of objects and limit to top 100 words
        vis.displayData = Object.entries(wordCounts)
            .map(([text, size]) => ({ text, size }))
            .sort((a, b) => b.size - a.size)
            .slice(0, 100);

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        console.log("d3.layout.cloud:", d3.layout.cloud);

        // Calculate most frequent word and normalize
        const maxSize = d3.max(vis.displayData, d => d.size);

        const layout = d3.layout.cloud()
            .size([vis.width, vis.height])
            .words(vis.displayData)
            .padding(5)
            .rotate(() => ~~(Math.random() * 2) * 90)
            .fontSize(d => (d.size / maxSize) * 100)
            .on("end", draw);

        layout.start();

        // Draw  word cloud
        function draw(words) {
            vis.wordGroup.selectAll("text").remove();
            vis.wordGroup.selectAll("text")
                .data(words)
                .enter()
                .append("text")
                .attr("text-anchor", "middle")
                .style("font-size", d => `${d.size}px`)
                .style("fill", () => `hsl(${Math.random() * 360}, 70%, 50%)`)
                .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
                .text(d => d.text);
        }
    }
}