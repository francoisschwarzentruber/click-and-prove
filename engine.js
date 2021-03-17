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


}



function goto(obj) {
    let scenes = document.getElementsByTagName("scene");
    for (let i = 0; i < scenes.length; i++) {
        scenes[i].style.visibility = "hidden";
    }
    obj.style.visibility = "visible";
}