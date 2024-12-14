// This will be a visualization to generate headlines about the Soviet
// Union in 1991 and the years after. 

class HeadlinesDisplay {
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

        if (vis.parentElement === "soviet-headlines") {
            vis.points = [
                {year: 1991, x: 0},
                {year: 1992, x: vis.width / 4},
                {year: 1993, x: (2 * vis.width) / 4},
                {year: 1994, x: (3 * vis.width) / 4}
            ];
        } else if (vis.parentElement === "financial-crisis-headlines") {
            vis.points = [
                {year: 2007, x: 0},
                {year: 2008, x: vis.width / 4},
                {year: 2009, x: (2 * vis.width) / 4},
                {year: 2010, x: (3 * vis.width) / 4}
            ];
        }

        const sovietColorScale = d3.scaleLinear()
            .domain([1991, 1995])
            .range(['green', 'steelblue']);

        const financeColorScale = d3.scaleLinear()
            .domain([2007, 2010])
            .range(['green', 'steelblue']);
    
        vis.svg.selectAll("rect")
            .data(vis.points)
            .join("rect")
            .attr("x", d => d.x)
            .attr("y", d => 0)
            .attr('width', vis.width / 5)
            .attr('height', vis.height)
            .attr("fill", d => {
                if (vis.parentElement === "soviet-headlines") {
                    return sovietColorScale(d.year);
                } else if (vis.parentElement === "financial-crisis-headlines") {
                    return financeColorScale(d.year);
                }
            });

        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;
        vis.displayData = [];

        if (vis.parentElement === "soviet-headlines") {
            // Find random data to wrangle and eventually render
            for (let year = 1991; year < 1995; year++) {
                const yearData = vis.data.filter(row => row.year == year);
                const randYearHeadline = yearData[Math.floor(Math.random() * yearData.length)];
                vis.displayData.push(randYearHeadline);
            }
        } else if (vis.parentElement === "financial-crisis-headlines") {
            for (let year = 2007; year < 2011; year++) {
                const yearData = vis.data.filter(row => row.year == year);
                const randYearHeadline = yearData[Math.floor(Math.random() * yearData.length)];
                vis.displayData.push(randYearHeadline);
        }
        }

        vis.updateVis()
    }

    updateVis() {
        let vis = this;
    
        let textGroups = vis.svg.selectAll(".text-group")
            .data(vis.displayData);
    
        textGroups.enter()
            .append("g")
            .attr("class", "text-group")
            .merge(textGroups)
            .attr("transform", d => {
                const textPoint = vis.points.filter(data => data.year == d.year);
                return `translate(${textPoint[0].x + vis.width / 10}, ${vis.height / 2})`;
            })
            .each(function(d) {
                const group = d3.select(this);
    
                group.selectAll("text").remove();
    
                const boxWidth = vis.width / 5 - 20; 
                const words = (d.year + ": " + d.headline).split(" ");
                const lineHeight = 20; 
                let line = [];
                let y = -10;
                let tspan = group.append("text")
                    .attr("fill", "white")
                    .attr("text-anchor", "middle")
                    .attr("dy", y)
                    .style("font-size", "18px");
    
                words.forEach(word => {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > boxWidth) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        y += lineHeight;
                        tspan = group.append("text")
                            .attr("fill", "white")
                            .attr("text-anchor", "middle")
                            .attr("dy", y)
                            .style("font-size", "18px")
                            .text(word);
                    }
                });
            });
    
        textGroups.exit().remove();
    }
    
}