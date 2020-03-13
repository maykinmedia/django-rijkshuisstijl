import flatpickr from 'flatpickr';
import {Dutch} from 'flatpickr/dist/l10n/nl';
'flatpickr';
import {DATE_INPUTS} from './constants';


/**
 * Adds a datepicker to date inputs.
 * @class
 */
class DateInput {
    /**
     * Constructor method.
     * @param {HTMLInputElement} node
     */
    constructor(node) {
        /** @type {HTMLInputElement} */
        this.node = node;

        this.update();
    }

    /**
     * Returns the date format to use with the datepicker.
     * @return {string}
     */
    getDateFormat() {
        if (this.node.dataset.dateFormat) {
            return this.node.dataset.dateFormat;
        }

        return this.isDateTime() ? 'd-m-Y H:1' : 'd-m-Y';
    }

    /**
     * @TODO: Yet to be supported.
     * @return {boolean}
     */
    isDateTime() {
        return this.node.type === 'datetime';
    }

    /**
     * Adds the datepicker.
     */
    update() {
        if (!this.node.placeholder) {
            const placeholder = this.getDateFormat()
                .replace('d', 'dd')
                .replace('m', 'mm')
                .replace('Y', 'yyyy')
            this.node.placeholder = placeholder;
        }

        const locale = Dutch;
        locale.firstDayOfWeek = 0;

        flatpickr(this.node, {
            altInput: true,
            altFormat: this.getDateFormat(),
            dateFormat: 'Y-m-d',
            locale: locale,
        });
    }
}


// Start!
[...DATE_INPUTS].forEach(node => new DateInput(node));


