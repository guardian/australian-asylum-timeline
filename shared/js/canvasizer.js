import * as d3 from 'd3'

class Canvasizer {

    constructor(dims, settings) {

        this.width = dims[0]

        this.height = dims[1]

        this.settings = settings

        this.panel = this.height / 3

        this.unit = this.panel / 2

        this.xCenter = [ this.unit, this.unit + this.panel, this.unit + (this.panel * 2), this.unit, this.unit + this.panel, this.unit, this.unit + this.panel, this.unit + (this.panel * 2)]

        this.yCenter = [ this.unit, this.unit, this.unit, this.unit + this.panel, this.unit + this.panel, this.unit + (this.panel * 2), this.unit + (this.panel * 2), this.unit + (this.panel * 2)]

        this.canvas = document.getElementById('canvas-viz');

        this.canvas.width = this.width

        this.canvas.height = this.height

        this.context = this.canvas.getContext('2d');

        this.setup()

    }

    setup() {

        var self = this

        this.nodes = []

        this.simulation = d3.forceSimulation(self.nodes)
          .force('charge', d3.forceManyBody().strength(1))
          .force('x', d3.forceX().x((d) => self.xCenter[d.category]).strength(0.5))
          .force('y', d3.forceY().y((d) => self.yCenter[d.category]).strength(0.5))
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

            self.context.font = "12px Arial";
            self.context.fillStyle = 'black'
            self.context.textAlign = "center";

            for (var i = 0; i < self.settings.length; i++) {

                if (self.settings[i].value > 0) {

                    self.context.fillText(`${self.settings[i].location} - ${self.settings[i].value}`, self.xCenter[self.settings[i].index], self.yCenter[self.settings[i].index] + self.unit);

                }

            }

            self.context.restore();

        }
    }

    update(d) {

        for (const cluster of this.settings) {

            if (d[cluster.key]!="" && !isNaN(d[cluster.key])) {

                this.render(+d[cluster.key], cluster.index)

            }
        }
    }

    render(value, index) {

        var self = this

        if (this.settings[index].value != value) {

            var old = this.settings[index].value

            if (old > value) {

                var diff = old - value

                this.settings[index].value = value

                this.remove(diff, index)

            } else {

                var diff = value - this.settings[index].value

                this.settings[index].value = value

                this.add(diff, index)

            }
        }
    }

    remove(num, index) {

        var self = this

        var cluster = this.nodes.filter( item => item.category === index )

        cluster = cluster.filter( (item, i) => i < cluster.length - num )

        var others = this.nodes.filter( item => item.category != index )

        this.nodes = [ ...cluster, ...others ]

        // console.log(`Remove ${num} nodes, total: ${this.nodes.length}`)

        this.simulation.nodes(self.nodes)

        this.simulation.alpha(0.3).restart();

    }

    add(num, index) {

        var self = this

        var nodes = d3.range(num).map(function(d, i) {
          return {
            radius: 2.5,
            category: index
          }
        });

        this.nodes = this.nodes.concat(nodes);

        // console.log(`Add ${num} nodes, total: ${this.nodes.length}`)

        this.simulation.nodes(self.nodes)

        this.simulation.alpha(0.3).restart();
    }
}

export default Canvasizer