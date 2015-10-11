var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    method: 'POST',
    path: '/upload',
    handler: function (request, reply) {
        var body = '';
        request.payload.file.on('data', function (data){
          body += data
        });

        request.payload.file.on('end', function (){
            var response = {
                description: request.payload.description,
                file: {
                    data: body,
                    filename: request.payload.file.hapi.filename,
                    headers: request.payload.file.hapi.headers
                }
            };

            reply(JSON.stringify(response));
        });
    },
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
})

server.start(function () {
    console.log('Server listening at: ' + server.info.uri);
});