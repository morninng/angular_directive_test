'use strict';

describe('Directive: mxaEvent', function () {

  // load the directive's module
  beforeEach(module('directiveTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mxa-event></mxa-event>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mxaEvent directive');
  }));
});
