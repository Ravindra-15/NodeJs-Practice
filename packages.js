var note = require('./notes.js');
var _ = require('lodash');
var age = note.age;
console.log('Age: ', age);
if(age>= 18){
    console.log("You can vote.");
}
else{
    console.log("You can not vote.");
}

var result = note.addnumber(age, 6);
console.log("Result Now: ",result);

var multi = note.mul(2,6);
console.log("Multiplication is: ",multi);

//................................................lodash............

var data = ['Rahul', 'Murga', 'Chamar', 2, 3, 2, 'Murga', '3', 2, 1];
var filter = _.uniq(data);
console.log(filter); 

//...................................................

console.log(_.isString("Murga"));
console.log(_.isString(54));
console.log(_.isString(false));  //boolean => false
console.log(_.isString(true));
