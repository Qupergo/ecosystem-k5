import Creature from "./creatures.js";
import Food from "./food.js";

const canvas = document.querySelector("#EcosystemCanvas");
let ctx = canvas.getContext("2d");

export default class Population {
    constructor(herbivoreAmount, carnivoreAmount, foodSpawnFrequency) {
        this.herbivoreAmount = herbivoreAmount;
        this.carnivoreAmount = carnivoreAmount;
        this.foodSpawnFrequency = foodSpawnFrequency;

        this.maxFood = herbivoreAmount*4;
        this.food = [];
        for (let index = 0; index < this.maxFood; index++) {
            this.food.push(new Food())
        }

        //Create herbivores
        this.herbivores = [];
        for (let index = 0; index < herbivoreAmount; index++) {
            //Create new herbivore
            let herbivore = new Creature("herbivore");
            this.herbivores.push(herbivore);
        }
        
        //Create carnivores
        this.carnivores = [];
        for (let index = 0; index < carnivoreAmount; index++) {
            //Create new carnivore
            let carnivore = new Creature("carnivore");
            let rand = Math.random();
            carnivore.parts = [
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50],
                [carnivore.x - rand * 50, carnivore.y - rand * 50]
            ];
            this.carnivores.push(carnivore);
        }
    }

    makeMoves() {
        //Herbivores
        for (let index = 0; index < this.herbivores.length; index++) {
            const creature = this.herbivores[index];
            let detectedDanger = false;

            //Find threats
            if (creature.energy/creature.maxEnergy > creature.dangerThreshold) {
                let predator_distances = this.getDistanceList(creature,this.carnivores);
                if (predator_distances.length >  0) {
                    creature.directionVector= this.getDirectionVector(creature, predator_distances[0][1], false);
                    detectedDanger = true;
                }
            }

            //Find mates
            if (creature.energy/creature.maxEnergy > creature.foodThreshold && !detectedDanger && creature.maturationPeriod <= 0) {
                creature.lookingForMate = true;
                let mate_distances = this.getDistanceList(creature,this.herbivores);
                for (let i = 0; i < mate_distances.length; i++) {
                    //Check if given consent
                    if (mate_distances[i][1].lookingForMate) {
                        creature.directionVector= this.getDirectionVector(creature, mate_distances[i][1]);
                        //Check if collision
                        if (this.checkCollision(creature, mate_distances[i][1])) {
                            let children = creature.crossover(mate_distances[i][1]);

                            for (let index = 0; index < children.length; index++) {
                                this.herbivores.push(children[index]);
                            }

                            creature.energy -= 70;
                            mate_distances[i][1].energy -= 70;

                            creature.lookingForMate = false;
                            mate_distances[i][1].lookingForMate = false;
                            break;
                        }
                    }
                }
            }

            else {
                creature.lookingForMate = false;
            }

            //Find food
            if (!creature.lookingForMate && !detectedDanger) {
                let food_distances = this.getDistanceList(creature,this.food);
                if (food_distances.length > 0) {
                    creature.directionVector= this.getDirectionVector(creature,food_distances[0][1]);
                    if (this.checkCollision(creature, food_distances[0][1])) {
                        creature.energy = Math.min(creature.energy + food_distances[0][1].givenEnergy, creature.maxEnergy);
                        this.food.remove(food_distances[0][1]);
                    }
                }
            }

            creature.move(creature.directionVector, creature.speed);
            creature.energy -= creature.energyPerMove;
            creature.age += 1;
            creature.maturationPeriod -= 1;

            if (creature.energy <= 0) {
                this.herbivores.remove(creature);
            }

            if (creature.age > 1000) {
                this.herbivores.remove(creature);
            }
        }

        //Carnivores
        for (let index = 0; index < this.carnivores.length; index++) {
            const creature = this.carnivores[index];
            let potentialMates = false;
            if (creature.energy/creature.maxEnergy > creature.foodThreshold){
                let carnivore_distances = this.getDistanceList(creature,this.carnivores);
                if (carnivore_distances.length >  0) {
                    creature.directionVector= this.getDirectionVector(creature, carnivore_distances[0][1]);
                    potentialMates = true;
                }
            }

            if (creature.energy/creature.maxEnergy > creature.foodThreshold) {
                creature.lookingForMate = true;
                let mate_distances = this.getDistanceList(creature,this.carnivores);
                for (let i = 0; i < mate_distances; i++) {
                    if (mate_distances[i][1].lookingForMate) {
                        creature.directionVector= this.getDirectionVector(creature, mate_distances[i][1]);
                        if (this.checkCollision(creature,mate_distances[i][1])) {
                            let children = creature.crossover(mate_distances[i][1]);
                            
                            for (let index = 0; index < children.length; index++) {
                                this.carnivores.push(children[index]);
                            }

                            creature.energy -= creature.maxEnergy/2;
                            mate_distances[i][1].energy -= mate_distances[i][1].maxEnergy/2;
                            creature.lookingForMate = false;
                            mate_distances[i][1].lookingForMate = false;
                            break;
                        }
                    }
                }
            }
            else {
                creature.lookingForMate = false;
            }
            creature.move(creature.directionVector, creature.speed);
            creature.energy -= 0.1;

        }
        for (let index = this.food.length; index < this.maxFood; index++) {
            if (Math.random() < this.foodSpawnFrequency) {
                this.food.push(new Food())
            }

        }
    }

    
    getDirectionVector(creature, other_object, moveTowards=true) {
        let x_dist = creature.x - other_object.x;
        let y_dist = creature.y - other_object.y;
        let hypotenuse = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
        
        let directionVector= [0, 0];
        if (moveTowards) {
            directionVector= [-x_dist / hypotenuse, -y_dist / hypotenuse];
        }
        else {
            directionVector= [x_dist / hypotenuse, y_dist / hypotenuse]
        }
        if (isNaN(directionVector[0])){
            console.log("Directionvector is NaN:");
            console.log(creature);
            console.log(other_object);
            console.log(x_dist);
            console.log(y_dist);
            console.log(hypotenuse);
        }
        return directionVector;
    }

    getDistanceList(creature, other_objects) {
        let distances = [];
        for (let i = 0; i < other_objects.length; i++){
            let x_dist = creature.x - other_objects[i].x;
            let y_dist = creature.y - other_objects[i].y;
            let hypotenuse = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
            //Checks if creature can see the other creature and that the distance is not 0
            if (hypotenuse < creature.perceptionFieldDistance && creature != other_objects[i]) {
                distances.push([hypotenuse,other_objects[i]]);
            }
        }
        if (distances.length > 1) {
            distances.sort(compare);
        }
        return distances;
    }

    checkCollision(creature, other_object){
        let x_dist = creature.x - other_object.x;
        let y_dist = creature.y - other_object.y;
        let hypotenuse = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
        if (hypotenuse < (other_object.size/2+creature.size/2)) {
            
            return true;
        }
        else {
            return false;
        }
    }

    findHerbivoreAverages() {

        let sum = 0
        for (let index = 0; index < this.herbivores.length; index++) {
            const herbivore = this.herbivores[index];
            sum += herbivore.perceptionFieldDistance;
        }

        let perceptionAvg = Math.round(sum/this.herbivores.length*100)/100

        sum = 0
        for (let index = 0; index < this.herbivores.length; index++) {
            const herbivore = this.herbivores[index];
            sum += herbivore.size;
        }

        let sizeAvg = Math.round(sum/this.herbivores.length*100)/100

        sum = 0
        for (let index = 0; index < this.herbivores.length; index++) {
            const herbivore = this.herbivores[index];
            sum += herbivore.speed;
        }

        let speedAvg = Math.round(sum/this.herbivores.length*100)/100

        sum = 0
        for (let index = 0; index < this.herbivores.length; index++) {
            const herbivore = this.herbivores[index];
            sum += herbivore.foodThreshold;
        }

        let foodAvg = Math.round(sum/this.herbivores.length*100)/100

        sum = 0
        for (let index = 0; index < this.herbivores.length; index++) {
            const herbivore = this.herbivores[index];
            sum += herbivore.dangerThreshold;
        }

        let dangerAvg = Math.round(sum/this.herbivores.length*100)/100
        
        return [perceptionAvg, sizeAvg, speedAvg, foodAvg, dangerAvg]
    }

    updateStatDisplay() {

        let defaultCreature = new Creature("Herbivore");

        let averages = this.findHerbivoreAverages();
        let perceptionDisplay = document.querySelector("#perceptionDisplay");
        perceptionDisplay.innerHTML = "Perception field average: " + averages[0];
        perceptionDisplay.style.width = (averages[0]/defaultCreature.maxPerceptionFieldDistance * 100) + "%";


        let sizeDisplay = document.querySelector("#sizeDisplay");
        sizeDisplay.innerHTML = "Size Field Average: " + averages[1];
        sizeDisplay.style.width = (averages[1]/defaultCreature.maxSize * 100) + "%";


        let speedDisplay = document.querySelector("#speedDisplay");
        speedDisplay.innerHTML = "Speed Average: " + averages[2];
        speedDisplay.style.width = (averages[2]/defaultCreature.maxSpeed * 100) + "%";


        let foodDisplay = document.querySelector("#foodDisplay");
        foodDisplay.innerHTML = "Food Threshold Average: " + averages[3];
        foodDisplay.style.width = (averages[3]/defaultCreature.maxFoodThreshold * 100) + "%";


        let dangerDisplay = document.querySelector("#dangerDisplay");
        dangerDisplay.innerHTML = "Danger Threshold Average: " + averages[4];
        dangerDisplay.style.width = (averages[4]/defaultCreature.maxDangerThreshold * 100) + "%";

    }
}





function compare(x,y){
    if (x[0] === y[0]) {
        return 0;
    }
    else {
        return (x[0] < y[0]) ? -1 : 1;
    }
}