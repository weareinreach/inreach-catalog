require('dotenv').config();
const express = require('express');
const path = require('path');
const server = express();
const port = process.env.PORT || 8080;
const pathToBuildDir = path.resolve(__dirname, '../build');

server.use((req, res, next) => {
	if (
		process.env.NODE_ENV == 'production' &&
		req.header('x-forwarded-proto') !== 'https'
	) {
		res.redirect(`https://${req.header('host')}${req.url}`);
	} else {
		next();
	}
});
server.use(express.static(pathToBuildDir));

server.get('*', (req, res) => {
	const indexPath = path.join(pathToBuildDir, 'index.html');

	res.sendFile(indexPath);
});

server.listen(port, () =>
	console.log(`Listening on port: http://localhost:${port}`)
);
