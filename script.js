let selectedBox;
let sectorCounter = [0,0];

function makeNote(note) {
    let sectorNumber = +!(note["group"] === 'priority');

    let content = document.querySelectorAll(".sectorContent")[sectorNumber]; 

    let box = document.createElement('div');
    box.className = "box";
    box.classList.add(note['color']);

    content.appendChild(box);
    //box.style.order = sectorCounter[sectorNumber]++;

    //content.querySelector(".add").style.order = sectorCounter[sectorNumber];

    let imageSection = document.createElement('div');
    imageSection.className = "imageSection";
    box.appendChild(imageSection);

    let image = document.createElement('img');
    image.className = "image";
    imageSection.appendChild(image);

    if (note["image"] != undefined) {
        image.src = "images/" + note["image"];
    } else image.src = "";

    let title = document.createElement('textarea');
    box.appendChild(title);
    title.className = "title";
    title.textContent = note["title"];
    addEventListenerToInput(title);
    title.style.height = "2rem";
    title.style.height = (title.scrollHeight)+"px";


    let text = document.createElement('textarea');
    box.appendChild(text);
    text.className = "text";
    text.textContent = note["content"];
    addEventListenerToInput(text);
    text.style.height = "2rem";
    text.style.height = (text.scrollHeight)+"px";

    let actionPad = document.createElement('div');
    box.appendChild(actionPad);
    actionPad.className = "actionPad";

    let actPrev = document.createElement('img');
    actionPad.appendChild(actPrev);
    actPrev.src = "images/arrowprev.png";
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

    let actNext = document.createElement('img');
    actionPad.appendChild(actNext);
    actNext.src = "images/arrownext.png";
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

    let actColor = document.createElement('img');
    actionPad.appendChild(actColor);
    actColor.src = "images/color.png";
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

    let actDelete = document.createElement('img');
    actionPad.appendChild(actDelete);
    actDelete.src = "images/delete.png";
    actDelete.addEventListener('click', ()=>{
        content.removeChild(box);
    })
}

const addPads = document.getElementsByClassName('add');
for (let pad of addPads) {
    pad.addEventListener('click', function() {
        let content = pad.parentElement;

        let box = document.createElement('div');
        box.className = "box";
        box.classList.add(["red","orange","blue","yellow"][Math.floor(Math.random()*3)]);

        content.appendChild(box);

        let imageSection = document.createElement('div');
        imageSection.className = "imageSection";
        box.appendChild(imageSection);

        let image = document.createElement('img');
        image.className = "image";
        imageSection.appendChild(image);
        image.src = "";

        let title = document.createElement('textarea');
        box.appendChild(title);
        title.className = "title";
        title.textContent = "New title";
        addEventListenerToInput(title);


        let text = document.createElement('textarea');
        box.appendChild(text);
        text.className = "text";
        text.textContent = "New text";
        addEventListenerToInput(text);

        let actionPad = document.createElement('div');
        box.appendChild(actionPad);
        actionPad.className = "actionPad";

        let actPrev = document.createElement('img');
        actionPad.appendChild(actPrev);
        actPrev.src = "icons/arrowprev.png";
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

        let actNext = document.createElement('img');
        actionPad.appendChild(actNext);
        actNext.src = "icons/arrownext.png";
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

        let actColor = document.createElement('img');
        actionPad.appendChild(actColor);
        actColor.src = "icons/color.png";
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

        let actDelete = document.createElement('img');
        actionPad.appendChild(actDelete);
        actDelete.src = "icons/delete.png";
        actDelete.addEventListener('click', ()=>{
            content.removeChild(box);
        })
    })
}

function formateTextarea(textarea) {
        textarea.style.height = "2rem";
        textarea.style.height = (textarea.scrollHeight)+"px";
}

function addEventListenerToInput(input) {
        input.addEventListener('keydown', ()=>{
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






document.querySelector("body").addEventListener('keyup', () => { //YES< VSEVOLOD WAS RIGHT
            const xhr = new XMLHttpRequest();
            xhr.open("POST","http://localhost:8080/");
            xhr.onreadystatechange = () => {
                    console.log(xhr.response);
            };
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
            xhr.send(JSON.stringify(dataArray));
        });


for (let note of data) {
    makeNote(note);
}