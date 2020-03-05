console.log("hola");

const selectDocs = document.querySelector("#selectDocs");
const selectDatabases = document.querySelector("#selectDbs");

fetch("/")
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(myJson) {
    var opt = document.createElement('option');
    opt.appendChild( document.createTextNode('New Option Text') );

    console.log(myJson);
  });