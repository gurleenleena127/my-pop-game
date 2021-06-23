/* eslint-disable @lwc/lwc/no-leading-uppercase-api-name */
import { LightningElement, api, track } from 'lwc';

export default class PopGame extends LightningElement {
    Shape = 'Circle';
    GridSize = 5;
    @track popGameShapeList = [];
    renderComplete = false;
    popCounter = 0;
    _popped = 0;
    showOverlay = true;

    generateRandomColor() {
        return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)} )`;
    }
    get allPopped() {
        if (this._popped === this.popGameShapeList.length) {
            
            this.template.querySelectorAll('.game-play div').forEach(gamePlayObj => {
                gamePlayObj.classList.remove('enableShape');
            });
            this.showOverlay = true;
        }
        return this._popped === this.popGameShapeList.length;
    }
    set allPopped(value){
        this._popped = value;
    }
    
    handleNewGame() {
        this.showOverlay = false;
        this.popCounter = 0;
        this._popped = 0;
        this.popGameShapeList = [];
        this.resetGameShapes();
        this.template.querySelectorAll('.game-play div').forEach(gamePlayObj => {
            gamePlayObj.classList.add('enableShape');
        });

    }
    handleClickedShape(event) {
        this._popped++;
        let selectedObj = this.popGameShapeList.find(popGameObj => popGameObj.id === event.target.dataset.clickedId);
        selectedObj.showPopMessage = true;
        selectedObj.popColor = `color : ${selectedObj.color};font-size:2em;font-weight: bolder;`;
    }
    resetGameShapes() {
        for (let i = 0; i < this.GridSize; i++) {
            for (let j = 0; j < this.GridSize; j++) {
                this.popGameShapeList.push({ id: `${i} : ${j}`, color: this.generateRandomColor(), showPopMessage: false });
            }
        }
    }
    renderedCallback() {
        if (!this.renderComplete) {
            alert('Inside Game' + this.Shape);
            this.renderComplete = true;
            this.resetGameShapes();
        }
    }
}