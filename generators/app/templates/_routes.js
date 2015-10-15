var <%= handle %> = require('./../lib/<%= handle %>');
var Joi = require('joi');

module.exports = [{
    method: 'GET',
    path: '/v1',
    config: {
        handler: function(request, reply) {
        opts = {};
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