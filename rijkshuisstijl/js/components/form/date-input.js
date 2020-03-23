import BEM from 'bem.js';
import flatpickr from 'flatpickr';
import {Dutch} from 'flatpickr/dist/l10n/nl';
import {MODIFIER_DATE_RANGE, DATE_INPUTS, DATE_RANGE_INPUTS} from './constants';


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
     * Returns the (Dutch) locale to use.
     * @return {CustomLocale}
     */
    getLocale() {
        const locale = Dutch;
        locale.firstDayOfWeek = 0;
        return locale;
    }

    /**
     * Returns the mode to use, either "range" or "single".
     * @return {string}
     */
    getMode() {
        return BEM.hasModifier(this.node, MODIFIER_DATE_RANGE) ? 'range' : 'single';
    }

    /**
     * @TODO: Yet to be supported.
     * @return {boolean}
     */
    isDateTime() {
        return this.node.type === 'datetime';
    }

    updatePlaceholder() {
        if (!this.node.placeholder) {
            const placeholder = this.getDateFormat()
                .replace('d', 'dd')
                .replace('m', 'mm')
                .replace('Y', 'yyyy');
            this.node.placeholder = placeholder;
        }
    }

  updateClassName() {
    const parent = this.node.parentElement;
    const datepicker = parent.querySelector(".input.form-control");

    datepicker.className = "input active";
  }

    /**
     * Adds the datepicker.
     */
    update() {
        this.updatePlaceholder();

        const flatPicker = flatpickr(this.node, {
            altInput: true,
            altFormat: this.getDateFormat(),
            dateFormat: 'Y-m-d',
            defaultDate: this.node.value.split('/'),
            locale: this.getLocale(),
            mode: this.getMode(),
        });
        flatPicker.l10n.rangeSeparator = '/';

      this.updateClassName();
    }
}


// Start!
[...DATE_INPUTS, ...DATE_RANGE_INPUTS].forEach(node => new DateInput(node));


