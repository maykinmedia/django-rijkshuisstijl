//jshint ignore:start
import {STACKED_LISTS} from './constants';

if (STACKED_LISTS.length) {
    import(/* webpackChunkName: 'stacked-list-css' */ '../../../sass/components/stacked-list/_all.scss');
}
