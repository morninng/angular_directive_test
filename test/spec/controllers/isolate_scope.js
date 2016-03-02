'use strict';

describe('Controller: IsolateScopeCtrl', function () {

  // load the controller's module
  beforeEach(module('directiveTestApp'));

  var IsolateScopeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IsolateScopeCtrl = $controller('IsolateScopeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IsolateScopeCtrl.awesomeThings.length).toBe(3);
  });
});
