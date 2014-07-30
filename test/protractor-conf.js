exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },
  
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
