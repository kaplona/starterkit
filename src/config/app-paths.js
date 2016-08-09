'use strict';

const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../..');

const BUILD_DIR = 'build';
const SOURCE_DIR = 'src';
const WEB_ROOT_DIR = 'public';


const AppPaths = {
    build: path.join(ROOT_PATH, WEB_ROOT_DIR, BUILD_DIR),
    components: path.join(ROOT_PATH, SOURCE_DIR, 'components'),
    root: ROOT_PATH,
    serverViews: path.join(ROOT_PATH, SOURCE_DIR, 'server-views'),
    source: path.join(ROOT_PATH, SOURCE_DIR),
    webRoot: path.join(ROOT_PATH, WEB_ROOT_DIR),

    public: {
        assets: `/${WEB_ROOT_DIR}/`,
        build: `/${WEB_ROOT_DIR}/${BUILD_DIR}/`
    }
};


module.exports = AppPaths;
