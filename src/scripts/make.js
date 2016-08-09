'use strict';

require('./clean')().then(() => {
    require('./make-nodemon-json')();
});
