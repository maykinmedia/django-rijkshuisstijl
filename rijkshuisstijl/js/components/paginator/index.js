//jshint ignore:start
import {PAGINATORS} from './constants';

// Start!
if (PAGINATORS.length) {
    import(/* webpackChunkName: 'paginator-css' */ '../../../sass/components/paginator/_all.scss');
    import(/* webpackChunkName: 'paginator' */ './paginator');
}
