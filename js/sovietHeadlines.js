// This will be a visualization to generate headlines about the Soviet
// Union in 1991 and the years after. 

class SovietHeadlines {
    constructor(parentElement, data) {
		this.parentElement = parentElement;
		this.data = data;
		this.initVis();
    }

    initVis() {
        let vis = this;
    
        vis.margin = { top: 20, right: 35, bottom: 50, left: 0 };
        vis.width = document.getElementById(vis.parentElement).clientWidth - vis.margin.left - vis.margin.right;
        vis.height = 350 - vis.margin.top - vis.margin.bottom;
    
        vis.svg = d3.select(`#${vis.parentElement}`)            
            .append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", `translate(${vis.margin.left}, ${vis.margin.top})`);
    
        vis.points = [
            {year: 1991, x: 0},
            {year: 1992, x: vis.width / 4},
            {year: 1993, x: (2 * vis.width) / 4},
            {year: 1994, x: (3 * vis.width) / 4}
        ];

        const colorScale = d3.scaleLinear()
            .domain([1991, 1994])
            .range(['green', 'steelblue']);
    
        vis.svg.selectAll("rect")
            .data(vis.points)
            .join("rect")
            .attr("x", d => d.x)
            .attr("y", d => 0)
            .attr('width', vis.width / 5)
            .attr('height', vis.height)
            .attr("fill", d => colorScale(d.year));
        
        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;
        vis.displayData = [];

        // Find random data to wrangle and eventually render
        for (let year = 1991; year < 1995; year++) {
            const yearData = vis.data.filter(row => row.year == year);
            const randYearHeadline = yearData[Math.floor(Math.random() * yearData.length)];
            vis.displayData.push(randYearHeadline);
        }

        vis.updateVis()
    }
    
    updateVis() {
        let vis = this;

        let text = vis.svg.selectAll("text")
            .data(vis.displayData);
    
        text.enter()
            .append("text")
            .attr("class", "label")
            .merge(text)
            .attr("x", d => {
                const textPoint = vis.points.filter(data => data.year == d.year);
                return (textPoint[0].x + 200);
            })
            .attr("y", vis.height / 2)
            .attr("text-anchor", "middle")
            .attr("fill", "lightgray")
            .style("font-size", "18px")
            .text(d => {
                const textPoint = vis.points.filter(data => data.year == d.year);
                const year = textPoint[0].year
                return (year + ":  " + d.headline); 
            });
    
        text.exit().remove();
    }
       
}