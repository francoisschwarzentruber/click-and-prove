class ProofNode {
    conclusion;
    premisses = [];

    constructor(conclusion) { this.conclusion = conclusion; }
    addPremisse(premisse) { this.premisses.push(premisse); }
}


function extractContent(line) {
    const i = line.indexOf("{");
    const j = line.lastIndexOf("}");
    return dollarToBackSlashParenthesis(line.substr(i + 1, j - i - 1));
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
        throw "error"
    return obj;
}



function textToProof(text) {
    let nodes = [];
    for (const line of text.split("\n").map((line) => line.trim())) {
        console.log(line);
        if (line.startsWith("\\AxiomC")) {
            nodes.push(new ProofNode(extractContent(line)));
        }
        else if (line.startsWith("\\UnaryInfC")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
        if (line.startsWith("\\BinaryInfC")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
        if (line.startsWith("\\TernaryInfC")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
    }
    const node = testExist(nodes.pop())
    console.log(node)
    return node;
}




function proofToDOM(node) {
    const element = document.createElement("proof");

    if (node.premisses.length >= 1) {
        const elementPremisses = document.createElement("proofs");
        for (const child of node.premisses) {
            elementPremisses.appendChild(proofToDOM(child));
        }
        element.appendChild(elementPremisses);
    }

    const elementInfer = document.createElement("infer");
    elementInfer.innerHTML = node.conclusion;
    element.appendChild(elementInfer);
    return element;
}


async function load(filename) {
    const response = await fetch(`proofs/${filename}.tex`);
    const text = await response.text();
    const textProofs = text.split("\\end{prooftree}");
    for (let i = 0; i < textProofs.length - 1; i++) {
        const textProof = textProofs[i];
        const node = textToProof(textProof);

        const button = document.createElement("button");
        button.innerHTML = node.conclusion;
        button.onclick = () => {
            document.getElementById("proof").innerHTML = "";
            document.getElementById("proof").appendChild(proofToDOM(node));
            MathJax.typeset();
        }

        document.getElementById("menu").appendChild(button);
    }

    MathJax.typeset();
}

window.onload = () => {
    //load("bidirectional");
    load("sqrt2irrationnal");

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



