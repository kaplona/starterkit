'use strict';

const AppPaths = require('../config/app-paths');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const Promise = require('es6-promise').Promise;
const rimraf = require('rimraf');


const logPrefix = `[${path.basename(__filename)}]`;


const FileWriter = {

    /**
     * @param {string} filename
     * @param {string} content
     * @return {Promise} whether creation was successful or not
     */
    write: (filename, content) => {
        return Promise
            .resolve()
            .then(() => {
                fs.writeFileSync(path.join(AppPaths.root, filename), content);
            })
            .then(() => {
                console.log(chalk.green(`${logPrefix} OK: write ${filename}`));
            })
            .catch(err => {
                console.log(chalk.red(`${logPrefix} ERROR: Unable to write to ${filename} -  ${err}`));
                throw err;
            });
    },


    /**
     * @param {string} filename   file, folder name or pattern
     * @return {Promise} whether deletion was successful or not
     */
    remove: (filename) => {
        return new Promise((resolve, reject) => {
            const filePath = path.join(AppPaths.root, filename);
            rimraf(filePath, err => {
                if (err) {
                    console.log(chalk.red(`${logPrefix} ERROR: Unable to delete ${filename} -  ${err}`));
                    reject(err);
                    return;
                }
                console.log(chalk.green(`${logPrefix} OK: remove ${filename}`));
                resolve();
            });
        });
    }
};


module.exports = FileWriter;
