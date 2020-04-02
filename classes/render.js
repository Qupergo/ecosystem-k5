export default class render {
    constructor (canvas, population) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.population = population;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#364958";
        this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fill();

        //Draw herbivores as spot
        for (let i = 0; i < this.population.herbivores.length; i++) {
            const herbivore = this.population.herbivores[i];
            //Draw perceptionfield
            this.ctx.beginPath();
            this.ctx.arc(herbivore.x,herbivore.y,herbivore.perceptionFieldDistance,0,Math.PI*2);
            this.ctx.fillStyle = "rgba(201,228,202,0.01)";
            this.ctx.fill();
            this.ctx.closePath();
            //Draw head
            this.ctx.beginPath();
            this.ctx.arc(herbivore.x, herbivore.y, herbivore.size, 0, 2 * Math.PI);
            this.ctx.fillStyle = herbivore.color;
            this.ctx.fill();
            this.ctx.strokeStyle = "hsl(0,0%," + ((herbivore.energy/herbivore.maxEnergy)*100) + "%)";
            this.ctx.lineWidth = 5;
            this.ctx.closePath();
            this.ctx.stroke();

        }

        //Draw carnivores
        for (let i = 0; i < this.population.carnivores.length; i++) {
            const carnivore = this.population.carnivores[i];
            //Draw perceptionfield
            this.ctx.beginPath();
            this.ctx.arc(carnivore.x,carnivore.y,carnivore.perceptionFieldDistance,0,Math.PI*2);
            this.ctx.fillStyle = "rgba(201,228,202,0.01)";
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.beginPath();
            //Draw head
            this.ctx.arc(carnivore.x, carnivore.y, carnivore.size, 0, 2 * Math.PI);
            this.ctx.fillStyle = carnivore.color;
            this.ctx.strokeStyle = carnivore.color;
            this.ctx.lineWidth = carnivore.size;
            this.ctx.fill();
            this.ctx.closePath();
            //Draw body


            //Find Midpoints
            this.ctx.fillStyle = "red";
            let midparts = [];
            for (let h = 0; h < carnivore.parts.length - 1; h++) {
                const part = carnivore.parts[h];
                const nextPart = carnivore.parts[h + 1];
                let mid = {
                    x: (part[0] + nextPart[0]) / 2,
                    y: (part[1] + nextPart[1]) / 2
                }
                midparts.push(mid);
            }
            // Find midpoint of head and last part
            let mid = {
                x: carnivore.x,
                y: carnivore.y
            }
            midparts.push(mid);
            //Draw quadratic curves between midpoints using the parts as controlpoints
            this.ctx.moveTo(carnivore.parts[0][0], carnivore.parts[0][1]);
            this.ctx.lineTo(midparts[0].x, midparts[0].y);
            for (let h = 0; h < carnivore.parts.length - 1; h++) {
                const nextPart = carnivore.parts[h + 1];
                this.ctx.quadraticCurveTo(nextPart[0], nextPart[1], midparts[h + 1].x, midparts[h + 1].y);
            }
            this.ctx.quadraticCurveTo(carnivore.parts[carnivore.parts.length - 1][0], carnivore.parts[carnivore.parts.length - 1][1], carnivore.x, carnivore.y);
            // this.ctx.lineTo(carnivore.x, carnivore.y);
            this.ctx.stroke();
            this.ctx.closePath();
        }

        //Draw Food
        for (let i = 0; i < this.population.food.length; i++){
            const currentFood = this.population.food[i]
            this.ctx.fillStyle = "brown";
            this.ctx.beginPath();
            this.ctx.arc(currentFood.x, currentFood.y, currentFood.givenEnergy/5+5, 0, 2 * Math.PI);
            this.ctx.closePath()
            this.ctx.fill();
        }
        
        
    }

}