var Hapi = require('hapi');
var Boom = require('boom');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.state('session', {
    path: '/',
    encoding: 'base64json',
    ttl: 10,
    domain: 'localhost'
});

server.route({
    method: 'GET',
    path: '/set-cookie',
    handler: function(request, reply) {
        reply('success').state('session', { key: 'makemehapi' })
    },
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
});

server.route({
    method: 'GET',
    path: '/check-cookie',
    handler: function (request, reply) {
        var session = request.state.session;
        var response = null;

        if (session) {
            response = {
                user: 'hapi'
            };
        } else {
            response = Boom.unauthorized('Missing authentication');
        }

        reply(response);
    }
})

server.start(function () {
    console.log('Server listening at: ' + server.info.uri);
});