export default class Population {
    constructor (herbivoreAmount, carnivoreAmount) {
        this.herbivoreAmount = herbivoreAmount;
        this.carnivoreAmount = carnivoreAmount;
        //Create herbivores
        this.herbivores = [];
        for (let index = 0; index < herbivoreAmount; index++) {
            //Create new herbivore
            let herbivore = new Herbivore();
            this.herbivores.push(herbivore);
        }
        //Create carnivores
        this.carnivores = [];
        for (let index = 0; index < carnivoreAmount; index++) {
            //Create new carnivore
            carnivore = new Carnivore();
            this.carnivores.push(herbivore);
        }
        
    }

    makeMoves() {
        for (let index = 0; index < this.carnivores.length; index++) {
            const creature = this.carnivores[index];
            creature.move() 
            
        }

        for (let index = 0; index < this.herbivores.length; index++) {
            const creature = this.herbivores[index];
            creature.move()
            
        }

        this.draw();
    }
    

    draw() { 
        ctx.clearRect(0,0,canvas.width,canvas.height);

        //Draw herbivores as spot
        for (let herbivore in this.herbivores){
            ctx.beginPath();
            ctx.arc(herbivore.fixed,herbivore.y,herbivore.size,0,2*Math.PI);
            ctx.fillStyle = herbivore.color;
            ctx.fill();
            
        }

        //Draw carnivores
        for (let carnivore in this.carnivores){
            ctx.beginPath();
            ctx.arc(carnivore.fixed,carnivore.y,carnivore.size,0,2*Math.PI);
            ctx.fillStyle = carnivore.color;
            ctx.fill();
            ctx.moveTo(carnivore.x,carnivore.y);
            for (let part in carnivore.parts){
                ctx.lineTo(part[0],part[1]);
            }
            ctx.stroke();

                
        }

    }
}