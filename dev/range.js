import {
    validateCoordinates,
    addClassElement,
    deleteClassElement,
    setSizeControl,
    validateHeight
} from './functions';


export function Range(data) {
    this.data = data;
    this.value = 0;
    this.init();
}

Range.prototype.init = function () {
    this.createRange();
    this.addEvents();
    if (this.data.startValue) {
        this.showValue(this.data.startValue);
    } else {
        this.showValue(0);
    }
};

Range.prototype.createRange = function () {
    this.bobbleRangeControl = document.createElement('div');
    this.bobbleRangeControl.classList.add('bubble-range__control');
    this.bobbleRangeControl.style.width = setSizeControl(this.data.size, this.data.startValue) + 'px';
    this.bobbleRangeControl.style.height = setSizeControl(this.data.size, this.data.startValue) + 'px';
    this.bobbleRangeControl.style.backgroundColor = this.data.backgroundColorControl;
    this.data.parent.appendChild(this.bobbleRangeControl);
    if (this.data.icon) {
        this.addIcon();
    }
    if (this.data.description) {
        this.addDescription();
    }
};


Range.prototype.addIcon = function () {
    this.icon = document.createElement('div');
    this.icon.classList.add('icon');
    this.data.parent.appendChild(this.icon);
};

Range.prototype.changeIconSize = function (current) {
    var dataScale = 1 + (current * 0.2 / 100);
    this.icon.style.transform = 'scale(' +  dataScale + ')';
};

Range.prototype.addDescription = function () {
    var description = document.createElement('div');
    description.classList.add('bubble-range__description');
    description.innerHTML = this.data.description;
    this.data.parent.appendChild(description);

};

Range.prototype.addEvents = function () {
    var heightElement = setSizeControl(this.data.size),
        startPoint = 0,
        isDown = false,
        self = this,
        differentOpacity = 1 - this.data.opacity;

    function mouseDown(event) {
        if (validateCoordinates(event.clientX, event.clientY, self.bobbleRangeControl)) {
            addClassElement(this.bobbleRangeControl, 'bubble-range__control--active');
            addClassElement(this.bobbleRangeControl.parentNode, 'bubble-range--active');
            isDown = true;
        }
    }

    function mouseUpLeave() {
        deleteClassElement(this.bobbleRangeControl, 'bubble-range__control--active');
        deleteClassElement(this.bobbleRangeControl.parentNode, 'bubble-range--active');
        isDown = false;
    }

    function mouseMove(event) {
        if (isDown) {
            if (!startPoint) {
                startPoint = event.clientY;
            }
            if (startPoint >= event.clientY) {
                var currentHeight = startPoint - event.clientY + heightElement;
                if (validateHeight(currentHeight, this.data.size, this.data.indent)) {
                    self.setProperties(currentHeight, differentOpacity);
                }
            }
        }
    }

    function touchMove(event) {
        event.preventDefault();
        if (!startPoint) {
            startPoint = event.targetTouches[0].pageY;
        }
        if (startPoint >= event.targetTouches[0].pageY) {
            var currentHeight = startPoint - event.targetTouches[0].pageY + heightElement;
            if (validateHeight(currentHeight, this.data.size, this.data.indent)) {
                self.setProperties(currentHeight, differentOpacity);
            }
        }
    }

    this.data.parent.addEventListener('mousedown', mouseDown.bind(this));
    this.data.parent.addEventListener('mouseup', mouseUpLeave.bind(this));
    this.data.parent.addEventListener('mousemove', mouseMove.bind(this));
    this.data.parent.addEventListener('mouseleave', mouseUpLeave.bind(this));
    // mobile
    this.bobbleRangeControl.addEventListener('touchmove', touchMove.bind(this));
};

Range.prototype.setProperties = function (currentHeight, differentOpacity) {
    this.bobbleRangeControl.style.width = currentHeight + 'px';
    this.bobbleRangeControl.style.height = currentHeight + 'px';
    this.changeIconSize(currentHeight);
    this.changeOpacity(this.showRangeValue(Number(currentHeight)), differentOpacity);
    this.showRangeValue(currentHeight);
    this.value = this.showRangeValue(Number(currentHeight));
    this.showValue(this.value);
};

Range.prototype.showRangeValue = function (currentSize) {
    return (currentSize - setSizeControl(this.data.size)) * 100 / (this.data.size - setSizeControl(this.data.size) - this.data.indent);
};

Range.prototype.changeOpacity = function (currentValue, differentOpacity) {
    var opacityValue = differentOpacity * currentValue / 100;
    this.data.parent.style.opacity = this.data.opacity + opacityValue + '';
};

Range.prototype.showValue = function (value) {
    if (!this.wrapperValue) {
        this.wrapperValue = document.querySelector(this.data.wrapperValue);
    }
    if (this.wrapperValue) {
        this.wrapperValue.innerHTML = Math.round(value) + '%';
    }
};
