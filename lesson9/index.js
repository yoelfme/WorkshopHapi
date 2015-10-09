var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    path: '/chickens/{breed}',
    method: 'GET',
    handler: function (request, reply) {
        reply("You had send the value: " + request.params.breed);
    },
    config: {
        validate: {
            params: {
                breed: Joi.string().required()
            }
        }
    }
});

server.start(function () {
    console.log('Server listening at: ' + server.info.uri);
});