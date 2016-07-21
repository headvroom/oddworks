/* global beforeAll afterAll */
/* eslint prefer-arrow-callback: 0 */
'use strict';

let MockServerResponse;
try {
	MockServerResponse = require('mock-express-response/node_modules/mock-res');
} catch (err) {
	if (/Cannot find module/.test(err.message)) {
		MockServerResponse = require('mock-res');
	} else {
		throw err;
	}
}

const support = require('../support/');

const SETUP_TIMEOUT = 5000;

MockServerResponse.prototype._getString = function () {
	const buffs = this._readableState.buffer;

	if (Array.isArray(buffs)) {
		return buffs.map(buff => {
			return buff.toString();
		}).join('');
	}

	return buffs.toString();
};

beforeAll(function (done) {
	this.createBus = support.createBus;
	done();
}, SETUP_TIMEOUT);

afterAll(function (done) {
	done();
});
