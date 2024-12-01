
class Heatmap {
    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];
        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.margin = { top: 40, right: 100, bottom: 40, left: 60 };
        vis.width = document.getElementById(vis.parentElement).clientWidth - vis.margin.left - vis.margin.right;
        vis.height = 500 - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select(`#${vis.parentElement}`)
            .append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", `translate(${vis.margin.left},${vis.margin.top})`);

        vis.x = d3.scaleLinear()
            .range([0, vis.width]);
        vis.y = d3.scaleBand()
            .range([0, vis.height]);
        vis.color = d3.scaleSequential(d3.interpolateBlues);

        vis.xAxis = d3.axisBottom(vis.x)
            .ticks(10);
        vis.yAxis = d3.axisLeft(vis.y);

        vis.xAxisGroup = vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", `translate(0,${vis.height})`);
        vis.svg.append("text")
            .attr("class", "x-axis-label")
            .attr("x", vis.width / 2)
            .attr("y", vis.height + vis.margin.bottom)
            .attr("text-anchor", "middle")
            .text("Word Count");

        vis.yAxisGroup = vis.svg.append("g")
            .attr("class", "y-axis axis");
        vis.svg.append("text")
            .attr("class", "y-axis-label")
            .attr("x", -vis.height / 2)
            .attr("y", -vis.margin.left + 10)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Publication Year");

        vis.wrangleData();
    }

    wrangleData() {
        let vis = this;

        // Filter data by news desk
        const newsDesk = document.getElementById('news-desk-selector').value;

        const categoryData = vis.data.filter(d =>
            d.news_desk_category &&
            d.news_desk_category.includes(newsDesk)
        );

        // Aggregate data by year
        const yearWordCounts = d3.rollups(
            categoryData,
            group => d3.mean(group, d => d.word_count),
            d => d.year
        );

        // Convert to array and sort by year
        vis.displayData = Array.from(yearWordCounts, ([year, wordCount]) => ({ year: +year, wordCount}))
            .sort((a, b) => a.year - b.year);

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // Update scales
        vis.x.domain([d3.min(vis.displayData, d => d.wordCount), d3.max(vis.displayData, d => d.wordCount)]);
        vis.y.domain(vis.displayData.map(d => d.year));
        vis.color.domain(vis.x.domain());

        // Bind data
        const bars = vis.svg.selectAll(".bar")
            .data(vis.displayData);

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .merge(bars)
            .attr("x", 0)
            .attr("y", d => vis.y(d.year))
            .attr("width", d => vis.x(d.wordCount))
            .attr("height", vis.y.bandwidth())
            .attr("fill", d => vis.color(d.wordCount));

        bars.exit().remove();

        // Update axes
        vis.xAxisGroup.call(vis.xAxis);
        vis.yAxisGroup.call(vis.yAxis);
    }
}