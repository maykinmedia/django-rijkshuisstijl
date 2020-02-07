//jshint ignore:start
import {LAYOUTS} from './constants';

if (LAYOUTS.length) {
    import(/* webpackChunkName: 'layout-css' */ '../../../sass/components/layout/_all.scss');
}
