//jshint ignore:start
import {MENUS} from './constants';

if (MENUS.length) {
    import(/* webpackChunkName: 'menu-css' */ '../../../sass/components/menu/_all.scss');
}
