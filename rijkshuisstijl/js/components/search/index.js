import {SEARCHES} from './constants';

// Start!
if (SEARCHES.length) {
    import(/* webpackChunkName: 'search' */ './search');
}
