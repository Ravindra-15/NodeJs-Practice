// function add(a, b){
//     return a + b;
// }
// var result = add(1, 3);
// console.log("The addition is: "+result);

// ..................................................2nd way ...............

// const add = function(a, b){
//     return a + b;
// }
// var result = add(4, 5);
// console.log("The addition is: " +result);

//...................................................3rd way..................

// const add = (a, b) =>{return a+b};
// var result = add(4, 5);
// console.log("The addition is: " +result);

//................................................4th way...............

// const add = (a, b) => a+b;
// var result = add(6, 3);
// console.log("The addition is: " +result);

//.....................................................................Autocall function.........

// (function(a, b){
//     console.log("Helld");
// })();

//.............................................Callback function................................................

 /* 
 function callback(){
    console.log("The addtion is complete.");
}

const add = function(a,b, callback){
     var result = (a + b);
     console.log('Result is: ' +result);
     callback();
}

add(7, 8, callback);
*/

/*
const add = function(a, b , mul){
    var result = a + b;
    console.log("Result is: " +result);

    result = mul(a, b, result);
    console.log("Final Result: "+result);
}
add(3,4,(a, b, result) => {
    return result + (a*b);
    
})
*/
 
/*
const add = function(a,b, callback){
     var result = (a + b);
     console.log('Result is: ' +result);
     callback();
}

add(7, 7, () =>{
    console.log("Sum completed.");
});
*/
console.log("Hello");
