const notifier = require('node-notifier');
const path = require('path');

function doNotify(name, message) {
  notifier.notify({
    title: 'New message from ' + name,
    message: message,
    icon: path.join(__dirname, '/images/logo.png'), // Absolute path (doesn't work on balloons)
    sound: false, // Only Notification Center or Windows Toasters
    wait: false // Wait with callback, until user action is taken against notification
  }, function (err, response) {
    // Response is response from notification
  });
}
