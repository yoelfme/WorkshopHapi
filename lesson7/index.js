var Hapi = require('hapi');
var Path = require('path');
var Vision = require('vision');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Vision, function(err) {
    if (err) throw err;
});

server.views({
    engines: {
        html: require('handlebars')
    },
    helpersPath: Path.join(__dirname, 'helpers'),
    path: Path.join(__dirname, 'templates')
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: "index.html"
    }
})

server.start(function () {
    console.log('Server listening at: ' + server.info.uri);
});