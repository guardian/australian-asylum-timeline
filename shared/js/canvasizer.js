import * as d3 from 'd3'

class Canvasizer {

    constructor(dims, settings) {

        this.width = dims[0]

        this.height = dims[1]

        this.settings = settings

        this.panel = this.height / 3

        this.horizantal = this.width / 3

        this.unit = this.panel / 2

        this.third = this.unit / 3

        this.horizantal_unit = this.horizantal / 2

        this.xCenter = [    this.horizantal_unit, 
                            this.horizantal_unit + ( this.third * 3 ),
                            this.horizantal_unit + (this.horizantal * 2) - ( this.third * 4 ), 
                            this.horizantal_unit + (this.horizantal * 2) - ( this.third ), 
                            this.horizantal_unit, 
                            this.horizantal_unit, 
                            this.horizantal_unit + this.horizantal, 
                            this.horizantal_unit + (this.horizantal * 2)]

        this.yCenter = [    this.unit, 
                            this.unit, 
                            this.unit, 
                            this.unit, 
                            this.height / 2,  
                            this.unit + (this.panel * 2), 
                            this.unit + (this.panel * 2), 
                            this.unit + (this.panel * 2)]


        this.xLabel =   [   0, 
                            this.width / 2 / 2,
                            this.width / 2, 
                            this.horizantal_unit * 5, 
                            0, 
                            0, 
                            this.horizantal_unit * 2, 
                            this.horizantal_unit * 4]

        this.yLabel = [     this.panel - 20, 
                            this.panel - 20, 
                            this.panel - 20, 
                            this.panel - 20, 
                            this.panel * 2,  
                            this.panel * 3 - 20, 
                            this.panel * 3 - 20, 
                            this.panel * 3 - 20]



        this.labels = [{
            "label" : "Nauru",
            "x" : 0,
            "y" : 20
        },{
            "label" : "Manus",
            "x" : this.width / 2,
            "y" : 20
        },{
            "label" : "Dead",
            "x" : 0,
            "y" : this.panel + 30
        },{
            "label" : "Australia",
            "x" : 0,
            "y" : this.panel * 2 + 40
        },{
            "label" : "Resettled",
            "x" : this.horizantal_unit * 2,
            "y" : this.panel * 2 + 40
        },{
            "label" : "Returned",
            "x" : this.horizantal_unit * 4,
            "y" : this.panel * 2 + 40
        }]

        this.canvas = document.getElementById('canvas-viz');

        this.canvas.width = this.width

        this.canvas.height = this.height

        this.context = this.canvas.getContext('2d');

        this.svg = d3.select('#text-overlay')

        this.svg
            .style("width", this.width + 'px')
            .style("height", this.height + 'px');

        this.setup()

    }

    setup() {

        var self = this

        for (const label of this.labels) {

            this.svg.append("text")
                .attr("x", label.x)
                .attr("y", label.y)
                .text(label.label)
                .attr("font-family", "Guardian Headline Full")
                .attr("font-size", "20px")
                .attr("font-weight", "600")
                .attr("fill", "black");

        }

        this.nodes = []

        this.simulation = d3.forceSimulation(self.nodes)
          .force('charge', d3.forceManyBody().strength(-4))
          .force('x', d3.forceX().x((d) => self.xCenter[d.category]).strength(0.8))
          .force('y', d3.forceY().y((d) => self.yCenter[d.category]).strength(1))
          .force('collision', d3.forceCollide().radius((d) => d.radius).iterations(16))
          .alphaDecay(0.001)
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
            //self.context.textAlign = "center";

            for (var i = 0; i < self.settings.length; i++) {

                if (self.settings[i].value > 0) {

                    self.context.fillText(`${self.settings[i].value} ${self.settings[i].location}`, self.xLabel[self.settings[i].index], self.yLabel[self.settings[i].index]);

                }

            }

            self.context.restore();

        }
    }

    update(d) {

        for (const cluster of this.settings) {

            this.render(+d[cluster.key], cluster.index, cluster.location)

        }
    }

    render(value, index, location) {

        console.log(`${location}: ${value}`)

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

        for (var i = 0; i < num; i++) {
            
            let node = self.randomizer(index);

            self.nodes.push(node);

            self.simulation.nodes(self.nodes)

        }

        this.simulation.alpha(0.3).restart();

        // console.log(`Add ${num} nodes, total: ${this.nodes.length}`)
        
    }

    randomizer(index) {

        var self = this

        var outerRadius = 1500;
        var innerRadius = 100;
        var angle = Math.random() * Math.PI * 2;
        var strength = Math.random() * (-0.1 - -0.3) + -0.3;
        var distance = Math.random() * (outerRadius - innerRadius) + innerRadius;
        var x = Math.cos(angle) * distance + this.xCenter[index];
        var y = Math.sin(angle) * distance + this.yCenter[index];
    
        return { 
            radius: 1.5,
            category: index,
            x: x,
            y: y,
            strength: strength
        }

    }

}

export default Canvasizer