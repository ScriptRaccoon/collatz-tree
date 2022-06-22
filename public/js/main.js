const mainElement = document.querySelector("main");
const depthInput = document.querySelector("input[type=number]");
const checkbox = document.querySelector("input[type=checkbox]");
let currentDepth;

function init() {
    currentDepth = depthInput.valueAsNumber;
    if (currentDepth >= 0) {
        mainElement.innerHTML = "";
        createTree(1, mainElement, currentDepth);
    }
}

depthInput.addEventListener("change", init);
checkbox.addEventListener("change", toggleDOM);

init();

// computes the list of all m > 1 such that collatz(m) = n
function collatzInverse(n) {
    const list = [2 * n];
    const m = (n - 1) / 3;
    if (m == parseInt(m) && m % 2 == 1 && m > 1) list.push(m);
    return list;
}

// this needs to be corrected somehow...
function addNode(number, parent) {
    // create the node
    const node = document.createElement("div");
    node.className = "node";
    if (number == 1) node.classList.add("first");
    // create its content
    const nodeContent = document.createElement("div");
    const nodeNumber = document.createElement("span");
    nodeContent.className = "content";
    nodeNumber.innerText = number;
    nodeContent.appendChild(nodeNumber);
    node.appendChild(nodeContent);
    // append the node to the parent
    parent.appendChild(node);
    // return the child
    return node;
}

// recursively add children nodes
function createTree(number, parent, depth) {
    const node = addNode(number, parent);
    if (depth > 0) {
        // generate a container for the children
        const childrenContainer = document.createElement("div");
        childrenContainer.className = "childrenContainer";
        node.appendChild(childrenContainer);
        // // loop through all numbers which map to the number
        for (const next of collatzInverse(number)) {
            // const node = addNode(next, childrenContainer);
            createTree(next, childrenContainer, depth - 1);
        }
    } else {
        node.classList.add("leaf");
    }
}

function toggleDOM() {
    if (checkbox.checked) {
        mainElement.classList.add("showDOM");
    } else {
        mainElement.classList.remove("showDOM");
    }
}
