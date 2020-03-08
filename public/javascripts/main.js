/* eslint-disable no-unused-vars */


const clearSelectCollection = () =>{
  let select = document.getElementById("selectDocs");
  let length = select.options.length;
  for (let i = length-1; i >= 0; i--) {
    select.options[i] = null;
  }
};

const fillCollections = () => {
  let selectDbs = document.querySelector("#selectDbs");
  let strDbs = selectDbs.options[selectDbs.selectedIndex].value;
  let selectDocs = document.querySelector("#selectDocs");

  clearSelectCollection();
  console.log(strDbs); 
  
  fetch("/collections/"+strDbs)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      let opt;
      for(let collIndex in myJson){
        let nameCol = myJson[collIndex].name;
              
        opt = document.createElement("option");
        opt.appendChild(document.createTextNode(nameCol));
        opt.value = nameCol;
        selectDocs.appendChild(opt); 
      }
    });
};

const fillDocuments = () => {
  let selectDbs = document.querySelector("#selectDbs");
  let strDbs = selectDbs.options[selectDbs.selectedIndex].value;
  let selectDocs = document.querySelector("#selectDocs");
  let strDocs = selectDocs.options[selectDocs.selectedIndex].value;
  console.log("strDbs ", strDbs, " strDocs ", strDocs);
  fetch("/documents/"+strDbs+`/${strDocs}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    });
};