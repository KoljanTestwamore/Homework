function makeNote(note) {
    let content = document.querySelectorAll(".sectorContent")[1];
    if (note["group"] === 'priority') {
        content = document.querySelectorAll(".sectorContent")[0];
    }

    let box = document.createElement('div');
    box.className = "box";
    box.classList.add(note['color']);
    content.appendChild(box);

    if (note["image"] != undefined) {
        let imageSection = document.createElement('div');
        imageSection.className = "imageSection";
        box.appendChild(imageSection);

        let image = document.createElement('img');
        image.className = "backNote";
        imageSection.appendChild(image);
        image.src = note["image"];
    }

    let title = document.createElement('div');
    box.appendChild(title);
    title.className = "title";
    title.textContent = note["title"];

    let text = document.createElement('div');
    box.appendChild(text);
    text.className = "text";
    text.textContent = note["content"];

    let actionPad = document.createElement('div');
    box.appendChild(actionPad);
    actionPad.className = "actionPad";
    actionPad.textContent = "actions";
}

const addPads = document.getElementsByClassName('add');
for (let pad of addPads) {
    pad.addEventListener('click', function() {
        let sectorContent = pad.parentElement;

        let box = document.createElement('div');
        box.className = "box";
        box.classList.add("red");
        sectorContent.appendChild(box);

        let title = document.createElement('div');
        box.appendChild(title);
        title.className = "title";
        title.textContent = "New Title";

        let text = document.createElement('div');
        box.appendChild(text);
        text.className = "text";
        text.textContent = "New note";

        let actionPad = document.createElement('div');
        box.appendChild(actionPad);
        actionPad.className = "actionPad";
        actionPad.textContent = "actions";
    })
}

for (let note of data) {
    makeNote(note);
}