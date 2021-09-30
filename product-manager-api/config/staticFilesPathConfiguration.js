'use strict';

const express = require('express');
const path = require('path');

/**
 * Build new static files valid directories configuration
 */
module.exports.staticFilesPathConfiguration = (app) => {
    app.use(express.static(path.join(__dirname, '../public')));
}
