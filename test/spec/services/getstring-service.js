'use strict';

describe('Service: GetStringService', function () {

  // load the service's module
  beforeEach(module('directiveTestApp'));

  // instantiate service
  var GetStringService;
  beforeEach(inject(function (_GetStringService_) {
    GetStringService = _GetStringService_;
  }));

  it('should do something', function () {
    expect(!!GetStringService).toBe(true);
  });

});
