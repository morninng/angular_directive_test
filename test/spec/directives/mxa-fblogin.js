'use strict';

describe('Directive: mxaFblogin', function () {

  // load the directive's module
  beforeEach(module('directiveTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mxa-fblogin></mxa-fblogin>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mxaFblogin directive');
  }));
});
