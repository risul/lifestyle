var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

function get(key, url, query) {
    var reqOpts = {
        uri: url,
        qs: query || {},
        useQuerystring: true,
        headers: {
            'User-Agent': 'lifestyle-0.0.1'
        }
    };

    if (key) { reqOpts.headers['x-FINN-apikey'] = key; }

    return request(reqOpts)
        .spread(function(response, data) {
            if (response.statusCode == 200) {
                return data;
            }
            else {
                throw new Error("HTTP status " + response.statusCode);
            }
        });
}

module.exports = {get: get};