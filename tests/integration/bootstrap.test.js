var Sails = require('sails'),
  Barrels = require('barrels'),
  sails;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(50000);

  Sails.lift({
    // configuration for testing purposes
    hooks: {
      sockets: false,
      pubsub: false,
      views: false,
    },
    log: {
      level: "error"
    },
    models: {
        connection: 'localDiskDb',
        migrate: 'drop'
      }
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    
    // Load fixtures
    var barrels   = new Barrels(process.cwd() + '/tests/fixtures');
    //var fixtures  = barrels.data;
    barrels.populate(function(err) {
      if(err){console.log(err);}
      done(err, sails);
    });
    
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});

// Test that Sails can lift with the hook in place
it ('sails does not crash', function(done) {
    done();
});