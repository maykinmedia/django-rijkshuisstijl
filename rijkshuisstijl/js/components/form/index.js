//jshint ignore:start
import {DATE_INPUTS, FORM_CONTROLS, INPUT_FILEPICKERS, LINK_SELECTS} from './constants';

// Start!
if (FORM_CONTROLS.length) {
    import(/* webpackChunkName: 'form-control' */ './form-control');
}

if (DATE_INPUTS.length) {
    import(/* webpackChunkName: 'date-input' */ './date-input');
}

if (INPUT_FILEPICKERS.length) {
    import(/* webpackChunkName: 'input-filepicker' */ './input-filepicker');
}

if (LINK_SELECTS.length) {
    import(/* webpackChunkName: 'link-select' */ './link-select');
}
