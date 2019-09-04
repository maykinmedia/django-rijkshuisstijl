import {PAGINATORS} from './constants';

// Start!
if (PAGINATORS.length) {
    import(/* webpackChunkName: 'paginator' */ './paginator');
}
