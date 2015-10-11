var Hapi = require('hapi');
var AuthBasic = require('hapi-auth-basic');
var server =  new Hapi.Server();

var user = {
    name: 'hapi',
    password: 'auth'
}

var validate = function (request, username, password, callback) {
    isValid = false;
    if (user.name == username && user.password == password) {
        isValid = true;
    }

    callback(null, isValid, { username: username });
}

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(AuthBasic, function (err) {
    server.auth.strategy('simple', 'basic', {
        validateFunc: validate
    });

    server.route({
    method: 'GET',
    path: '/',
    config: {
        auth: 'simple',
        handler: function  (request, reply) {
            reply("Hello!");
        }
    }
})
});

server.start(function () {
    console.log('Server listening at: ' + server.info.uri);
})