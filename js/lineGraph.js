class LineGraph {
	constructor(parentElement, data) {
		this.parentElement = parentElement;
		this.data = data;

		this.initVis();
	}

    initVis() {
        let vis = this;

        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;

        vis.updateVis()
    }

    updateVis() {
        let vis = this;
    }
}