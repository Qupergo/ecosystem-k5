import World from "./world.js";
import Population from "./population.js";
import render from "./render.js";
import Creature from "./creatures.js";

let canvas = document.querySelector("#EcosystemCanvas");
canvas.width  = window.innerWidth*0.75;
canvas.height = window.innerHeight*0.75;

let carnivoreCounter = document.querySelector("#carnivoreCounter")
let herbivoreCounter = document.querySelector("#herbivoreCounter")

let popis;
let renderer;

let displayType = "herbivore";

let restartButton = document.querySelector("#restart-button")

let carnivoreButton = document.querySelector("#carnivoreButton")
let herbivoreButton = document.querySelector("#herbivoreButton")


let addCarnivoreButton = document.querySelector("#addCarnivore")
let addHerbivoreButton = document.querySelector("#addHerbivore")

let perceptionDisplay = document.querySelector("#perceptionDisplay");
let sizeDisplay = document.querySelector("#sizeDisplay");
let speedDisplay = document.querySelector("#speedDisplay");
let foodDisplay = document.querySelector("#foodDisplay");
let dangerDisplay = document.querySelector("#dangerDisplay");

let displays = [perceptionDisplay, sizeDisplay, speedDisplay, foodDisplay, dangerDisplay];


function changeDisplayType(event) {
    if (event.target == herbivoreButton) {
        displayType = "herbivore"
        herbivoreButton.style.display = "none"
        carnivoreButton.style.display = "block"
        for (let index = 0; index < displays.length; index++) {
            const display = displays[index];
            display.classList.remove("redBorder")
            display.classList.add("greenBorder") 

        }
    }
    else {
        displayType = "carnivore"
        carnivoreButton.style.display = "none"
        herbivoreButton.style.display = "block"
        for (let index = 0; index < displays.length; index++) {
            const display = displays[index];
            display.classList.remove("greenBorder")
            display.classList.add("redBorder")
        }


    }
    

}
addCarnivoreButton.addEventListener("click", addCarnivores);
addHerbivoreButton.addEventListener("click", addHerbivores);

restartButton.addEventListener("click", makeNewPop);
carnivoreButton.addEventListener("click", changeDisplayType);
herbivoreButton.addEventListener("click", changeDisplayType);


function simulationStep() {
    popis.makeMoves();
    renderer.draw();
    carnivoreCounter.innerHTML = (popis.carnivores.length) + " Carnivores"
    herbivoreCounter.innerHTML = (popis.herbivores.length) + " Herbivores"
    popis.updateStatDisplay(displayType);
}


function makeNewPop() {
    popis = new Population(0, 0, 0.01)
    renderer = new render(canvas,popis);
}

function addCarnivores() {
    for (let index = 0; index < 10; index++) {
        popis.carnivores.push(new Creature("carnivore"))
    }
}

function addHerbivores() {
    for (let index = 0; index < 10; index++) {
        popis.herbivores.push(new Creature("herbivore"))
    }
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

makeNewPop();
setInterval(simulationStep, 1);

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};