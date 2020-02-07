//jshint ignore:start
import {ICONS} from './constants';

if (ICONS.length) {
    import(/* webpackChunkName: 'icon-css' */ '../../../sass/components/icon/_all.scss');
}
