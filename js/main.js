let domElements = {};



class ProofNode {
    content;
    premisses = [];
    info = undefined;
    proofhidden = false;
    constructor(content) { this.content = content; }
    addPremisse(premisse) { this.premisses.unshift(premisse); }

    setInfo(info) { this.info = info; }

    toDOM() {
        const element = document.createElement("proof");
        const elementInfer = document.createElement("infer");
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
                elementInfer.onclick = toggle;
                elementNext.onclick = toggle;
            }
        }


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
        return element;
    }




}





class Assumption {
    constructor(content) { this.content = content; }

    toDOM() {
        const element = document.createElement("assumption");
        element.innerHTML = this.content;

        domElements[this.conclusion] = element;

        if (this.label)
            domElements[this.label] = element;


        return element;
    }





}




class Case {
    constructor(content) { this.content = content; }

    toDOM() {
        const element = document.createElement("case");
        element.innerHTML = this.content;

        domElements[this.conclusion] = element;

        if (this.label)
            domElements[this.label] = element;


        return element;
    }
}


class AlreadyProvenFact {
    constructor(content) { this.content = content; }

    toDOM() {
        const element = document.createElement("alreadyprovenfact");
        element.innerHTML = this.content;

        element.onclick = () => {
            const fact = domElements[this.content];
            if (fact)
                fact.classList.add("shake");
            setTimeout(() => fact.classList.remove("shake"), 1000);
        }
        return element;
    }
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


