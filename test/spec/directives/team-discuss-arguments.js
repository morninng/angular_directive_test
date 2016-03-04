'use strict';

describe('Directive: teamDiscussArguments', function () {

  // load the directive's module
  beforeEach(module('directiveTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<team-discuss-arguments></team-discuss-arguments>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the teamDiscussArguments directive');
  }));
});
