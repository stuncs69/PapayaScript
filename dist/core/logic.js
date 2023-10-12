"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTokenizedCode = void 0;
const fs_1 = __importDefault(require("fs"));
function runLibFunc(lib, func, data) {
    let x = fs_1.default.readdirSync("../lib");
    console.log(x)
    x = x.map(val => {
        return val.split(".")[0];
    });
    if (x.find(val => {
        return lib == val;
    })) {
        eval(`const x=require('../lib/${lib}.js');let y = new x.default(); y.${func}(${data});`);
    }
}
function executeTokenizedCode(tokens) {
    let variableMap = {};
    for (let index = 0; index < tokens.length; index++) {
        switch (tokens[index].type) {
            case "keyword":
                switch (tokens[index].value) {
                    case "var":
                        const variableName = tokens[index + 1];
                        const variableValue = tokens[index + 2];
                }
        }
    }
}
exports.executeTokenizedCode = executeTokenizedCode;
runLibFunc("stdout", "log", '"aa"');
