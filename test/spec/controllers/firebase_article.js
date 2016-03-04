'use strict';

describe('Controller: FirebaseArticleCtrl', function () {

  // load the controller's module
  beforeEach(module('directiveTestApp'));

  var FirebaseArticleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FirebaseArticleCtrl = $controller('FirebaseArticleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FirebaseArticleCtrl.awesomeThings.length).toBe(3);
  });
});
