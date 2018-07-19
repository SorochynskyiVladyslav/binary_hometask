import {notify} from "./fight";

export interface IFight {
    name: string;
    health: number;
    setDamage: (damage: number) => void;
    hitEnemy: (enemy: Fighter, point: number) => void;
    knockout: () => Promise<string>;
}

export class Fighter implements IFight {
    public readonly name: string;
    public health: number;
    protected power: number;

    constructor(name: string, health: number, power: number){
        this.name = name;
        this.health = health;
        this.power = power;
    }

    setDamage(damage: number): void {
        this.health -= damage;
        notify(`${this.name} has ${this.health} hp`);
    }

    hitEnemy(enemy: Fighter, point: number) {
        enemy.setDamage(point * this.power);
    }

    knockout() {
        return new Promise<string> ((resolve, reject) => {
            setTimeout(()=>{
                notify('time is over');
                resolve('success');
            }, 500);
        })
    }
}

export class ImprovedFighter extends Fighter implements IFight {
    constructor(name: string, health: number, power: number){
        super(name, health, power);
    }

    hitEnemy(enemy: Fighter, point: number) {
        enemy.setDamage(point * this.power * 2);
    }
}