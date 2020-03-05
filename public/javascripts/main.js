console.log("hola");

const selectDocs = document.querySelector("#selectDocs");
const selectDbs = document.querySelector("#selectDbs");

fetch("/databases")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    var opt = document.createElement("option");
    opt.appendChild( document.createTextNode("New Option Text") );
    for(let name in myJson.databases){
      opt.value = myJson.databases[name].name;
      selectDbs.appendChild(opt); 
      console.log(myJson.databases[name].name);
    }
    console.log(myJson);
  });