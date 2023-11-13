function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//Поміняйте місцями контент блоків «3» та «6».
function changeblocks(){
    var block3 = document.querySelector('.block3');
    var block6 = document.querySelector('.block6');
    
    if (block3 && block6) {
        var tempContent = block3.innerHTML;
        block3.innerHTML = block6.innerHTML;
        block6.innerHTML = tempContent;
    } else {
        alert('Can`t find blocks');
    }
    block3.innerHTML += '<form>' +
    '<label>' +
        '<input type="radio" name="alignment" value="left"> Align Left' + 
    '</label>' + 
    '<label>' + 
        '<input type="radio" name="alignment" value="center"> Align center' +
    '</label>' +
   '<label>' + 
        '<input type="radio" name="alignment" value="right"> Align Right' +
    '</label>' +
    '</form>';
}
//Напишіть функцію, яка обчислює площу
//паралелограма, беручи необхідні значення із
//відповідних змінних у скрипті, і виводить
//отриманий результат в кінці контенту в блоці «5».
function setArea(){
    var baseLength = 7;
    var heightLength = 4;
    var area = calculateParallelogramArea(baseLength, heightLength);
    var block = document.querySelector('.block5');
    block.innerHTML += "<p>Area of parallelogram is: " + area + "</p>";
}
function calculateParallelogramArea(base, height) {
    return base * height;
}
//Напишіть скрипт, який знаходить максимальну
//цифру у заданому натуральному числі, беручи
//необхідне значення із відповідної форми в блоці
//«5», а отриманий результат виводить за допомогою
//діалогового вікна і зберігає в cookies, причому:
//а) при оновленні веб-сторінки в броузері користувачу за допомогою
//діалогового вікна виводиться інформація, збережена в cookies, із
//інформуванням, що після натискання кнопки «ОК» відбудеться видалення
//даних із cookies, і не виводиться згадана вище форма;
//б) при натисканні кнопки «ОК» відповідні cookies видаляються, і виводиться
//наступне діалогове вікно із повідомленням, що cookies видалено, а натискання
//кнопки «ОК» перезавантажує веб-сторінку з початковим станом із наявною
//формою для введення даних.
function ifenter(e){
    if(e.keyCode === 13){
        e.preventDefault();
    }
}
function findMaxDigit(){
    var formElement = document.getElementById('numberForm');
    var inputElement = formElement.elements['number'];
    var inputValue = inputElement.value;
    if (inputValue.trim() !== "") {
        var maxDigit = Math.max(...inputValue.split('').map(Number));
        document.cookie = 'maxDigit' + this.iterator + '=' + maxDigit + ';';
        this.iterator += 1;
        alert('Maximum digit: ' + maxDigit);
    }
}
function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function getCookie(){
        if(document.cookie !== ''){
        alert(document.cookie + "\nCookies will be deleted after you press OK.");
        deleteAllCookies();
        alert("Cookies deleted.");
    }
}
//Напишіть скрипт, який при настанні події mouseout задає вирівнювання по
//правому краю вмісту блоків «2», «4», «5» при встановленні користувачем
//відповідних радіокнопок у формі і зберігає відповідні значення в localStorage
//броузера так, щоб при наступному відкриванні сторінки властивості
//вирівнювання по правому краю вмісту блоків «2», «4», «5» встановлювались із
//збережених значень в localStorage.
function setAlign(block){
    RadioButton = document.querySelector('input[name="alignment"]:checked');
    if (RadioButton) {
        const alignment = document.querySelector('input[name="alignment"]:checked').value;
        block.style.textAlign = alignment;
        const blockClass = '.' +  block.classList[0];
        localStorage.setItem(`alignment_${blockClass}`, alignment);
    }
}
function to_align(){
    const blocksToAlign = ['.block2', '.block4', '.block5'];
    blocksToAlign.forEach(function(blockclass) {
        const block = document.querySelector(blockclass);
        alignment = localStorage.getItem(`alignment_${blockclass}`);
        if (alignment) {
            block.style.textAlign = alignment;
        }        
    });
}
//Напишіть скрипт створення нумерованого списку:
//а) необхідні елементи форми появляються у відповідних номерних блоках (1..7)
//внаслідок події select на довільному контенті блоку;
//б) кількість пунктів нумерованого списку необмежена;
//в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані
//нумерованого списку зберігаються в localStorage броузера (структуровано на
//ваш розсуд), а сам список додається в кінці наявного вмісту відповідного
//номерного блока;
//г) перезавантаження веб-сторінки призводить до видалення нового вмісту із
//localStorage броузера.
class orderedList{
    constructor(){
        this.counter = 1;
        this.orderlist = [];
    }
    setForm(block) {
        var selectedText = window.getSelection().toString();
        if (selectedText !== "" && document.getElementById('listForm') === null) {
            block.innerHTML += "<form id='listForm'>" +
                "<label for='item'>Element of list:</label>" +
                "<input type='text' id='item' name='item' required>" +
                "<button type='button' onclick='list.addItem()'>Add</button>" +
                "<button type='button' onclick='list.saveList()'>Save</button>" +
                "<h4>Ordered list:</h2>" +
                "</form>" +
                "<ol id='outputList'></ol>";
        }
    }
    addItem() {
        var newItem = document.getElementById("item").value;
        document.getElementById("item").value = '';
        var outputList = document.getElementById("outputList");
        var listItem = document.createElement("li");
        var listI = this.counter + '. ' + newItem;
        this.orderlist.push(listI);
        listItem.appendChild(document.createTextNode(listI));
        this.counter++;
        outputList.appendChild(listItem);
    }
    saveList(){
        var listAsString = JSON.stringify(this.orderlist);
        localStorage.setItem('orderedList', listAsString);
        alert("List is saved");
    }
    removeFromLocal(){
        var InStorage = localStorage.getItem('orderedList');
        if (InStorage !== null) {
            localStorage.removeItem('orderedList');
            alert("List is removed from localStorage");
        }
    }
}
//Головна функція
async function main(){
    await sleep(2000);
    changeblocks();
    setArea();
    to_align();
    list.removeFromLocal();
}
const list = new orderedList();
main();
var iterator = 0;