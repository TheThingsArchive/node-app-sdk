var should = require('should');
var utils = require('../dist/lib/utils');

describe('utils', function() {

  describe('serviceToFunction', function() {
    it('should convert ServiceName to serviceName', function() {
      utils.serviceToFunction('ServiceName').should.eql('serviceName');
    });
  });

  describe('expandRegion', function() {
    it('should process and remove region', function() {
      var options = {
        region: 'eu',
        foo: 'bar'
      }
      utils.expandRegion(options);
      options.should.eql({
        baseUrl: 'https://eu.thethings.network:8084',
        foo: 'bar'
      });
    });
    it('should not override baseUrl', function() {
      var options = {
        region: 'eu',
        baseUrl: 'http://my.thethings.network:9999',
        foo: 'bar'
      }
      utils.expandRegion(options);
      options.should.eql({
        baseUrl: 'http://my.thethings.network:9999',
        foo: 'bar'
      });
    });
  });

  describe('expandAuth', function() {
    it('should process and remove key while preserving other options and headers', function() {
      var options = {
        key: 'my-key',
        foo: 'bar',
        headers: {
          'User-Agent': 'request'
        }
      };
      utils.expandAuth(options);
      options.should.eql({
        foo: 'bar',
        headers: {
          Authorization: 'Key ' + 'my-key',
          'User-Agent': 'request'
        }
      });
    });
    it('should not override Authorization header', function() {
      var options = {
        key: 'my-key',
        headers: {
          Authorization: 'my-auth'
        }
      };
      utils.expandAuth(options);
      options.should.eql({
        headers: {
          Authorization: 'my-auth'
        }
      });
    });
    it('should process and remove token while preserving other options', function() {
      var options = {
        foo: 'bar',
        token: 'my-key'
      };
      utils.expandAuth(options);
      options.should.eql({
        foo: 'bar',
        auth: {
          bearer: 'my-key'
        }
      });
    });
    it('should not override auth', function() {
      var options = {
        token: 'my-key',
        auth: {
          username: 'my-user',
          password: 'my-pass'
        }
      };
      utils.expandAuth(options);
      options.should.eql({
        auth: {
          username: 'my-user',
          password: 'my-pass'
        }
      });
    });
  });

  describe('replaceUriOptions', function() {
    it('should replace and remove options', function() {
      var options = {
        uri: '/applications/{app_id}/devices/{dev_id}',
        app_id: 'my-app',
        dev_id: 'my-dev',
        foo: 'bar'
      };
      utils.expandUri(options);
      options.should.eql({
        uri: '/applications/my-app/devices/my-dev',
        foo: 'bar'
      });
    });
  });
});