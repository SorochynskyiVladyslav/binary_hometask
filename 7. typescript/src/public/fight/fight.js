var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Fighter, ImprovedFighter } from "./fighter";
export function notify(message) {
    const messageSection = document.getElementById('messages');
    let messageNode = document.createElement('li');
    messageNode.innerText = message;
    messageSection.appendChild(messageNode);
}
export default class Fight {
    constructor() {
        this.points = [];
        this.initializeFight();
    }
    initializeFight() {
        const fighterName = document.getElementById('fighter-name');
        const fighterHealth = document.getElementById('fighter-health');
        const fighterPower = document.getElementById('fighter-power');
        const iFighterName = document.getElementById('improved-fighter-name');
        const iFighterHealth = document.getElementById('improved-fighter-health');
        const iFighterPower = document.getElementById('improved-fighter-power');
        const startButton = document.getElementById('start-btn');
        startButton.addEventListener('click', () => {
            this.fighter1 = new Fighter(fighterName.value, Number(fighterHealth.value), Number(fighterPower.value));
            this.fighter2 = new ImprovedFighter(iFighterName.value, Number(iFighterHealth.value), Number(iFighterPower.value));
            this.points = [2, 4, 1, 3, 5];
            this.fight(this.points);
        });
    }
    fight(points) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < points.length; i++) {
                    notify(`===Round ${i + 1}===`);
                    this.fighter1.hitEnemy(this.fighter2, points[i]);
                    if (this.fighter2.health <= 0) {
                        notify(this.fighter2.name + " has been knocked out");
                        let result = yield this.fighter2.knockout();
                        break;
                    }
                    this.fighter2.hitEnemy(this.fighter1, points[i]);
                    if (this.fighter1.health <= 0) {
                        notify(this.fighter1.name + " has been knocked out");
                        let result = yield this.fighter1.knockout();
                        break;
                    }
                }
                if (this.fighter1.health > 0 && this.fighter2.health > 0) {
                    let result = this.fighter1.knockout();
                }
            }
            catch (err) {
                notify(err);
            }
        });
    }
}
//# sourceMappingURL=fight.js.map