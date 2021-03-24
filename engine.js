function show(obj) {
    obj.style.visibility = "visible";
}

window.onload = () => {

    console.log("loading...");
    let sprites = document.getElementsByTagName("sprite");
    for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        const img = new Image();
        img.src = `img/${sprite.id}.png`;
        sprite.appendChild(img);
        sprite.style.left = sprite.getAttribute("x") + "px";
        sprite.style.top = sprite.getAttribute("y") + "px";
    }

    let infers = document.getElementsByTagName("infer");
    for (let i = 0; i < infers.length; i++) {
        const el = infers[i];
        el.onclick = () => {
            const txt = el.getAttribute("speech");
            if (txt != null)
                say(txt);
        };
    }


}


function say(str) {
    const utterance = new SpeechSynthesisUtterance(str);
    utterance.lang = "fr";
    speechSynthesis.speak(utterance);
}



function goto(obj) {
    let scenes = document.getElementsByTagName("scene");
    for (let i = 0; i < scenes.length; i++) {
        scenes[i].style.visibility = "hidden";
    }
    obj.style.visibility = "visible";
}