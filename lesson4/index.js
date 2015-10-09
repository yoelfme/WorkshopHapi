var Hapi = require('Hapi');
var Inert = require('inert');
var path = require('path');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Inert, function(err) {
    if (err) throw err;
});

server.route({
    method: 'GET',
    path: '/foo/bar/baz/{param}',
    handler: {
        directory: { path: path.join(__dirname, 'public') },
    }
});

server.start(function() {
    console.log('Server running at: ' + server.info.uri);
});