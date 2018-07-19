import {Fighter, IFight, ImprovedFighter} from "./fighter";

export interface IFightGame {
    fighter1: IFight;
    fighter2: IFight;
    initializeFight: () => void;
    fight: (points: number []) => void;
}

export function notify (message: string) {
    const messageSection = document.getElementById('messages');
    let messageNode = document.createElement('li');
    messageNode.innerText = message;
    messageSection.appendChild(messageNode);
}

export default class Fight implements IFightGame {

    fighter1: Fighter;
    fighter2: ImprovedFighter;
    points: number[];

    constructor (){
        this.points = [];
        this.initializeFight();
    }


    initializeFight() {
        const fighterName = document.getElementById('fighter-name') as HTMLInputElement;
        const fighterHealth = document.getElementById('fighter-health') as HTMLInputElement;
        const fighterPower = document.getElementById('fighter-power') as HTMLInputElement;
        const iFighterName = document.getElementById('improved-fighter-name') as HTMLInputElement;
        const iFighterHealth = document.getElementById('improved-fighter-health') as HTMLInputElement;
        const iFighterPower = document.getElementById('improved-fighter-power') as HTMLInputElement;
        const startButton = document.getElementById('start-btn') as HTMLButtonElement;

        startButton.addEventListener('click', ()=>{
            this.fighter1 = new Fighter(fighterName.value, Number(fighterHealth.value), Number(fighterPower.value));
            this.fighter2 = new ImprovedFighter(iFighterName.value, Number(iFighterHealth.value), Number(iFighterPower.value));
            this.points = [2, 4, 1, 3, 5];
            this.fight(this.points);
        });



    }

    async fight(points: number[]){
        try {
            for (let i = 0; i < points.length; i++) {
                notify(`===Round ${i + 1}===`);
                this.fighter1.hitEnemy(this.fighter2, points[i]);
                if (this.fighter2.health <= 0) {
                    notify(this.fighter2.name + " has been knocked out");
                    let result = await this.fighter2.knockout();
                    break;
                }
                this.fighter2.hitEnemy(this.fighter1, points[i]);
                if (this.fighter1.health <= 0) {
                    notify(this.fighter1.name + " has been knocked out");
                    let result = await this.fighter1.knockout();
                    break;
                }
            }
            if (this.fighter1.health > 0 && this.fighter2.health > 0) {
                let result = this.fighter1.knockout();
            }
        } catch (err) {
            notify(err);
        }
    }
}