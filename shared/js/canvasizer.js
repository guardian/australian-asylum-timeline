import * as d3 from 'd3'

class Canvasizer {

    constructor(units, settings) {

        this.width = units.width

        this.height = units.height

        this.isMobile = units.isMobile

        this.settings = settings

        this.xCenter = units.xCenter

        this.yCenter = units.yCenter

        this.xLabel = units.xLabel

        this.yLabel = units.yLabel

        this.labels = units.labels

        this.unit = units.unit

        this.canvas = document.getElementById('canvas-viz');

        this.canvas.width = this.width

        this.canvas.height = this.height

        this.context = this.canvas.getContext('2d');

        this.svg = d3.select('#text-overlay')

        this.svg
            .style("width", this.width + 'px')
            .style("height", this.height + 'px');

        this.current = null

        this.simulation = null

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
                .attr("fill", "black")
                .attr("text-anchor", "middle") //label.orientation

        }

        for (var i = 0; i < this.xLabel.length; i++) {

            this.settings[i].x = this.xCenter[i]

            this.settings[i].y = this.yCenter[i]

        }

        this.scale = d3.scaleSqrt().domain([ 0, 1500 ]) .range([2, 35 ]); 

        if (this.isMobile) {

            this.svg.append('g')
                    .selectAll('circle')
                    .data(self.settings)
                    .enter().append('circle')
                    .attr('r',function (d) { return  self.scale(d.value) }) //
                    .attr('fill', function (d) { return d.colour; })
                    .attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; })
                    .attr("display", function (d) { return (d.value>0) ? "block" : "none" })

        }

        this.svg.append('g')
                .selectAll('text')
                .data(self.settings)
                .enter()
                .append('text')
                .attr('class', "circle-values")
                .text(d => `${d.value}`)
                .attr('font-size', 12)
                .attr('dx', function (d) { return d.x; })
                .attr('dy',function (d) { return (self.isMobile) ? d.y + 50 : d.y + ( self.unit - 20) })
                .attr("font-family", "Guardian Text Sans Web,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "black")
                .attr("text-anchor", 'middle')
                .attr("display", function (d) { return (d.value>0) ? "block" : "none" })
        
        this.atomized()


    }

    updateSVG(value, index) {

        var self = this

        if (this.isMobile) {

            this.settings[index].mv = value

            var u = d3.selectAll('circle').data(self.settings);

            u.enter()
                .append('circle')
                .merge(u)
              .transition()
                .duration(100)
                .attr('r',function (d) { return  self.scale(d.mv) })
                .attr("display", function (d) { return (d.mv>0) ? "block" : "none" })

            u.exit()
                .transition()
                .duration(100)
                .attr('r', 0)
              .style('opacity', 0)
                .each('end', function() {
                    d3.select(this).remove();
                });

        }

        var t = d3.selectAll('.circle-values').data(self.settings)
                    .text((d,i) => (self.isMobile) ? `${self.settings[i].mobi}${d.value}` : `${self.settings[i].value} ${self.settings[i].location}`)
                    .attr("display", function (d) { return (d.value>0) ? "block" : "none" })
                    .append("tspan")
                    .text((d,i) => {
                        return (self.settings[i].secondary && !self.isMobile) ? `${self.current[self.settings[i].sid]}` : ''
                    })
                    .attr("x", 0)
                    .attr("dx", function (d) { return d.x; })
                    .attr("dy", 16);
    }

    atomized() {

        var self = this

        this.settings = this.settings.sort( (a, b) => a.index - b.index);

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
                self.context.fillStyle = d.colour
                self.context.fill();

            });

            self.context.restore();

        }

    }

    update(d) {

        this.current  = d

        for (const cluster of this.settings) {

            this.updateSVG(+d[cluster.key], cluster.index)

            this.render(+d[cluster.key], cluster.index, cluster.location)

        }
    }

    render(value, index, location) {

        //console.log(`${location}: ${value}`)

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

        var outerRadius = 100;
        var innerRadius = 20;
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
            strength: strength,
            colour: this.settings[index].colour
        }

    }

    resize(units, settings) {

        console.log("Redaw")

        var self = this

        if (this.simulation!=null) {

            this.simulation.stop()

        }

        this.svg.selectAll("*").remove();

        this.width = units.width

        this.height = units.height

        this.isMobile = units.isMobile

        for (const settings of this.settings) {

            settings.value = 0

        }

        this.xCenter = units.xCenter

        this.yCenter = units.yCenter

        this.xLabel = units.xLabel

        this.yLabel = units.yLabel

        this.labels = units.labels

        this.unit = units.unit

        this.canvas.width = this.width

        this.canvas.height = this.height

        this.svg
            .style("width", this.width + 'px')
            .style("height", this.height + 'px');

        this.simulation = null

        this.setup()

        this.update(this.current)

    }

}

export default Canvasizer