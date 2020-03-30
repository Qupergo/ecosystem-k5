import World from "./world.js";
import Population from "./population.js";

let popis = new Population(50,50);
popis.draw();

function MoveCarnivores() {
    console.log("step");
    for (let i = 0; i < popis.carnivores.length; i++){
        const carnivore = popis.carnivores[i];
        carnivore.move([(Math.random()*2-1)*30,(Math.random()*2-1)*30]);
        const herbivore = popis.herbivores[i];
        herbivore.move([(Math.random()*2-1)*30,(Math.random()*2-1)*30]);
    }
    popis.draw();
}

setInterval(MoveCarnivores,100);
