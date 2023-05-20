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
    newField.setAttribute('type','text');
    newField.setAttribute('class','form-control-sm');
    newField.setAttribute('size',50);
    formfield.appendChild(newField);
}

function remove(){
    var inputFields = formfield.getElementsByTagName('input');
    if(inputFields.length > 2) {
        formfield.removeChild(input_tags[(inputFields.length) - 1]);
    }
}

function submitForm(){
    var elements = document.getElementsByClassName("drug");
    for (let index = 0; index < elements.length; index++) {
        console.log(elements[index].value);
    }
    //checking in backend
    if(testVar===1){
        createDangerAlert();
        testVar = 2;
    }else{
        createSuccessAlert();
    }
    
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