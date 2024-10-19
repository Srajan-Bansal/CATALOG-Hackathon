const fs = require('fs');

function lagrangeInterpolation(points) {
	let constant = 0;

	for (let i = 0; i < points.length; i++) {
		let [xi, yi] = points[i];
		let term = yi;

		for (let j = 0; j < points.length; j++) {
			if (i !== j) {
				let [xj] = points[j];
				term *= xj / (xj - xi);
			}
		}

		constant += term;
	}

	return Math.round(constant);
}

function main(filename) {
	const data = fs.readFileSync(filename);
	const input = JSON.parse(data);

	const { n, k } = input.keys;
	let points = [];

	Object.keys(input).forEach((key) => {
		if (!isNaN(key)) {
			const base = parseInt(input[key].base, 10);
			const value = input[key].value;
			const x = parseInt(key, 10);
			const y = parseInt(value, base);

			points.push([x, y]);
		}
	});
	const requiredPoints = points.slice(0, k);

	const constantTerm = lagrangeInterpolation(requiredPoints);

	console.log(`secret (c) ${constantTerm}`);
}

// Run the solver with the JSON test case
main('example1.json');
main('example2.json');
