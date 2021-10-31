class ProofNode {
    conclusion;
    premisses = [];

    constructor(conclusion) { this.conclusion = conclusion; }
    addPremisse(premisse) { this.premisses.push(premisse); }

    toDOM() {
        const element = document.createElement("proof");

        if (this.premisses.length >= 1) {
            const elementPremisses = document.createElement("proofs");
            for (const child of this.premisses) {
                elementPremisses.appendChild(child.toDOM());
            }
            element.appendChild(elementPremisses);
        }

        const elementInfer = document.createElement("infer");
        elementInfer.innerHTML = this.conclusion;
        element.appendChild(elementInfer);
        return element;
    }
}


class Assumption {
    constructor(assumption) { this.assumption = assumption; }

    toDOM() {
        const element = document.createElement("assumption");
        element.innerHTML = this.assumption;
        return element;
    }
}


class Sequence {
    content = [];
    addContent(content) { this.content.push(...content); }

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
        if (line.startsWith("\\Assume")) {
            nodes.push(new Assumption(extractContent(line)));
        }
        else if (line.startsWith("\\UnaryInfC")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
        else if (line.startsWith("\\BinaryInfC")) {
            const node = new ProofNode(extractContent(line));
            node.addPremisse(testExist(nodes.pop()));
            node.addPremisse(testExist(nodes.pop()));
            nodes.push(node);
        }
        else if (line.startsWith("\\TrinaryInfC")) {
            const node = new ProofNode(extractContent(line));
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
    const response = await fetch(`proofs/${filename}.proof`);
    const text = await response.text();

    const proof = linesToProof(text.split("\n").map((line) => line.trim()));
    document.getElementById("proof").appendChild(proof.toDOM());
    MathJax.typeset();
}

window.onload = () => {
    //load("bidirectional");
    load("sqrt2irrationnal");
    // load("karp-lipton");


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



