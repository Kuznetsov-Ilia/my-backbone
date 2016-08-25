WebdriverCSS:
Adminpanel https://github.com/webdriverio/webdrivercss-adminpanel
docker run -p 9000:9000 aeharding/webdrivercss-adminpanel


https://hub.docker.com/r/vvoyer/docker-selenium-firefox-chrome/



test report tool:
http://allure.qatools.ru/

CI and DS https://hub.docker.com/r/jenkinsci/jenkins/




https://hub.docker.com/r/selenium/hub/
// create a WebdriverIO instance
var client = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'phantomjs'
    }
});

// initialise WebdriverCSS for `client` instance
require('webdrivercss').init(client, {
    screenshotRoot: 'myRegressionTests',

    // Provide the API route
    api: 'http://example.com/api/webdrivercss'
});

client
    .init()
    .sync() // downloads last uploaded tarball from http://example.com/api/webdrivercss/myRegressionTests.tar.gz
    .url('http://example.com')

    // do your regression tests
    // ...

    .sync() // zips your screenshot root and uploads it to http://example.com/api/webdrivercss via POST method
    .end();
