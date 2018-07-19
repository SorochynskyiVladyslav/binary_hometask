import { notify } from "./fight";
export class Fighter {
    constructor(name, health, power) {
        this.name = name;
        this.health = health;
        this.power = power;
    }
    setDamage(damage) {
        this.health -= damage;
        notify(`${this.name} has ${this.health} hp`);
    }
    hitEnemy(enemy, point) {
        enemy.setDamage(point * this.power);
    }
    knockout() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                notify('time is over');
                resolve('success');
            }, 500);
        });
    }
}
export class ImprovedFighter extends Fighter {
    constructor(name, health, power) {
        super(name, health, power);
    }
    hitEnemy(enemy, point) {
        enemy.setDamage(point * this.power * 2);
    }
}
//# sourceMappingURL=fighter.js.map