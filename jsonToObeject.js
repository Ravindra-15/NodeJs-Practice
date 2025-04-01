//...................................Json to object..............................
const jsonString = '{"name": "Ravindra", "age": 30, "city": "Pilibhit"}';
const object = JSON.parse(jsonString);
console.log(object);

//....................................object to json.........................
console.log("\nThis is object to jsonString ....................................");
const ob = {
    "name": "Kumar",
    "age": 30,
    "city": "Jahanabad"
}
const str = JSON.stringify(ob);
console.log(str);
console.log(typeof str);