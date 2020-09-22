"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
exports.default = {
    generateDefaultName: function (originalName) {
        var date = Math.floor(Date.now() / 1000);
        return (
            date +
            "_" +
            crypto_1.randomBytes(6).toString("hex") +
            "_" +
            originalName
        );
    },
};
