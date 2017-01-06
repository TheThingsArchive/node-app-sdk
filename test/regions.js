var should = require('should');
var regions = require('../dist/regions');
var ttn = require('..');

describe('Regions', function () {
  it('should create a client with a string region (eg \'eu\')', function () {
    should(regions.validate('eu')).equal('eu.thethings.network');
  });

  it('should create a client with a string region (eg \'eu\')', function () {
    should(regions.validate(ttn.regions.eu)).equal(ttn.regions.eu)
  });

  it('should create a client with a raw url to a broker', function () {
    should(regions.validate('localhost')).equal('localhost');
    should(regions.validate('rabbitmq')).equal('rabbitmq');
    should(regions.validate('foo.bar.com')).equal('foo.bar.com');
  });

  it('should not create a client with an invalid ttn region', function () {
    (function () {
      regions.validate('invalid.thethings.network')
    }).should.throw(/Invalid The Things Network region/);
  });
});

