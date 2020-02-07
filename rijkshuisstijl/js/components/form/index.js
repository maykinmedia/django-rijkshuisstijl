//jshint ignore:start
import {FORMS, FORM_CONTROLS, INPUTS, SELECTS, INPUT_FILEPICKERS, LINK_SELECTS} from './constants';

// Start!
if (FORMS.length || FORM_CONTROLS.length || INPUTS.length || SELECTS.length) {
    import(/* webpackChunkName: 'form-css' */ '../../../sass/components/form/_all.scss');
}

if (FORM_CONTROLS.length) {
    import(/* webpackChunkName: 'form-control' */ './form-control');
}

if (INPUT_FILEPICKERS.length) {
    import(/* webpackChunkName: 'input-filepicker' */ './input-filepicker');
}

if (LINK_SELECTS.length) {
    import(/* webpackChunkName: 'link-select' */ './link-select');
}
