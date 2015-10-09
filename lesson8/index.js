var Hapi = require('hapi');
var Path = require('path');
var Fs = require('fs');
var Rot13 = require("rot13-transform");

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        var file = Fs.createReadStream(Path.join(__dirname, 'file.txt'));
        var encode = file.pipe(Rot13());
        reply(encode);
    }
})

server.start(function () {
    console.log('Server listening at: ' + server.info.uri);
})