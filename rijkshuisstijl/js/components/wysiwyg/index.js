//jshint ignore:start
import {WYSIWYGS} from './constants';

if (WYSIWYGS.length) {
    import(/* webpackChunkName: 'wysiwyg-css' */ '../../../sass/components/wysiwyg/_all.scss');
}
