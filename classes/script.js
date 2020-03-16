import World from "./world"
import Population from "./population";


const canvas = document.querySelector("#EcosystemCanvas");
let ctx = canvas.getContext("2d");


let popis = new Population(10,10);
popis.draw();