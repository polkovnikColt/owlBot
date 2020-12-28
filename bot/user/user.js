const Owl = require('../owl/owl');

module.exports.User = class {

    constructor(name, hunger = 10, hp = 10,
                money = 0, med = 0, food = 0, superFood = 0) {
        this.owl = new Owl.Owl(name, hunger, hp);
        this.medicine = med;
        this.food = food;
        this.superFood = superFood;
        this.money = money;
    }

    earnMoney = (quant) => {
        this.money += quant;
    }

    earnMedicine = (quant) => {
        this.medicine += quant;
    }

    earnFood = (quant) => {
        this.food += quant;
    }

    print = () => {
        return this.owl.print() + "\n"
            + "Мышки🐁: " + this.money + "\n"
            + "Пилюли💊: " + this.medicine + "\n"
            + "Чизбургеры🍔: " + this.food + "\n"
            + "Питса🍕: " + this.superFood + "\n";
    }

    getUserData = () => {
        return {
            name: this.owl.name, hunger: this.owl.hunger, health: this.owl.healthPoint,
            money: this.money, medicine: this.medicine, food: this.food, superFood: this.superFood
        }
    }

}