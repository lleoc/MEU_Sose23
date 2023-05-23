const Interaction = {
    Critical: "critical",
    None: "none",
    Default: "default"
}
var formfield = document.getElementById('formfield');
var interactionFound = Interaction.Default;
var testVar = 1;

function add(){
    var newField = document.createElement('input');
    newField.setAttribute('id','Drug');
    newField.setAttribute('placeholder','Drug');
    newField.setAttribute('name', 'drug');
    newField.setAttribute('type','text');
    newField.setAttribute('class','button');
    newField.setAttribute('size',50);
    newField.setAttribute('style', 'margin-bottom: 5px;');
    formfield.appendChild(newField);
    //formfield.appendChild(createAddButton());
    //changeButtons();
    var br = document.createElement('br');
    br.setAttribute('class', 'buttonBr');
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
        console.log(elements[index]);
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
    var lineBreaks = formfield.getElementsByClassName("buttonBr");
        if(inputFields.length > 2) {
        formfield.removeChild(inputFields[(inputFields.length) - 1]);
        formfield.removeChild(lineBreaks[(inputFields.length) - 1]);
    }
}

function submitForm(){
    var elements = document.getElementsByName("drug");
    var drugs = [];
    for (let index = 0; index < elements.length; index++) {
        console.log(elements[index].value);
        if(elements[index].value !==''){
            drugs.push(elements[index].value);
        }
        console.log(drugs)
    }
    //checking in backend
    if(testVar===1){
        createDangerAlert();
        testVar = 2;
    }else{
        createSuccessAlert();
    }
    
}

function checkInteractions(drugs){

}

function createDangerAlert(){
    if(document.getElementById('danger') === null){
        if(document.getElementById('success') !== null){
            document.getElementById('success').remove();
        }

        var alertDiv = document.getElementById('interactionAlert');
        var alert = document.createElement('div');

        alert.setAttribute('id', 'danger');
        alert.setAttribute('class', 'alert alert-danger');
        alert.innerHTML += "test text";
        alertDiv.appendChild(alert);
    } 
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
        alert.innerHTML += "test text";
        alertDiv.appendChild(alert);
    } 
}
//source of pill pic: http://clipart-library.com/clip-art/pill-transparent-background-6.htm