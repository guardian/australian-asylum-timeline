const timer = ms => new Promise(res => setTimeout(res, ms)) 

async function load () {

	for (var i = 0; i < num; i++) {
	            
		let node = self.randomizer(index);

		self.nodes.push(node);

		self.simulation.nodes(self.nodes)

		await timer(i * 25); // then the created Promise can be awaited
	}

}

load();

var tasks = [...Array(num).keys()] // Nice way to create array with a specified number of nodes
