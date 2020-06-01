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
    document.getElementById('outline').innerHTML += `<button id = '${id}' onclick='screenSelector("${id}")'>${value}</button>`
}
function switchField(){
    let fields = document.getElementsByClassName('field')
    for(i of fields){
        i.style.display = 'none';
    }
    try {
        fields[currentField+1].style.display = 'block'
        currentField++
    } catch (error) {
        document.getElementById('error').style.display = 'block';
    }

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
    switchField();
}
function screenSelector(id){
    let screens = ['urlField', 'tagField', 'attrField'];
    let ids = ['navURL', 'navTargets', 'navAttributes'];
    let fields = document.getElementsByClassName('field')
    for(i of fields){
        i.style.display = 'none';
    }
    document.getElementById(screens[ids.indexOf(id)]).style.display = 'block';
}
function generate(){
    let numberOfElements = attributes.length;
    let starterCode = `
    from bs4 import BeautifulSoup as bs
    from requests import get

    page = get('${url}').content
    soup = bs(page, 'lxml')
    `;
    
}