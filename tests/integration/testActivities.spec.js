var assert = require('assert'),
    sails = require('sails'),
    request = require('supertest');

describe('Activities', function() {

    this.timeout(1000);

    it('gets all activities', function(done) {
        request(sails.hooks.http.app)
        .get('/activity')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/) 
        .expect(200)
        .end(done);
    });
    
});