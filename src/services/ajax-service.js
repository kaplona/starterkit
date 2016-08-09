'use strict';

const Promise = require('es6-promise').Promise;

const CONNECTION_ERROR = 'connection error occurred';
const TIMEOUT = 10000;


var AjaxService = {

    /**
     * Sends Ajax requests to the server,
     *
     * @private
     *
     * @param {object} options
     *   @param {string} options.url
     *   @param {string} options.method - get or post
     *   @param {object} [options.data] - for post requests
     *
     * @returns {Promise} - resolved with server respond or rejected with  server error
     */
    send: function(options) {

        return new Promise((resolve, reject) => {

            var ajaxRequest = new XMLHttpRequest();
            ajaxRequest.timeout = TIMEOUT;

            // If we got response from the server
            ajaxRequest.addEventListener('load', () => {
                if (ajaxRequest.status >= 400 && ajaxRequest.status < 600) {
                    reject(CONNECTION_ERROR);
                    return;
                }

                var serverResponse = JSON.parse(ajaxRequest.responseText);

                if (process.env.NODE_ENV === 'development') {
                    console.log('server response:', serverResponse);
                }

                resolve(serverResponse);
            });

            // If request failed
            ajaxRequest.addEventListener('error', () => reject(CONNECTION_ERROR));
            ajaxRequest.addEventListener('timeout', () => reject(CONNECTION_ERROR));

            // Open and send request
            ajaxRequest.open(options.method, options.url);

            if (options.method === 'post') {
                ajaxRequest.setRequestHeader('Content-Type', 'application/json');
            }

            ajaxRequest.send(options.data ? JSON.stringify(options.data) : null);
        });
    },


    /**
     * @param {string} url
     * @param {Object} [queryParams]
     * @returns {Promise} - resolved with server respond or rejected with  server error
     */
    get: function(url, queryParams) {
        if (queryParams && typeof queryParams === 'object') {
            url = url + '?' + this.buildQuery(queryParams);
        }
        return this.send({ url: url, method: 'get' });
    },


    /**
     * @param {string} url
     * @param {Object} [data]
     * @returns {Promise} - resolved with server respond or rejected with  server error
     */
    post: function(url, data = {}) {
        return this.send({ url: url, method: 'post', data: data });
    },


    /**
     * @private
     * @param {object} queryParams
     * @returns {string} - valid url query
     */
    buildQuery: function(queryParams) {
        return Object
            .keys(queryParams)
            .map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(queryParams[key]));
            })
            .join('&');
    }
};


module.exports = AjaxService;
