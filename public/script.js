const addBoxes = document.getElementsByClassName('add');
const colors = ["red","orange","blue","yellow"];

function makeNote(note) {
    let sectorNumber = (note["group"] === 'priority') ? 0 : 1;
    let content = document.querySelectorAll(".sectorContent")[sectorNumber]; 

    let box = createElement('div', 'box', content)
    box.classList.add(note["color"]);

    let imageSection = createElement('div', 'imageSection', box);

    let image = createElement('img', 'image', imageSection, (note["image"] != undefined) 
                                                            ? "images/" + note["image"]
                                                            : ""
        );

    let title = createInputElement('textarea', 'title', box, note["title"]);

    let text = createInputElement('textarea', 'text', box, note["content"]);

    createPads(box);
}

function swapBoxes(box1,box2) {
    if (box2 != null) { 
        let tempColor = getColor(box2);
        box2.classList.remove(tempColor);
        box2.classList.add(getColor(box1));
        box1.classList.remove(getColor(box1));
        box1.classList.add(tempColor);

        let tempString = box2.querySelector(".title").value;
        box2.querySelector(".title").value = box1.querySelector(".title").value;
        box1.querySelector(".title").value = tempString;

        tempString = box2.querySelector(".text").value;
        box2.querySelector(".text").value = box1.querySelector(".text").value;
        box1.querySelector(".text").value = tempString;

        tempString = box2.querySelector(".image").src;
        if (!(tempString.includes("images/"))) tempString = "";
        box2.querySelector(".image").src = (box1.querySelector(".image").src.includes("images")) 
                                                        ? box1.querySelector(".image").src 
                                                        : "";
        box1.querySelector(".image").src = tempString; 

        formateTextarea(box2.querySelector(".title"));
        formateTextarea(box1.querySelector(".title"));
        formateTextarea(box2.querySelector(".text"));
        formateTextarea(box1.querySelector(".text"));
    }
}

function changeColor(box) {
    if (box.classList.contains("red")) {
        box.classList.remove("red");
        box.classList.add("yellow");
    } else if (box.classList.contains("yellow")) {
        box.classList.remove("yellow");
        box.classList.add("orange");            
    } else if (box.classList.contains("orange")) {
        box.classList.remove("orange");
        box.classList.add("blue");            
    } else {
        box.classList.remove("blue");
        box.classList.add("red"); 
    }
}

function createPads(box) {
    let actionPad = createElement('div','actionPad',box);

    let actPrev = createElement('img','',actionPad, "icons/arrowprev.png")
    actPrev.addEventListener('click',()=>{
        swapBoxes(box, box.previousSibling);
    });

    let actNext = createElement('img','',actionPad,"icons/arrownext.png")
    actNext.addEventListener('click',()=>{
        swapBoxes(box, box.nextSibling);
    });

    let actColor = createElement('img','',actionPad,"icons/color.png");
    actColor.addEventListener('click',()=>{
        changeColor(box);
    });

    let actDelete = createElement('img','',actionPad,"icons/delete.png");
    actDelete.addEventListener('click', ()=>{
        content.removeChild(box);
    });
    actionPad.addEventListener('click', sendData);
}

function createElement(type, elementClass, parentElement, content) {
    let $elem = document.createElement(type);
    parentElement.appendChild($elem);
    $elem.className = elementClass;
    if (type === 'img') $elem.src = content
        else $elem.textContent = content;
    return $elem;
}

function createInputElement(type, elementClass, parentElement, content) {
    let input = createElement(type, elementClass, parentElement, content);
    formateTextarea(input);
    addEventListenerToInput(input);
}

function formateTextarea(textarea) {
        textarea.style.height = "0rem";
        textarea.style.height = (textarea.scrollHeight)+"px";
}

function addEventListenerToInput(input) {
        input.addEventListener('input', ()=>{
            formateTextarea(input);
        })
}

function getColor(box) {
    let colors = ["red","orange","blue","yellow"];
    for (i = 0; i < 4; i++) {
        if (box.classList.contains(colors[i])) {
            return colors[i];
        }
    }
}

function sendData() {
            let dataArray = [];
            let allBoxes = document.querySelectorAll(".box:not(.add)");
            for (let i = 0 ; i < allBoxes.length; i++) {
                let box = allBoxes[i];
                let elementToAdd = {
                    "title" : box.querySelector(".title").value,
                    "content" : box.querySelector(".text").value,
                    "color" : getColor(box),
                    "group" : (box.parentElement.classList.contains("firstSectorContent")) ? "priority" : "normal"
                };
                if (box.querySelector(".image").src.includes("images/")) 
                    elementToAdd["image"] = box.querySelector(".image").src.split("/").pop();
                dataArray.push(elementToAdd);
            }
            const xhrPost = new XMLHttpRequest();
            xhrPost.open("POST","http://localhost:8080/users");
            xhrPost.setRequestHeader("Content-Type", "application/json");
            xhrPost.onreadystatechange = () => {
                if (xhrPost.readyState === 4) 
                console.log(xhrPost.response);
            };
            xhrPost.send(JSON.stringify(dataArray));
            console.log(JSON.stringify(dataArray));
        }

/*----------------------------------------------------------------------*/
for (let boxAdder of addBoxes) {
    boxAdder.addEventListener('click', function() {
        let content = boxAdder.parentElement;

        let box = createElement('div', 'box', content)
        box.classList.add(colors[Math.floor(Math.random()*colors.length)]);

        let imageSection = createElement('div', 'imageSection', box);

        let image = createElement('img', 'image', imageSection, "");

        let title = createInputElement('textarea','title', box, "title");

        let text = createInputElement('textarea', 'text', box, "text");

        createPads(box);
    })
}

let data = {};

const xhrGet = new XMLHttpRequest();
xhrGet.open("GET","http://localhost:8080/data");
xhrGet.onreadystatechange = () => {
    if (xhrGet.readyState === 4) {
        if (xhrGet.status === 200) {
            console.log("data:   " + xhrGet.responseText);  
            data = JSON.parse(xhrGet.responseText);
            for (let note of data) {
                makeNote(note);
            }
        } else {
            console.log("Error! Server replied with status: " + xhrGet.status);
        }
    }
};
xhrGet.send();
document.addEventListener('keyup', sendData);
