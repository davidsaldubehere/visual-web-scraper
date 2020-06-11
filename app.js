var url;
var targets = {
    idName: '',
    className: '',
    tagName: '',
};
var attributes = [];
var currentField = 0;
var starterCode;
function addElement(value, id){
    document.getElementById('outline').innerHTML += `<button id = '${id}' onclick='screenSelector("${id}")'>${value}</button>`
}
function switchField(){
    for(x of document.getElementsByTagName('input')){
        x.value = '';
    }
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
    let ids = ['tagName', 'className', 'idName'];
    for(i of ids){
        if (i !=''){
            if(document.getElementById(i).value!=''){
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
    let variables = [];
    starterCode = `from bs4 import BeautifulSoup as bs\nfrom requests import get\npage = get('${url}').content\nsoup = bs(page, 'lxml')\ndef generatedCode():`;
    if(targets.tagName != ''){
        let tags = targets.tagName.split(' ');
        for(let i =0; i<=tags.length; i++){
            if(tags[i]!=undefined && tags[i]!=''){
                starterCode += `\n\ttag${i} = soup.findAll('${tags[i]}')`
                variables.push(`tag${i}`);
            }
        }
    }
    if(targets.className != ''){
        let tags = targets.className.split(' ');
        for(let i =0; i<=tags.length; i++){
            if(tags[i]!=undefined && tags[i]!=''){
                starterCode += `\n\tclass${i} = soup.findAll(class_='${tags[i]}')`
                variables.push(`class${i}`);
            }
        }
    }
    if(targets.idName != ''){
        let tags = targets.idName.split(' ');
        for(let i =0; i<=tags.length; i++){
            if(tags[i]!=undefined && tags[i]!=''){
                starterCode += `\n\tid${i} = soup.find(id='${tags[i]}')`
                variables.push(`id${i}`);
            }
        }
    }
    for(var i = 0; i<numberOfElements; i++){
        if(variables[i].includes('id')){
            if(attributes[i]=='innerHTML'){
                starterCode += `\n\t${variables[i]}Attributes = ${variables[i]}.text`
            }
        }else{
            if(attributes[i]=='innerHTML'){
                starterCode += `\n\t${variables[i]}AttrList = [x.text for x in ${variables[i]}]`
            }else{
                starterCode += `\n\t${variables[i]}Attrlist=[]\n\t for i in ${variables[i]}:\n\t\t${variables[i]}.append(i['${attributes[i]}'])`
            }

        }
    }
    console.log(starterCode);
    document.getElementById('generatedCode').innerHTML=starterCode;
}
function copyCode(){
    const el = document.createElement('textarea');
    el.value = starterCode;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Code Copied')
}