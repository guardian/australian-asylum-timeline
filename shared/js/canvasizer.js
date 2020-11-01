import * as d3 from 'd3'

class Canvasizer {

    constructor(dims) {

        this.width = dims[0]

        this.height = dims[1]

        this.panel = this.height / 3

        this.unit = this.panel / 2

        this.xCenter = [this.unit, this.unit + this.panel, this.unit + (this.panel * 2)]

        this.canvas = document.getElementById('canvas-viz');

        this.canvas.width = this.width

        this.canvas.height = this.height

        this.context = this.canvas.getContext('2d');

        this.manus = 0

        this.setup()

    }

    setup() {

        var self = this

        this.nodes = []

        this.simulation = d3.forceSimulation(self.nodes)
          .force('charge', d3.forceManyBody().strength(5))
          .force('x', d3.forceX().x((d) => self.xCenter[d.category]))
          .force('y', d3.forceY().y((d) => self.unit))
          .force('collision', d3.forceCollide().radius((d) => d.radius))
          .on('tick', ticked);

        function ticked(){

            self.context.save();

            self.context.clearRect(0, 0, self.width, self.height);

            self.nodes.forEach(function(d, i) {

                self.context.beginPath();
                self.context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI, true);
                self.context.fillStyle = 'lightblue'
                self.context.fill();
            });

            self.context.restore();

        }
    }

    update(d) {

        var self = this

        if (d.manus_rpc!="" && !isNaN(d.manus_rpc)) {

            var num = +d.manus_rpc

            if (this.manus != num) {

                var old = this.manus

                if (old > num) {

                    // Delete some nodes

                    var diff = old - num

                    this.manus = num

                    this.remove(diff)

                } else {

                    var diff = num - this.manus

                    this.manus = num

                    this.add(diff)

                }
            }
        }
    }

    remove(num) {

        var self = this

        this.nodes = this.nodes.filter( (item, index) => {
            return index < self.nodes.length - num
        });

        console.log(`Remove ${num} nodes, total: ${this.nodes.length}`)

        this.simulation.nodes(self.nodes)

        this.simulation.alpha(0.3).restart();


    }

    add(num) {

        var self = this

        var nodes = d3.range(num).map(function(d, i) {
          return {
            radius: 2.5,
            category: 0 // Will calculate which cluster x, y coordinates we are rendering to
          }
        });

        this.nodes = this.nodes.concat(nodes);

        console.log(`Add ${num} nodes, total: ${this.nodes.length}`)

        this.simulation.nodes(self.nodes)

        this.simulation.alpha(0.3).restart();
    }
}

export default Canvasizer