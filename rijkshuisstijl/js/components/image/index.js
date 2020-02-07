//jshint ignore:start
import {IMAGES} from './constants';

if (IMAGES.length) {
    import(/* webpackChunkName: 'image-css' */ '../../../sass/components/image/_all.scss');
}
