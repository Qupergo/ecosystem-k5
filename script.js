class Creature {
    Creature(energy, foodType, maxEnergy, currentEnergy, perceptionFieldDistance, speed, size) {
        this.energy = energy;
        this.foodType = foodType;
        this.maxEnergy = maxEnergy;
        this.currentEnergy = currentEnergy;
        this.perceptionFieldDistance = perceptionFieldDistance;
        this.speed = speed;
        this.size = size;
    }
}

class Herbivore {
    Herbivore(parts) {
        Creature.call(this, energy, foodType, maxEnergy, currrentEnergy, perceptionFieldDistance, speed, size);

        this.parts = parts
    }

    move(directionVector) {
        //Insert a copy of the head at position 1
        parts.splice(1, 0, [parts[0][0], parts[0][1]])

        //Move head forward
        parts[0][0] += directionVector[0];
        parts[0][1] += directionVector[1];

        //Remove end of tail
        parts.pop()


    }
}

class Carnivore {
    Carnviore() {
        Creature.call(this, energy, foodType, maxEnergy, currrentEnergy, perceptionFieldDistance, speed, size);
    }


}

function prepareSimulation() {

}

function runSimulation(creatures) {

}

function draw() {

}

