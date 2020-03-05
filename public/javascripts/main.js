console.log("hola");

const selectDocs = document.querySelector("#selectDocs");
const selectDbs = document.querySelector("#selectDbs");

fetch("/databases")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    var opt;
    for(let name in myJson.databases){
      opt = document.createElement("option");
      opt.appendChild( document.createTextNode(myJson.databases[name].name) );
      opt.value = myJson.databases[name].name;
      selectDbs.appendChild(opt); 
      console.log(myJson.databases[name].name);
    }
    console.log(myJson);
  });