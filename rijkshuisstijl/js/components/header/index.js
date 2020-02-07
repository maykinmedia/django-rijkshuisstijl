//jshint ignore:start
import {HEADERS} from './constants';

if (HEADERS.length) {
    import(/* webpackChunkName: 'header-css' */ '../../../sass/components/header/_all.scss');
}
