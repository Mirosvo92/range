export var validateBubble = {
    size: function (data) {
        if ( !data.size || data.size < 150 || data.size > 500) {
            data.size = '400px';
        }
    },
    backgroundColor: function (data) {
        if ( !data.backgroundColorBubble) {
            data.backgroundColorBubble = '#4314FF';
        }
    },
    backgroundColorControl: function (data) {
        if ( !data.backgroundColorControl) {
            data.backgroundColorControl = '#C75C84';
        }
    },
    indent: function (data) {
        if ( !data.indent) {
            data.indent = 10;
        }
    },
    opacity: function (data) {
        if ( !data.opacity) {
            data.opacity = 0.9;
        }
    }
};

export function validateCoordinates(xData, yData, element) {
    var currentCoordinates = element.getBoundingClientRect();
    if (xData >= currentCoordinates.x && yData >= currentCoordinates.y) {
        return true;
    }
}

export function initValidateBubble(data, obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            obj[prop](data);
        }
    }
}

export  function addClassElement(element, name) {
    element.classList.add(name);
}

export function deleteClassElement(element, name) {
    element.classList.remove(name);
}

export function setSizeControl (size, startValue) {
    if (startValue) {
        return size * parseInt(startValue) / 100
    } else {
        return size * 20 / 100;
    }
}

export function validateHeight(height, sizeElement, indent) {
    if (height <= sizeElement - indent) {
        return true;
    }
}