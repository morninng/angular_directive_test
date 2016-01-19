'use strict';

describe('Service: EventListService', function () {

  // load the service's module
  beforeEach(module('directiveTestApp'));

  // instantiate service
  var EventListService;
  beforeEach(inject(function (_EventListService_) {
    EventListService = _EventListService_;
  }));

  it('should do something', function () {
    expect(!!EventListService).toBe(true);
  });

});
