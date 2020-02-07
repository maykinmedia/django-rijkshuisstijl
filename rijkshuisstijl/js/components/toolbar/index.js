//jshint ignore:start
import {TOOLBARS} from './constants';

if (TOOLBARS.length) {
    import(/* webpackChunkName: 'toolbar-css' */ '../../../sass/components/toolbar/_all.scss');
}
