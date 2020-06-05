import FormPolyfill from 'form-association-polyfill/dist/form-association-polyfill-with-shims';
import {KEYCODE_ENTER, TEXTAREAS} from './constants';

/**
 * Fixes textarea bug introduced by form association polyfill.
 * Hitting enter doesn't insert newline in polyfilled textarea's due to Event.preventDefault() being called.
 * https://github.com/paulzi/form-association-polyfill/issues/4
 * @class
 */
class FormAssociatedTextArea {
    /**
     * Constructor method.
     * @param {HTMLElement} node
     */
    constructor(node) {
        /** @type {HTMLElement} */
        this.node = node;

        this.bindEvents()
    }

    /**
     * Binds events to callbacks.
     */
    bindEvents() {
        // Fix textarea bug in form association polyfill.
        // Hitting enter doesn't insert newline in polyfilled textarea's due to Event.preventDefault() being called.
        if (!this.checkSupport()) {
            this.node.addEventListener('keypress', e => {
                if (e.keyCode === KEYCODE_ENTER) {
                    this.insertNewLine(e)
                }
            })

        }
    }

    /**
     * Copied from form association polyfill.
     * @return {boolean}
     */
    checkSupport() {
        let div = document.createElement('div');
        let form = document.createElement('form');
        let input = document.createElement('input');
        let id = '_tmp' + Date.now();
        form.id = id;
        input.setAttribute('form', id);

        div.style.display = 'none';
        document.body.appendChild(div);
        div.appendChild(form);
        div.appendChild(input);
        let result = input.form === form;
        document.body.removeChild(div);

        return result;
    }

    /**
     * Adds newline to textarea's content.
     * Hitting enter doesn't insert newline in polyfilled textarea's due to Event.preventDefault() being called.
     */
    insertNewLine(e) {
        this.node.textContent += "\n";
        e.preventDefault();


    }
}


// Start!
FormPolyfill.register();
[...TEXTAREAS].forEach(node => new FormAssociatedTextArea(node));
