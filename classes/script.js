import World from "./world.js";
import Population from "./population.js";

let popis = new Population(0,1);
popis.draw();

function MoveCarnivores() {
    console.log("step");
    for (let i = 0; i < popis.carnivores.length; i++){
        const carnivore = popis.carnivores[i];
        carnivore.move([Math.random()*3,Math.random()*3]);
    }
    popis.draw();
}

setInterval(MoveCarnivores,500);
