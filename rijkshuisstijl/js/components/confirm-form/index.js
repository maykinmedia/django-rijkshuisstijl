//jshint ignore:start
import {CONFIRM_FORMS} from './constants';

if (CONFIRM_FORMS.length) {
    import(/* webpackChunkName: 'confirm-form-css' */ '../../../sass/components/confirm-form/_all.scss');
}
