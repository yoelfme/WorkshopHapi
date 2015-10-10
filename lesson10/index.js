var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    method: 'POST',
    path: '/login',
    handler: function (request, reply) {
        reply("login successful");
    },
    config: {
        validate: {
            payload: Joi.object({
                isGuest: Joi.boolean(),
                username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
                accessToken: Joi.string().alphanum(),
                password: Joi.string().alphanum()
            }).options({ allowUnknown: true })
            .without('password', 'accessToken')
        }
    }
})

server.start(function () {
    console.log('Server listening at: ' + server.info.uri);
});