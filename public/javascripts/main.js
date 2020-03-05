console.log("hola");

const selectDocs = document.querySelector("#selectDocs");

fetch("/databases")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    var opt = document.createElement("option");
    opt.appendChild( document.createTextNode("New Option Text") );
    for(let name in myJson){
      console.log(myJson[name]);
    }
    console.log(myJson);
  });