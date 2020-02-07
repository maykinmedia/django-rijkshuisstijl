//jshint ignore:start
import {BUTTONS} from './constants';

// Start!
if (BUTTONS.length) {
    import(/* webpackChunkName: 'button-css' */ '../../../sass/components/button/_all.scss');
}
