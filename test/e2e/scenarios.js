'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('gt-grunt index.html page', function() {

  // Need to use this for Non-AngularJS 
  browser.ignoreSynchronization = true;
  
  browser.get('index.html');


  it('should have a title', function() {
    expect(browser.getTitle()).toEqual("gt-grunt");
  });

  it('should have a h1', function() {
    expect(element(by.id('heading')).getText()).toEqual("Hello Grunt!!");
  });

});
