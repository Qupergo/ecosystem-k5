import World from "./world.js";
import Population from "./population.js";
import render from "./render.js";

let canvas = document.querySelector("#EcosystemCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let carnivoreCounter = document.querySelector("#carnivoreCounter")
let herbivoreCounter = document.querySelector("#herbivoreCounter")

let popis = new Population(400,0,0.01);

let renderer = new render(canvas,popis);

let displayType = "herbivore";


renderer.draw();

let carnivoreButton = document.querySelector("#carnivoreButton")
let herbivoreButton = document.querySelector("#herbivoreButton")



function changeDisplayType(event) {
    if (event.target == herbivoreButton) {
        displayType = "herbivore"
    }
    else {
        displayType = "carnivore"
    }
    

}

carnivoreButton.addEventListener("click", changeDisplayType);
herbivoreButton.addEventListener("click", changeDisplayType);

function doStuff() {
    popis.makeMoves();
    renderer.draw();
    carnivoreCounter.innerHTML = (popis.carnivores.length) + " Carnivores"
    herbivoreCounter.innerHTML = (popis.herbivores.length) + " Herbivores"
    popis.updateStatDisplay(displayType);
}

setInterval(doStuff, 1);

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