let domElements = {};
let isProven = {};
let alreadyProvenFactDOMEelements = {};
let proofNodeFromDOM = new Map();


function showInferThatCanBeProven() {
    const inferNodes = document.getElementsByTagName("infer");

    for (let i = 0; i < inferNodes.length; i++) {
        const inferNode = inferNodes[i];
        if (!inferNode.classList.contains("proven") && proofNodeFromDOM.get(inferNode).areAllPremissesProven())
            inferNode.classList.add("tobeproven");

    }
}



function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

class ProofNode {
    content;
    premisses = [];
    info = undefined;
    proofhidden = false;
    constructor(content) {
        this.content = content;
    }


    addPremisse(premisse) { this.premisses.unshift(premisse); }

    setInfo(info) { this.info = info; }

    areAllPremissesProven() {
        for (const child of this.premisses)
            if (!child.isProven())
                return false;

        return true;
    }


    isProven() {
        return isProven[this.content];
    }



    toDOM() {
        const element = document.createElement("proof");
        const elementInfer = document.createElement("infer");


        const tryToProve = () => {
            console.log(isProven[this.content]);

            if (isProven[this.content])
                return "alreadyProven";

            console.log(this.areAllPremissesProven());

            if (this.areAllPremissesProven()) {
                isProven[this.content] = true;

                if (this.label)
                    isProven[this.label] = true;

                elementInfer.classList.remove("tobeproven");
                elementInfer.classList.add("proven");

                if (alreadyProvenFactDOMEelements[this.content])
                    for (const el of alreadyProvenFactDOMEelements[this.content])
                        el.classList.add("proven");


                if (alreadyProvenFactDOMEelements[this.label])
                    for (const el of alreadyProvenFactDOMEelements[this.label])
                        el.classList.add("proven");


                showInferThatCanBeProven();

                return "proven";
            }
            else
                return "unprovable";
        }


        if (this.premisses.length >= 1) {
            const elementPremisses = document.createElement("proofs");
            for (const child of this.premisses) {
                elementPremisses.appendChild(child.toDOM());
            }
            element.appendChild(elementPremisses);

            if (this.proofhidden || (this.premisses.length == 1 && this.premisses[0] instanceof Sequence)) {
                const caseNode = getCaseNodeIfAny(this.premisses[0]);

                const elementNext = document.createElement("buttonDevelop");

                const elementCase = caseNode ? caseNode.toDOM() : undefined;
                elementNext.innerHTML = "...";
                if (elementCase)
                    element.appendChild(elementCase);

                element.appendChild(elementNext);

                elementInfer.style.cursor = "pointer";

                elementInfer.classList.add("developpable");
                elementNext.classList.add("developpable");

                elementPremisses.classList.add("hide");

                const toggle = () => {
                    if (tryToProve() != "proven") {
                        elementPremisses.style.display = "";

                        elementPremisses.classList.toggle("hide");
                        elementPremisses.classList.toggle("show");

                        if (elementPremisses.classList.contains("hide"))
                            setTimeout(() => {
                                if (elementCase)
                                    elementCase.style.display = "";
                                elementNext.style.display = "";
                            }, 500);
                        else {
                            elementNext.style.display = "none";
                            if (elementCase)
                                elementCase.style.display = "none";
                        }
                    }


                }

                elementInfer.onclick = toggle;
                elementNext.onclick = toggle;
            }
            else
                elementInfer.onclick = () => { if (tryToProve() == "unprovable") beep(); };
        }
        else
            elementInfer.onclick = () => { if (tryToProve() == "unprovable") beep(); };


        elementInfer.innerHTML = this.content;

        if (this.content == "Contradiction")
            elementInfer.classList.add("contradiction");

        domElements[this.content] = element;

        if (this.label)
            domElements[this.label] = element;

        /*    if (this.info) {
                const elementInfo = document.createElement("info");
                elementInfo.innerHTML = "?";
                elementInfo.onclick = () => { alert(this.info) };
                elementInfer.appendChild(elementInfo);
            }*/


        element.appendChild(elementInfer);
        proofNodeFromDOM.set(elementInfer, this);
        return element;
    }




}





class Assumption {
    constructor(content) { this.content = content; }

    toDOM() {
        const element = document.createElement("assumption");
        element.innerHTML = this.content;

        domElements[this.content] = element;
        isProven[this.content] = true;

        if (this.label)
            domElements[this.label] = element;


        return element;
    }


    isProven() { return true; }


}




class Case {
    constructor(content) { this.content = content; }

    toDOM() {
        const element = document.createElement("case");
        element.innerHTML = this.content;

        domElements[this.conclusion] = element;
        isProven[this.conclusion] = true;

        if (this.label)
            domElements[this.label] = element;


        return element;
    }


    isProven() { return true; }
}


class AlreadyProvenFact {

    constructor(content) { this.content = content; }

    toDOM() {
        const element = document.createElement("alreadyprovenfact");
        element.innerHTML = this.content;

        if (domElements[this.content].tagName == "ASSUMPTION" || domElements[this.content].tagName == "CASE") {
            isProven[this.content] = true;
            element.classList.add("proven");
        }

        if (!alreadyProvenFactDOMEelements[this.content])
            alreadyProvenFactDOMEelements[this.content] = [];

        alreadyProvenFactDOMEelements[this.content].push(element);

        element.onclick = () => {
            const fact = domElements[this.content];
            if (fact)
                fact.classList.add("shake");
            setTimeout(() => fact.classList.remove("shake"), 1000);
        }
        return element;
    }


    isProven() { return isProven[this.content]; }
}



class Sequence {
    content = [];

    constructor(content) {
        this.content = content;
    }

    toDOM() {
        const element = document.createElement("content");
        for (const child of this.content) {
            element.appendChild(child.toDOM());
        }
        return element;
    }


    isProven() {
        for (const child of this.content)
            if (!child.isProven()) return false;
        return true;
    }
}







function getCaseNodeIfAny(obj) {
    function getCaseNodeIfAnyRec(obj) {
        if (obj instanceof Sequence) {
            const cases = obj.content.map(getCaseNodeIfAnyRec);
            const realCases = cases.filter((o) => o != undefined);
            if (realCases.length == 1)
                return realCases[0];
            else
                return undefined;
        }
        else if (obj instanceof Case)
            return obj;
        else if (obj instanceof ProofNode) {
            if (obj.inferByCaseStudy)
                return undefined;
            const cases = obj.premisses.map(getCaseNodeIfAnyRec);
            const realCases = cases.filter((o) => o != undefined);
            if (realCases.length == 1)
                return realCases[0];
            else
                return undefined;
        }

        return undefined;
    }


    if (obj instanceof Sequence) {
        for (const o of obj.content) {
            const caseNode = getCaseNodeIfAnyRec(o);
            if (caseNode)
                return caseNode;
        }
    }
    return undefined;
}



function extractContent(line) {
    const i = line.indexOf("{");
    const j = line.lastIndexOf("}");
    const text = dollarToBackSlashParenthesis(line.substr(i + 1, j - i - 1));
    console.log("extract text = " + text);
    return text;
}


function dollarToBackSlashParenthesis(line) {
    let left = true;
    while (line.indexOf("$") > -1) {
        line = line.replace("$", left ? "\\(" : "\\)");
        left = !left;
    }
    return line;
}


function testExist(obj) {
    if (obj == undefined)
        throw "error, we popped an element and there should be someone"
    return obj;
}



function linesToProof(lines) {
    let nodes = [];
    while (lines.length > 0) {
        const line = lines.shift();
        console.log(line);
        if (line == "{") {
            nodes.push(linesToProof(lines));
        }
        else if (line == "}") {
            return new Sequence(nodes);
        }
        else if (line.startsWith("\\AxiomC")) {
            nodes.push(new ProofNode(extractContent(line)));
        }
        /*  if (line.startsWith("\\Info")) {
              nodes[nodes.length - 1].setInfo(extractContent(line));
          }*/
        else if (line.startsWith("\\Label")) {
            nodes[nodes.length - 1].label = extractContent(line);
        }
        if (line.startsWith("\\Assume")) {
            nodes.push(new Assumption(extractContent(line)));
        }
        else if (line.startsWith("\\Case")) {
            nodes.push(new Case(extractContent(line)));
        }
        if (line.startsWith("\\AlreadyProven")) {
            nodes.push(new AlreadyProvenFact(extractContent(line)));
        }
        if (line.startsWith("\\Hide")) {
            nodes[nodes.length - 1].proofhidden = true;
        }
        if (line.startsWith("\\InferByCaseStudy")) {
            nodes[nodes.length - 1].inferByCaseStudy = true;
        }
        else if (line.startsWith("\\UnaryInfC") || line.startsWith("infer{")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
        else if (line.startsWith("\\BinaryInfC") || line.startsWith("infer2{")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
        else if (line.startsWith("\\TrinaryInfC") || line.startsWith("infer3{")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
        else if (line.startsWith("infer4{")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
        else if (line.startsWith("infer5{")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
        console.log("nb of nodes: " + nodes.length);
    }
    if (nodes.length == 0)
        throw "error";
    else if (nodes.length == 1)
        return nodes[0];
    else
        return new Sequence(nodes);
}



async function load(filename) {
    document.getElementById("menu").style.display = "none";
    const response = await fetch(`proofs/${filename}.proof`);
    const text = await response.text();

    const proof = linesToProof(text.split("\n").map((line) => line.trim()));
    document.getElementById("proof").innerHTML = "";
    document.getElementById("proof").appendChild(proof.toDOM());
    showInferThatCanBeProven();
    MathJax.typeset();
}

window.onload = () => {
    document.querySelectorAll("#menu a").forEach(function (a) {
        a.href = `?id=${a.id}`;
    });

    let url = window.location.toString();
    let split = url.split('?');

    if (split.length > 1) {
        let searchParams = new URLSearchParams(split[1]);
        if (searchParams.get("id")) {
            const id = searchParams.get("id");
            console.log("loading " + id)
            load(id);
        }
    }


    //load("bidirectional");
    // load("karp-lipton");
    //    load("dijkstra");


}


