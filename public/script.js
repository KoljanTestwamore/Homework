const addPads = document.getElementsByClassName('add');

function makeNote(note) {
    let sectorNumber = +!(note["group"] === 'priority');

    let content = document.querySelectorAll(".sectorContent")[sectorNumber]; 

    let box = createElement('div', 'box', content)
    box.classList.add(note["color"]);

    let imageSection = createElement('div', 'imageSection', box);

    let image = createElement('img', 'image', imageSection, (note["image"] != undefined) 
                                                            ? "images/" + note["image"]
                                                            : ""
        );

    let title = createElement('textarea', 'title', box);
    title.textContent = note["title"];
    addEventListenerToInput(title);
    formateTextarea(title)

    let text = createElement('textarea','text',box,note["content"]);
    addEventListenerToInput(text);
    formateTextarea(text);

    let actionPad = createElement('div', 'actionPad', box);

    let actPrev = createElement('img','',actionPad,"icons/arrowprev.png")
    actPrev.addEventListener('click',()=>{
        let prevBox = box.previousSibling;
        if (prevBox.classList != undefined) { 
            let tempColor = getColor(prevBox);
            prevBox.classList.remove(tempColor);
            prevBox.classList.add(getColor(box));
            box.classList.remove(getColor(box));
            box.classList.add(tempColor);

            let tempString = prevBox.querySelector(".title").value;
            prevBox.querySelector(".title").value = box.querySelector(".title").value;
            box.querySelector(".title").value = tempString;

            tempString = prevBox.querySelector(".text").value;
            prevBox.querySelector(".text").value = box.querySelector(".text").value;
            box.querySelector(".text").value = tempString;

            tempString = prevBox.querySelector(".image").src;
            if (!(tempString.includes("images/"))) tempString = "";
            prevBox.querySelector(".image").src = (box.querySelector(".image").src.includes("images")) 
                                                            ? box.querySelector(".image").src 
                                                            : "";
            box.querySelector(".image").src = tempString; 

            formateTextarea(prevBox.querySelector(".title"));
            formateTextarea(box.querySelector(".title"));
            formateTextarea(prevBox.querySelector(".text"));
            formateTextarea(box.querySelector(".text"));
        }
    })


    let actNext = createElement('img','',actionPad,"icons/arrownext.png")
    actNext.addEventListener('click',()=>{
        let nextBox = box.nextSibling;
        if (nextBox != null) { 
            let tempColor = getColor(nextBox);
            nextBox.classList.remove(tempColor);
            nextBox.classList.add(getColor(box));
            box.classList.remove(getColor(box));
            box.classList.add(tempColor);

            let tempString = nextBox.querySelector(".title").value;
            nextBox.querySelector(".title").value = box.querySelector(".title").value;
            box.querySelector(".title").value = tempString;

            tempString = nextBox.querySelector(".text").value;
            nextBox.querySelector(".text").value = box.querySelector(".text").value;
            box.querySelector(".text").value = tempString;

            tempString = nextBox.querySelector(".image").src;
            if (!(tempString.includes("images/"))) tempString = "";
            nextBox.querySelector(".image").src = (box.querySelector(".image").src.includes("images")) 
                                                            ? box.querySelector(".image").src 
                                                            : "";
            box.querySelector(".image").src = tempString; 

            formateTextarea(nextBox.querySelector(".title"));
            formateTextarea(box.querySelector(".title"));
            formateTextarea(nextBox.querySelector(".text"));
            formateTextarea(box.querySelector(".text"));
        }
    })

    let actColor = createElement('img','',actionPad,"icons/color.png")
    actColor.addEventListener('click',()=>{
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
    })

    let actDelete = createElement('img','',actionPad,"icons/delete.png")
    actDelete.addEventListener('click', ()=>{
        content.removeChild(box);
    })
}

for (let pad of addPads) {
    pad.addEventListener('click', function() {
        let content = pad.parentElement;

        let box = createElement('div', 'box', content)
        box.classList.add(["red","orange","blue","yellow"][Math.floor(Math.random()*3)]);

        let imageSection = createElement('div','imageSection',box);

        let image = createElement('img', 'image', imageSection,"");

        let title = createElement('textarea','title', box,"title")
        formateTextarea(title);
        addEventListenerToInput(title);

        let  text = createElement('textarea', 'text', box, "text")
        formateTextarea(text);
        addEventListenerToInput(text);

        let actionPad = createElement('div','actionPad',box);

        let actPrev = createElement('img','',actionPad, "icons/arrowprev.png")
        actPrev.addEventListener('click',()=>{
            let prevBox = box.previousSibling;
            if (prevBox.classList != undefined) { 
                let tempColor = getColor(prevBox);
                prevBox.classList.remove(tempColor);
                prevBox.classList.add(getColor(box));
                box.classList.remove(getColor(box));
                box.classList.add(tempColor);

                let tempString = prevBox.querySelector(".title").value;
                prevBox.querySelector(".title").value = box.querySelector(".title").value;
                box.querySelector(".title").value = tempString;

                tempString = prevBox.querySelector(".text").value;
                prevBox.querySelector(".text").value = box.querySelector(".text").value;
                box.querySelector(".text").value = tempString;

                tempString = prevBox.querySelector(".image").src;
                if (!(tempString.includes("images/"))) tempString = "";
                prevBox.querySelector(".image").src = (box.querySelector(".image").src.includes("images")) 
                                                                ? box.querySelector(".image").src 
                                                                : "";
                box.querySelector(".image").src = tempString; 

                formateTextarea(prevBox.querySelector(".title"));
                formateTextarea(box.querySelector(".title"));
                formateTextarea(prevBox.querySelector(".text"));
                formateTextarea(box.querySelector(".text"));
            }
        })

        let actNext = createElement('img','',actionPad,"icons/arrownext.png")
        actNext.addEventListener('click',()=>{
            let nextBox = box.nextSibling;
            if (nextBox != null) { 
                let tempColor = getColor(nextBox);
                nextBox.classList.remove(tempColor);
                nextBox.classList.add(getColor(box));
                box.classList.remove(getColor(box));
                box.classList.add(tempColor);

                let tempString = tempColor.querySelector(".title").value;
                tempColor.querySelector(".title").value = box.querySelector(".title").value;
                box.querySelector(".title").value = tempString;

                tempString = tempColor.querySelector(".text").value;
                tempColor.querySelector(".text").value = box.querySelector(".text").value;
                box.querySelector(".text").value = tempString;

                tempString = nextBox.querySelector(".image").src;
                if (!(tempString.includes("images/"))) tempString = "";
                nextBox.querySelector(".image").src = (box.querySelector(".image").src.includes("images")) 
                                                                ? box.querySelector(".image").src 
                                                                : "";
                box.querySelector(".image").src = tempString; 

                formateTextarea(nextBox.querySelector(".title"));
                formateTextarea(box.querySelector(".title"));
                formateTextarea(nextBox.querySelector(".text"));
                formateTextarea(box.querySelector(".text"));
            }
        })

        let actColor = createElement('img','',actionPad,"icons/color.png");
        actColor.addEventListener('click',()=>{
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
        })

        let actDelete = createElement('img','',actionPad,"icons/delete.png");
        actDelete.addEventListener('click', ()=>{
            content.removeChild(box);
        })
    })
}

function createElement(type, elementClass, parentElement, context) {
    let $elem = document.createElement(type);
    parentElement.appendChild($elem);
    $elem.className = elementClass;
    if (type === 'img') $elem.src = context
        else $elem.textContent = context;
    return $elem;
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

document.addEventListener('keyup', () => {
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
                    elementToAdd["images"] = box.querySelector(".image").src.split("/").pop();
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
            //xhrPost.send("ok");
            console.log(JSON.stringify(dataArray));
        });


/*----------------------------------------------------------------------*/
let data = {};
let lol = false;
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
console.log("xhrGet");
xhrGet.send();
