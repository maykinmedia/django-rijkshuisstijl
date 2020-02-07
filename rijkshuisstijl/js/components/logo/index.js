//jshint ignore:start
import {LOGOS} from './constants';

if (LOGOS.length) {
    import(/* webpackChunkName: 'logo-css' */ '../../../sass/components/logo/_all.scss');
}
