'use strict';

require('babel-register');

const AppPaths = require('./config/app-paths');
const Hapi = require('hapi');
const HapiReactViews = require('hapi-react-views');
const Inert = require('inert');
const Secrets = require('./secrets');
const Vision = require('vision');


const server = new Hapi.Server();
server.connection({
    host: Secrets.host,
    port: Secrets.port
});

// Register plugins
const plugins = [
    {register: Inert}, // enables serving static files (file and directory handlers)
    {register: Vision} // enables rendering views with custom engines (view handler)
];

server.register(plugins, registerErr => {
    if (registerErr) {
        console.error(registerErr);
        return;
    }

    // Set up server side react views using Vision
    server.views({
        engines: {jsx: HapiReactViews},
        path: AppPaths.serverViews
    });


    // Add the route
    server.route({
        method: 'GET',
        path:'/hello',
        handler: (request, reply) => {
            reply('hello world');
        }
    });

    // Serves assets and webpack bundles using Inert
    server.route({
        method: 'GET',
        path: AppPaths.public.assets + '{path*}',
        handler: {
            directory: {
                path: AppPaths.webRoot,
                index: false, // disables index.html file lookup
                showHidden: false // hidden files won't be shown and served
            }
        }
    });

    // Catch-all
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: (request, reply) => {
            reply(`Page ${encodeURIComponent(request.params.path)} not found`);
        }
    });

    // App
    server.route({
        method: 'GET',
        path: '/',
        handler: {
            view: 'app-view' // app-view.jsx in /server-views
        }
    });


    // Start the server
    server.start(startErr => {
        if (startErr) {
            console.error(startErr);
            return;
        }
        console.log('Server running at:', server.info.uri);
    });
});