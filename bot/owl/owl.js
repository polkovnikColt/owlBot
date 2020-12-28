module.exports.Owl = class {

    constructor(name, hunger = 10, hp = 10) {
        this.name = name;
        this.hunger = hunger;
        this.healthPoint = hp;
    }

    feed = (hg) => {
        if (this.hunger >= 10) {
            return this.hunger;
        }
        this.hunger += hg
        return this.hunger;
    }

    getHungry = () => {
        if (this.hunger === 0) {
            return this.hunger;
        }
        return (this.hunger -= 1);
    }

    heal = (hp) => {
        if (this.healthPoint >= 10) {
            return this.healthPoint;
        }
        return (this.healthPoint += hp);
    }

    print = () => {
        return "Имя: " + this.name + "\n"
               +"Здоровье: " + this.healthPoint + "\n"
               +"Сытость: " + this.hunger + "\n"

    }
}
