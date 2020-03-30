import World from "./world.js";
import Population from "./population.js";

let popis = new Population(5,5);
popis.draw();

// function MoveCarnivores() {
//     console.log("step");
//     for (let i = 0; i < popis.carnivores.length; i++){
//         const carnivore = popis.carnivores[i];
//         carnivore.move([(Math.random()*2-1)*30,(Math.random()*2-1)*30]);
//         const herbivore = popis.herbivores[i];
//         herbivore.move([(Math.random()*2-1)*30,(Math.random()*2-1)*30]);
//     }
//     popis.draw();
// }


function doStuff() {
    popis.makeMoves().call(this);
    popis.draw()
}

setInterval(doStuff, 100);

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