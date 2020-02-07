//jshint ignore:start
import {FOOTERS} from './constants';

if (FOOTERS.length) {
    import(/* webpackChunkName: 'footer-css' */ '../../../sass/components/footer/_all.scss');
}
