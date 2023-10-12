"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class stdout {
    constructor() {
        this.name = "stdout";
        this.version = "0.0.1";
    }
    log(input) {
        process.stdout.write(input);
    }
}
exports.default = stdout;
