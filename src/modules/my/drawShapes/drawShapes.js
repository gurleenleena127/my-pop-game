import { LightningElement, api } from 'lwc';

export default class DrawShapes extends LightningElement {
    @api surface = 'Circle';
 @api color = 'white';
    get backgroundColor() {
        return `background: ${this.color};`;
    }
}