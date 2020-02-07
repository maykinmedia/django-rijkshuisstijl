//jshint ignore:start
import {SEARCHES} from './constants';

// Start!
if (SEARCHES.length) {
    import(/* webpackChunkName: 'search-css' */ '../../../sass/components/search/_all.scss');
    import(/* webpackChunkName: 'search' */ './search');
}
