var url;
var targets = {
    idName: '',
    className: '',
    tagName: '',
};
var classIndex = [];
var attributes = [];
var currentField = 0;
function addElement(value, id){
    document.getElementById('outline').innerHTML += `<button id = '${id}'>${value}</button>`
}
function switchField(){
    let fields = document.getElementsByClassName('field')
    fields[currentField].style.display = 'none';
    fields[currentField+1].style.display = 'block'
    currentField++
}
function parseURL(){
    addElement('URL', 'navURL');
    url = (document.getElementById('urlInput').value);
    switchField();
}
function parseTags(){
    let ids = ['tagName', 'className', 'classIndex', 'idName'];
    for(i of ids){
        if (i !=''){
            if(i == 'classIndex'){
                classIndex.push(document.getElementById(i).value)
            }else if(document.getElementById(i).value!=''){
                targets[i] = (targets[i] + `${document.getElementById(i).value} `)
            }
        }

    }
    addElement('Targets', 'navTargets');
    switchField();
}
function parseAttributes(){
    let attr = document.getElementById('attributes').value;
    if(attr != ''){
        attributes.push(attr);
    }else{
        attributes.push('innerHTML');
    }
    addElement('Attributes', 'navAttributes');
    switchField
}
function screenSelector(id){
    let screens = ['']
}