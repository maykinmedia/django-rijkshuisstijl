//jshint ignore:start
import {INTROS} from './constants';

if (INTROS.length) {
    import(/* webpackChunkName: 'intro-css' */ '../../../sass/components/intro/_all.scss');
}
