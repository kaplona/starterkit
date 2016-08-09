'use strict';

const AppPaths = require('../config/app-paths');
const FileWriter = require('../tools/file-writer');
const path = require('path');
const Promise = require('es6-promise').Promise;


module.exports = function () {
    return Promise.all([
        FileWriter.remove('nodemon.json'),
        FileWriter.remove(path.relative(AppPaths.root, path.join(AppPaths.build, '*')))
    ]);
};
