import World from "./world.js";
import Population from "./population.js";

let popis = new Population(0,10);
popis.draw();

function MoveCarnivores() {
    console.log("step");
    for (let i = 0; i < popis.carnivores.length; i++){
        const carnivore = popis.carnivores[i];
        // carnivore.move([(Math.random()*2-1)*100,(Math.random()*2-1)*100]);
        if (carnivore.y >= 100) {
            carnivore.move([0,-40]);
        }
        if (carnivore.y <= 20) {
            carnivore.move([0, 40]);
        }
        if (carnivore.x >= 100) {
            carnivore.move([-40, 0]);
        }
        if (carnivore.x <= 20) {
            carnivore.move([40, 0]);
        }
    }
    popis.draw();
}

setInterval(MoveCarnivores,1000);
