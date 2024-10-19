const fs = require('fs');

function lagrangeInterpolation(points, k) {
	let ans = 0;
	for (let i = 0; i < k; i++) {
		let xi = points[i][0];
		let yi = points[i][1];

		let li = 1;
		for (let j = 0; j < k; j++) {
			if (i !== j) {
				let xj = points[j][0];
				li *= (0 - xj) / (xi - xj);
			}
		}

		ans += li * yi;
	}

	return ans;
}

function main(filename) {
	const file = fs.readFileSync(filename);
	const data = JSON.parse(file);

	const n = data.keys.n;
	const k = data.keys.k;

	const points = [];
	for (let i = 1; i <= n; i++) {
		if (data[i]) {
			const base = parseInt(data[i].base);
			const value = data[i].value;
			const decodedY = parseInt(value, base);
			points.push([i, decodedY]);
		}
	}

	const constantTerm = lagrangeInterpolation(points, k);

	console.log(`secret (c) ${constantTerm}`);
}

main('./example1.json');
main('./example2.json');
