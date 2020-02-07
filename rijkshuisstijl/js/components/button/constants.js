import BEM from 'bem.js';

/** @const {string} */
export const BLOCK_BUTTON = 'button';

/** @const {string} Modifier indicating a primary button. */
export const MODIFIER_PRIMARY = 'primary';

/** @const {string} Modifier indicating a secondary button. */
export const MODIFIER_SECONDARY = 'secondary';

/** @const {NodeList} */
export const BUTTONS = BEM.getBEMNodes(BLOCK_BUTTON);
