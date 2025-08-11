var fields = document.querySelectorAll("#formularioId [name]");

var user ={};

fields.forEach((field, index)=>{

    user[field.name] = field.value;

});
console.log(user);
