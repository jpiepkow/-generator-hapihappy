var <%= handle %> = require('./../lib/<%= handle %>');
var Joi = require('joi');

module.exports = [{
    method: 'GET',
    path: '/v1',
    config: {
    opts = {};
        handler: function(request, reply) {
            <%= handle %>.example(opts, function(err,r) {
                if(err) {
                    reply(err);
                } else {
                    reply(r);
                }
            })
        },
        tags:['api']
    }
}]