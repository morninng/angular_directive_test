'use strict';

describe('Controller: EventListCtrl', function () {

  // load the controller's module
  beforeEach(module('directiveTestApp'));

  var EventListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventListCtrl = $controller('EventListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventListCtrl.awesomeThings.length).toBe(3);
  });
});
