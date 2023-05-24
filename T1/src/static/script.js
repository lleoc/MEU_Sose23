var formfield = document.getElementById('formfield');

function add(){
    var newField = document.createElement('input');
    newField.setAttribute('id','Drug');
    newField.setAttribute('placeholder','Drug');
    newField.setAttribute('name', 'drug');
    newField.setAttribute('type','text');
    newField.setAttribute('class','button');
    newField.setAttribute('size',50);
    newField.setAttribute('style', 'margin-bottom: 5px;');

    var br = document.createElement('br');
    br.setAttribute('class', 'buttonBr');

    formfield.appendChild(newField);
    formfield.appendChild(br);
}

function createAddButton(){
    var newAddButton = document.createElement('button');
    newAddButton.setAttribute('class', 'add');
    newAddButton.setAttribute('name', 'addButton');
    newAddButton.setAttribute('onclick', 'add()');
    newAddButton.innerHTML += "+";
    return newAddButton;
}
function changeButtons(){
    var elements = document.getElementsByName("addButton");
    for (let index = 0; index < elements.length-2; index++) {
        var element = elements[index];
        element.setAttribute('class', 'remove');
        element.setAttribute('name', 'removeButton');
        element.setAttribute('onclick', 'remove()');
        element.innerHTML.substring(0, element.innerHTML.length-1);
        element.innerHTML += "-";
    }
    
}

function remove(){
    var inputFields = formfield.getElementsByTagName('input');
    var lineBreaks = formfield.getElementsByClassName('buttonBr');
        if(inputFields.length > 2) {
        formfield.removeChild(inputFields[(inputFields.length) - 1]);
        formfield.removeChild(lineBreaks[(inputFields.length) - 1]);
    }
}

async function submitForm(){
    var elements = document.getElementsByName("drug");
    var drugs = [];
    for (let index = 0; index < elements.length; index++) {
        if(elements[index].value !==''){
            drugs.push(elements[index].value);
        }
    }

    const baseURL = 'http://192.168.0.31:5000/drug_conflicts/';
    var request = createRequest(drugs);
    const url= baseURL + request;
    
    fetchAsync(url).then(
        (value => {
            var text = value.replaceAll('"', '');
            text = text.replaceAll('{', '');
            text = text.replaceAll('}', '');
            text = text.replaceAll(',', '<br />');
        if(value.includes(':')){
            createDangerAlert(text);
        }else{
            createSuccessAlert();
        }})
    );
}
async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.text();
    console.log(data);
    return data;
}

function createRequest(drugs){
    var request = "";
    console.log("drugs:" + drugs);
    for (let index = 0; index < drugs.length; index++) {
        request += drugs[index] + ";";
    }
    return request;
}

function createDangerAlert(text){
    if(document.getElementById('danger') !== null){
        document.getElementById('danger').remove();
    }
    if(document.getElementById('success') !== null){
        document.getElementById('success').remove();
    }

    var alertDiv = document.getElementById('interactionAlert');
    var alert = document.createElement('div');

    alert.setAttribute('id', 'danger');
    alert.setAttribute('class', 'alert alert-danger');
    alert.innerHTML += "Drug interaction(s) found:<br />" +text;
    alertDiv.appendChild(alert); 
}

function createSuccessAlert(){
    if(document.getElementById('success') === null){
        if(document.getElementById('danger') !== null){
            document.getElementById('danger').remove();
        }

        var alertDiv = document.getElementById('interactionAlert');
        var alert = document.createElement('div');

        alert.setAttribute('id', 'success');
        alert.setAttribute('class', 'alert alert-success');
        alert.innerHTML += "No drug interactions found";
        alertDiv.appendChild(alert);
    } 
}