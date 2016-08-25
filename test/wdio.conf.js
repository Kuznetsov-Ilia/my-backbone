exports.config = {
// =====================
// Server Configurations
// =====================
// Host address of the running Selenium server. This information is usually obsolete as
// WebdriverIO automatically connects to localhost. Also if you are using one of the
// supported cloud services like Sauce Labs, Browserstack or Testing Bot you also don't
// need to define host and port information because WebdriverIO can figure that our
// according to your user and key information. However if you are using a private Selenium
// backend you should define the host address, port, and path here.
  host: '192.168.99.100',
  port: 4444,
  //path: '/wd/hub',
// ==================
// Specify Test Files
// ==================
// Define which test specs should run. The pattern is relative to the directory
// from which `wdio` was called. Notice that, if you are calling `wdio` from an
// NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
// directory is where your package.json resides, so `wdio` will be called from there.
  specs: [
    './index.js'
  ],
  /*exclude: [
    'test/spec/multibrowser/**',
    'test/spec/mobile/**'
  ],*/

// ============
// Capabilities
// ============
// Define your capabilities here. WebdriverIO can run multiple capabilties at the same
// time. Depending on the number of capabilities, WebdriverIO launches several test
// sessions. Within your capabilities you can overwrite the spec and exclude option in
// order to group specific specs to a specific capability.

// First you can define how many instances should be started at the same time. Let's
// say you have 3 different capabilities (Chrome, Firefox and Safari) and you have
// set maxInstances to 1, wdio will spawn 3 processes. Therefor if you have 10 spec
// files and you set maxInstances to 10, all spec files will get tested at the same time
// and 30 processes will get spawned. The property basically handles how many capabilities
// from the same test should run tests.
  maxInstances: 10,
// If you have trouble getting all important capabilities together, check out the
// Sauce Labs platform configurator - a great tool to configure your capabilities:
// https://docs.saucelabs.com/reference/platforms-configurator
  capabilities: [/*{
    browserName: 'phantomjs'
  }, */{
    browserName: 'chrome'
  }//, {
// maxInstances can get overwritten per capability. So if you have an in house Selenium
// grid with only 5 firefox instance available you can make sure that not more than
// 5 instance gets started at a time.
  /*  maxInstances: 5,
    browserName: 'firefox'
  }*/],

// ===================
// Test Configurations
// ===================
// Per default WebdriverIO commands getting executed in a synchronous way using
// the wdio-sync package. If you still want to run your tests in an async way
// using promises you can set the sync command to false.
  sync: false,
// Define all options that are relevant for the WebdriverIO instance here
  logLevel: 'error',// Level of logging verbosity: silent | verbose | command | data | result | error
  coloredLogs: true, // Enables colors for log output.
  screenshotPath: 'shots',// Saves a screenshot to a given path if a command fails.
// Set a base URL in order to shorten url command calls. If your url parameter starts
// with "/", the base url gets prepended.
  baseUrl: 'https://otvet.mail.ru',
  waitforTimeout: 10000,// Default timeout for all waitForXXX commands.
// Default timeout in milliseconds for request
// if Selenium Grid doesn't send response
  connectionRetryTimeout: 90000,
// Default request retries count
  connectionRetryCount: 3,
// Initialize the browser instance with a WebdriverIO plugin. The object should have the
// plugin name as key and the desired plugin options as property. Make sure you have
// the plugin installed before running any tests. The following plugins are currently
// available:
// WebdriverCSS: https://github.com/webdriverio/webdrivercss
// WebdriverRTC: https://github.com/webdriverio/webdriverrtc
// Browserevent: https://github.com/webdriverio/browserevent
  plugins: {
    webdrivercss: {
      screenshotRoot: 'shots',
      failedComparisonsRoot: 'shots/diffs',
      misMatchTolerance: 0.05,
      screenWidth: [1024],
      api: 'http://192.168.99.100:9000/api/repositories/'
    }
    // webdriverrtc: {},
    // browserevent: {}
  },
//
// Framework you want to run your specs with.
// The following are supported: mocha, jasmine and cucumber
// see also: http://webdriver.io/guide/testrunner/frameworks.html
//
// Make sure you have the node package for the specific framework installed before running
// any tests. If not please install the following package:
// Mocha: `$ npm install mocha`
// Jasmine: `$ npm install jasmine`
// Cucumber: `$ npm install cucumber`

 // framework: 'cucumber',
  framework: 'mocha',
// Test reporter for stdout.
// The following are supported: dot (default), spec and xunit
// see also: http://webdriver.io/guide/testrunner/reporters.html
  reporters: ['dot'/*, 'allure'*/],
// Some reporter require additional information which should get defined here
  reporterOptions: {
// If you are using the "xunit" reporter you should define the directory where
// WebdriverIO should save all unit reports.
    outputDir: 'reports'
  },
// Options to be passed to Mocha.
// See the full list at http://mochajs.org/
/*  cucumberOpts: {
    timeout: 10000,
    compilers: ['js:babel/register']
  }*/
  mochaOpts: {
    timeout: 60000,
    compilers: ['js:babel/register'],
    ui: 'bdd'
  }

// =====
// Hooks
// =====
// Run functions before or after the test. If one of them returns with a promise, WebdriverIO
// will wait until that promise got resolved to continue.
// see also: http://webdriver.io/guide/testrunner/hooks.html
//
  // Gets executed once before all workers get launched.
  /*onPrepare: function (config, capabilities) {
  },
  //
  // Gets executed before test execution begins. At this point you can access to all global
  // variables like `browser`. It is the perfect place to define custom commands.
  before: function (capabilties, specs) {
  },
  //
  // Hook that gets executed before the suite starts
  beforeSuite: function (suite) {
  },
  //
  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  // beforeEach in Mocha)
  beforeHook: function () {
  },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  afterHook: function () {
  },
  //
  // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  beforeTest: function (test) {
  },
  //
  // Runs before a WebdriverIO command gets executed.
  beforeCommand: function (commandName, args) {
  },
  //
  // Runs after a WebdriverIO command gets executed
  afterCommand: function (commandName, args, result, error) {
  },
  //
  // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  afterTest: function (test) {
  },
  //
  // Hook that gets executed after the suite has ended
  afterSuite: function (suite) {
  },
  //
  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  after: function (capabilties, specs) {
  },
  //
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete: function (exitCode) {
  },
  //
  // Cucumber specific hooks
  beforeFeature: function (feature) {
  },
  beforeScenario: function (scenario) {
  },
  beforeStep: function (step) {
  },
  afterStep: function (stepResult) {
  },
  afterScenario: function (scenario) {
  },
  afterFeature: function (feature) {
  }*/

};
