//jshint ignore:start
import {KEY_VALUE_TABLES} from './constants';

if (KEY_VALUE_TABLES.length) {
    import(/* webpackChunkName: 'key-value-table-css' */ '../../../sass/components/key-value-table/_all.scss');
}
