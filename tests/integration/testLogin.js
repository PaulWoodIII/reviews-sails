var assert = require('assert'),
    sails = require('sails'),
    request = require('supertest');

describe('Login', function() {

    this.timeout(1000);

    it('logs into the service', function(done) {
        request(sails.hooks.http.app)
        .get('/login')
        .set('Accept', 'application/json')
        .field('username','testUser')
        .field('password','password')
        // .expect('Content-Type', /json/) 
        // .expect(function(res){
        //     if(res.body.length != 10) throw new Error( "incorrect content length");
        // })
        .expect(200,done);
    });
    
});