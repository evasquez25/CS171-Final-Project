class LineGraph {
	constructor(parentElement, data) {
		this.parentElement = parentElement;
		this.data = data;
        this.freqData = []; 

		this.initVis();
	}

    initVis() {
        let vis = this;
        vis.margin = { top: 20, right: 35, bottom: 50, left: 0 };
        vis.width = document.getElementById(vis.parentElement).clientWidth - vis.margin.left - vis.margin.right;
        vis.height = 400 - vis.margin.top - vis.margin.bottom;
        vis.svg = d3.select("#line-graph")
            .append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", `translate(${vis.margin.left}, ${vis.margin.top})`);

        vis.wrangleData();
    }

    wrangleData() {
        let vis = this;
    
        vis.freqData = [];
        const newsDesk = document.getElementById('news-desk-selector').value;

        const categoryData = vis.data.filter(d => 
            d.news_desk_category && 
            d.news_desk_category.includes(newsDesk)
        );

        for (let i = 1991; i <= 2021; i++) {
            const count = categoryData.filter(d => +d.year === i).length;
            vis.freqData.push({ year: i, count: count });
        }

        const minX = d3.min(vis.freqData, d => d.year);
        const maxX = d3.max(vis.freqData, d => d.year);
        vis.xScale = d3.scaleLinear()
            .domain([minX, maxX])
            .range([0, vis.width]);

        const minY = d3.min(vis.freqData, d => d.count);
        const maxY = d3.max(vis.freqData, d => d.count);
        vis.yScale = d3.scaleLinear()
            .domain([0, maxY])
            .range([vis.height, 0]);
    
        vis.updateVis();
    }

    updateVis() {
        let vis = this;
    
        // Get rid of previous axes and line graphs
        vis.svg.selectAll(".x-axis").remove();
        vis.svg.selectAll(".y-axis").remove();
        vis.svg.selectAll(".line").remove();

        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale);

        vis.svg.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${vis.height})`)
            .call(vis.xAxis);
        vis.svg.append("text")
            .attr("class", "x-axis-label")
            .attr("x", vis.width / 2)
            .attr("y", vis.height + vis.margin.bottom)
            .attr("text-anchor", "middle")
            .text("Year");
    
        vis.svg.append("g")
            .attr("class", "axis y-axis")
            .call(vis.yAxis);
        vis.svg.append("text")
            .attr("class", "y-axis-label")
            .attr("x", -vis.height / 2)
            .attr("y", -vis.margin.left + 10)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Articles Published");

        const line = d3.line()
            .x(d => vis.xScale(d.year))
            .y(d => vis.yScale(d.count))
            .curve(d3.curveMonotoneX);
    
        vis.svg.append("path")
            .datum(vis.freqData)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2);
    }   
}