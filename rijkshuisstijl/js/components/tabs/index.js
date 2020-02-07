//jshint ignore:start
import {TABS} from './constants';

// Start!
if (TABS.length) {
    import(/* webpackChunkName: 'tabs-css' */ '../../../sass/components/tabs/_all.scss');
    import(/* webpackChunkName: 'tabs' */ './tabs');
}
