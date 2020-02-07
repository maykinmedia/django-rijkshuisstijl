//jshint ignore:start
import {SKIPLINKS} from './constants';

if (SKIPLINKS.length) {
    import(/* webpackChunkName: 'skiplink-css' */ '../../../sass/components/skiplink/_all.scss');
}
