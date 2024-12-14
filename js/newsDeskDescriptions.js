class NewsDeskDescriptions {
    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;

        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.currNewsDesk = document.getElementById('news-desk-selector').value;
        vis.currDescription = vis.data.find(d => d.news_desk === vis.currNewsDesk).description;

        vis.svg = d3.select("#news-desk-description")
        vis.svg.append()
            .text(vis.currDescription)
            .attr("x", 20)
            .attr("y", 20)
            .attr("class", "news-desk-description-text");
    }

    wrangleData() {
        let vis = this;

        // Remove what was there before
        vis.svg.select(".news-desk-description-text").remove();

        vis.currNewsDesk = document.getElementById('news-desk-selector').value;
        vis.currDescription = vis.data.find(d => d.news_desk === vis.currNewsDesk).description;
        vis.updateVis();
    }

    updateVis() {
        let vis = this;
        vis.svg.append()
            .text(vis.currDescription)
            .attr("x", 20)
            .attr("y", 20)
            .attr("class", "news-desk-description-text");
    }
}
