//jshint ignore:start
import {NAVIGATION_BARS} from './constants';

if (NAVIGATION_BARS.length) {
    import(/* webpackChunkName: 'navigation-bar-css' */ '../../../sass/components/navigation-bar/_all.scss');
}
