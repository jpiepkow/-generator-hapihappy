var config = require('config');
var dbConfig = config.get('database');
var MongoClient = require('mongodb').MongoClient;
checkCollection = function (array,name, callback) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].name === name) {
            return callback(null, true);
        } else {
            if(i+1 === array.length) {
                return callback(null,false);
            }
        }
    }
};
bootstrap = {
    run: function(callback) {
        MongoClient.connect(dbConfig.url, function(err, db) {
            if(err) { throw err;}
            db.listCollections().toArray(function(err, items) {
                if(items.length === 0) {
                    db.createCollection(dbConfig.collection, function(err, collection){
                        if(err) {
                            return callback('Error bootstrapping application', null);
                        } else {
                            return callback(null, 'bootstrapped');
                        }
                    });
                }
                checkCollection(items,dbConfig.collection,function(err, r) {
                    if(err) {
                        callback('Error bootstrapping application:', err);
                    } else {
                        if(r) {
                            callback(null,'Application bootstrapped');
                        } else {
                            db.createCollection(dbConfig.collection, function(err, collection){
                                if(err) {
                                    callback('Error bootstrapping application', null);
                                } else {
                                    callback(null, 'bootstrapped');
                                }
                            });
                        }
                    }
                });
            });

        });
    }
};
module.exports = bootstrap;