import BEM from 'bem.js';

/** @const {string} */
export const BLOCK_DATAGRID = 'datagrid';

/** @const {string} */
export const ELEMENT_FILTER = 'filter';

/** @const {string} */
export const ELEMENT_ROW = 'row';

/** @const {string} */
export const MODIFIER_EDIT = 'edit';

/** @const {NodeList} */
export const DATAGRIDS = BEM.getBEMNodes(BLOCK_DATAGRID);

/** @const {NodeList} */
export const DATAGRID_FILTERS = BEM.getBEMNodes(BLOCK_DATAGRID, ELEMENT_FILTER);
