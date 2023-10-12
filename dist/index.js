"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenize_1 = require("./core/tokenize");
let x = `

var x = 4734

if $x > 0 {
    stdout.log "hi"
} else {
    stdout.log "not hi"
}

`;
console.log((0, tokenize_1.tokenize)(x));
