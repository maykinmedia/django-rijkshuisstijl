//jshint ignore:start
import {LOGIN_BARS} from './constants';

if (LOGIN_BARS.length) {
    import(/* webpackChunkName: 'login-bar-css' */ '../../../sass/components/login-bar/_all.scss');
}
