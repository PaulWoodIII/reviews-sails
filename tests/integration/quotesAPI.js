var assert = require('assert'),
  bootstrap = require('../bootstrap/test.js');

describe('quotes CRUD', function() {

  this.timeout(30000);

    /*
    async.auto({
      login: function(callback) {
        callback(null, 'data', 'converted to array');
        sails.request({
          method: 'post',
          url: '/login',
          params: {
            email: "testUser@example.com",
            password: 'password'
          }
        }, function(err, clientRes, body) {
          if (err) return done(err);
          assert.equal(clientRes.statusCode, 200);
          console.log(body);
          return done();
        });
      },
      post: ['login', function(callback, results) {
        console.log('in write_file', JSON.stringify(results));
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        sails.request({
          method: 'post',
          url: '/quotes',
          params: {
            text: "test quote",
            author: 'test author'
          }
        }, function(err, clientRes, body) {
          if (err) return done(err);
          assert.equal(clientRes.statusCode, 200);
          console.log(body);
          return done();
        });
        callback(null, 'filename');
      }]
    }, done());
    */
    /*
    sails.request({
      method: 'post',
      url: '/quotes',
      params: {
        text: "test quote",
        author: 'test author'
      }
    }, function(err, clientRes, body) {
      if (err) return done(err);
      assert.equal(clientRes.statusCode, 200);
      console.log(body);
      return done();
    });


    // OR?
    request({
            method: 'POST',
            url: process.env.C9_HOSTNAME + process.env.PORT + '/quotes',
            data: {
                text: "test quote",
                author: 'test author'
            }
        },
        function(err, data) {
            assert.ok(data);
            done(err);
        });
    */




});