//jshint ignore:start
import {FAKE_LINKS} from './constants';

// Start!
if (FAKE_LINKS.length) {
    import(/* webpackChunkName: 'fake-link-css' */ '../../../sass/components/fake-link/_all.scss');
    import(/* webpackChunkName: 'fake-link' */ './fake-link');
}
