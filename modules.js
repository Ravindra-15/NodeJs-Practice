var os = require('os');
var fs = require('fs');

var user = os.userInfo();
console.log(user);
console.log(user.username);
fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', () =>{console.log("file is created");});
  