exports.config = {
  allScriptsTimeout: 11000,

// The address of a running standalone selenium server.
//  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },
  
  /*
  chromeOnly: true,
  */
  /*
  multiCapabilities: [{
    'browserName': 'chrome'
  },{'browserName': 'internet explorer'}],
  */
  
  // Test is running on port 9001; see Gruntfile.js - connect
  baseUrl: 'http://localhost:9001/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
