import BEM from 'bem.js';

/** @const {string} Form control block name. */
export const BLOCK_FORM_CONTROL = 'form-control';

/** @const {NodeList} Form controls. */
export const FORM_CONTROLS = BEM.getBEMNodes(BLOCK_FORM_CONTROL);

/** @const {string} Input block name. */
export const BLOCK_INPUT = 'input';

/** @const {string} Date range modifier name. */
export const MODIFIER_DATE = 'date';

/** @const {string} Date range modifier name. */
export const MODIFIER_DATE_RANGE = 'daterange';

/** @const {string} Date inputs. */
export const DATE_INPUTS = document.querySelectorAll(BEM.getBEMSelector(BLOCK_INPUT) + '[type="date"]');

/** @const {string} Date inputs. */
export const DATE_RANGE_INPUTS = BEM.getBEMNodes(BLOCK_INPUT, false, MODIFIER_DATE_RANGE);

/** @const {string} Time inputs. */
export const TIME_INPUTS = document.querySelectorAll(BEM.getBEMSelector(BLOCK_INPUT) + '[type="time"]');

/** @const {string} Filepicker element name. */
export const ELEMENT_FILEPICKER = 'filepicker';

/** @const {NodeList} File pickers. */
export const INPUT_FILEPICKERS = BEM.getBEMNodes(BLOCK_INPUT, ELEMENT_FILEPICKER);

/** {string} Select block name. */
export const BLOCK_SELECT = 'select';

/** {string} Select block name. */
export const SELECTS = BEM.getBEMNodes(BLOCK_SELECT);

/** {string} Modifier indicating that a select has a value set. */
export const MODIFIER_HAS_VALUE = 'has-value';

/** {string} Modifier indicating a select should trigger a navigation. */
export const MODIFIER_LINK = 'link';

/** {NodeList} Link selects. */
export const LINK_SELECTS = BEM.getBEMNodes(BLOCK_SELECT, false, MODIFIER_LINK);
