import {
    validateBubble,
    initValidateBubble
} from './functions';
import {Range} from './range'


export function BubbleRange(dataRange) {
    this.dataRange = dataRange;
    initValidateBubble(this.dataRange, validateBubble);
    this.size = this.dataRange.size.split('px')[0];
    this.init();
    dataRange.parent = this.bubble;
    dataRange.size = this.size;
    // create range
    return new Range(dataRange);
}

BubbleRange.prototype.init = function () {
    var container = document.querySelector(this.dataRange.wrapper);
    this.bubble = document.createElement('div');
    this.bubble.classList.add('bubble-range');
    this.bubble.style.width = this.dataRange.size;
    this.bubble.style.height = this.dataRange.size;
    this.bubble.style.backgroundColor = this.dataRange.backgroundColorBubble;
    this.bubble.style.opacity = this.dataRange.opacity;
    container.appendChild(this.bubble);
};
