//jshint ignore:start
import {INPUT_FILEPICKERS, LINK_SELECTS} from './constants';

// Start!
if (INPUT_FILEPICKERS.length) {
    import(/* webpackChunkName: 'input-filepicker' */ './input-filepicker');
}

if (LINK_SELECTS.length) {
    import(/* webpackChunkName: 'link-select' */ './link-select');
}
