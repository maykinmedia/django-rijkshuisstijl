//jshint ignore:start
import {DATAGRIDS, DATAGRID_FILTERS} from './constants';

// Start!
if (DATAGRIDS.length) {
    import(/* webpackChunkName: 'datagrid-css' */ '../../../sass/components/datagrid/_all.scss');
}

if (DATAGRID_FILTERS.length) {
    import(/* webpackChunkName: 'datagrid-filter' */ './datagrid-filter');
}
