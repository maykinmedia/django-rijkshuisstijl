import BEM from 'bem.js';


/** @const {string} Input block name. */
export const BLOCK_INPUT = 'input';

/** @const {string} */
export const ELEMENT_FILEPICKER = 'filepicker';

/** @const {NodeList} */
export const INPUT_FILEPICKERS = BEM.getBEMNodes(BLOCK_INPUT, ELEMENT_FILEPICKER);

/** {string} Select block name. */
export const BLOCK_SELECT = 'select';

/** {string} Modifier indicating a select should trigger a navigation. */
export const MODIFIER_LINK = 'link';

/** {NodeList} Link selects. */
export const LINK_SELECTS = BEM.getBEMNodes(BLOCK_SELECT, false, MODIFIER_LINK);
