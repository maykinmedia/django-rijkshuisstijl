import flatpickr from 'flatpickr';
import {TIME_INPUTS} from './constants';


/**
 * Adds a timepicker to time inputs.
 * @class
 */
class TimeInput {
    /**
     * Constructor method.
     * @param {HTMLInputElement} node
     */
    constructor(node) {
        /** @type {HTMLInputElement} */
        this.node = node;

        this.update();
    }

    getTimeFormat() {
        if (this.node.dataset.timeFormat) {
            return this.node.dataset.timeFormat;
        }

        return this.isTime() ? 'H:i' : '';
    }

    isTime() {
        return this.node.type === 'time';
    }

    updatePlaceholder() {
        if (!this.node.placeholder) {
            const placeholder = this.getTimeFormat();
            this.node.placeholder = placeholder;
        }
    }

    /**
     * Adds the timepicker.
     */
    update() {
        this.updatePlaceholder();

      flatpickr(this.node, {
        enableTime: true,
        noCalendar: true,
        dateFormat: this.getTimeFormat(),
        time_24hr: true
      });
    }
}


// Start!
[...TIME_INPUTS].forEach(node => new TimeInput(node));
