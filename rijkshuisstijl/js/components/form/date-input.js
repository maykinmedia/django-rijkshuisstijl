import BEM from 'bem.js';
import flatpickr from 'flatpickr';
import {Dutch} from 'flatpickr/dist/l10n/nl';
import {MODIFIER_DATE_RANGE, DATE_INPUTS, DATE_RANGE_INPUTS, MODIFIER_DATE} from './constants';


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

    /**
     * Makes sure a useful value is set on the value attribute.
     */
    cleanValue() {
        if (!this.node.value.match(/\d/)) {
            this.node.value = "";
        }
    }

    /**
     * Adds MODIFIER_DATE to this.node.
     */
    updateClassName() {
        BEM.addModifier(this.node, MODIFIER_DATE);
    }

    /**
     * Adds placeholder to this.node.
     */
    updatePlaceholder() {
        if (!this.node.placeholder) {
            const placeholder = this.getDateFormat()
                .replace('d', 'dd')
                .replace('m', 'mm')
                .replace('Y', 'yyyy');
            this.node.placeholder = placeholder;
        }
    }

    /**
     * Adds the datepicker.
     */
    update() {
        this.updateClassName();
        this.updatePlaceholder();
        const flatPicker = flatpickr(this.node, {
            altInput: true,
            altInputClass: this.node.className,
            altFormat: this.getDateFormat(),
            dateFormat: 'Y-m-d',
            defaultDate: this.node.value.split('/'),
            locale: this.getLocale(),
            mode: this.getMode(),
            onReady: this.cleanValue.bind(this),
        });
        flatPicker.l10n.rangeSeparator = '/';
    }
}


// Start!
[...DATE_INPUTS, ...DATE_RANGE_INPUTS].forEach(node => new DateInput(node));


