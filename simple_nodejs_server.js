const counter_fn = 'counter.txt';

const http = require('http');
const fs = require('fs');
const winston = require('winston');
const access_logger = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({
			name: 'access-log',
			filename: './logs/access.log',
			level: 'info',
			json: false,
		}),
	]
});
const error_logger = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({
			name: 'error-log',
			filename: './logs/error.log',
			level: 'error',
			json: false,
		}),
	]
});

http.createServer(function (req, res) {
	if (require('url').parse(req.url).pathname == '/')
	{
		var cnt = 0;
		if (fs.existsSync(counter_fn))
			cnt = parseInt(fs.readFileSync(counter_fn));
		cnt += 1;
		fs.writeFileSync(counter_fn, cnt);
		res.write('<p>Hello World!');
		res.write('<p>This is a visit number '+cnt+'.');
		access_logger.info('%s - Requested: %s - Counter value: %d', req.socket.localAddress, req.url, cnt);
		res.end();
	}
	else
	{
		res.statusCode = 404;
		res.write('Not found');
		error_logger.error('%s - Requested: %s - 404 Not found', req.socket.localAddress, req.url);
		res.end();
	}
}).listen(process.env.BINDPORT,process.env.BINDADDR);
console.log('Server running at '+process.env.BINDADDR+':'+process.env.BINDPORT);
