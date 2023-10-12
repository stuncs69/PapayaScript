"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = exports.patterns = void 0;
const process_1 = __importDefault(require("process"));
// example syntax
//
// if $x > 0 {
//     log "hi"
// } else {
//     return "hi"
// }
const tokenTypes = {
    KEYWORD: 'KEYWORD',
    OPERATOR: 'OPERATOR',
    IDENTIFIER: 'IDENTIFIER',
    LITERAL: 'LITERAL',
    SPECIAL_SYMBOL: 'SPECIAL_SYMBOL',
    COMMENT: 'COMMENT',
    VAR_REF: 'VAR_REF',
    LOGIC: 'LOGIC',
    FUNCCALL: "FUNCCALL"
};
exports.patterns = {
    KEYWORD: /^(if|else|while|for|function|return|var)$/,
    OPERATOR: /^(\+|\-|\*|\/|\=)$/,
    IDENTIFIER: /^[a-zA-Z_]\w*$/,
    LITERAL: /^(\d+(\.\d+)?|\"(\\.|[^"])*\"|\'(\\.|[^\'])*\')$/,
    SPECIAL_SYMBOL: /^(\(|\)|\{|\}|\[|\]|;)$/,
    COMMENT: /^\/\/.*$/,
    VAR_REF: /^\$[a-zA-Z_]\w*$/,
    FUNCCALL: /[a-zA-Z_]*\w\.[a-zA-Z_]*\w/,
    LOGIC: /^(>|<|>=|<=|==|!=)$/,
};
function tokenize(code) {
    const tokens = [];
    const lines = code.split('\n');
    lines.forEach(line => {
        const words = line.split(/\s+/);
        words.forEach(word => {
            if (exports.patterns.KEYWORD.test(word)) {
                tokens.push({ type: tokenTypes.KEYWORD, value: word });
            }
            else if (exports.patterns.OPERATOR.test(word)) {
                tokens.push({ type: tokenTypes.OPERATOR, value: word });
            }
            else if (exports.patterns.IDENTIFIER.test(word)) {
                tokens.push({ type: tokenTypes.IDENTIFIER, value: word });
            }
            else if (exports.patterns.LITERAL.test(word)) {
                tokens.push({ type: tokenTypes.LITERAL, value: word });
            }
            else if (exports.patterns.SPECIAL_SYMBOL.test(word)) {
                tokens.push({ type: tokenTypes.SPECIAL_SYMBOL, value: word });
            }
            else if (exports.patterns.COMMENT.test(word)) {
                tokens.push({ type: tokenTypes.COMMENT, value: word });
            }
            else if (exports.patterns.VAR_REF.test(word)) {
                tokens.push({ type: tokenTypes.VAR_REF, value: word });
            }
            else if (exports.patterns.LOGIC.test(word)) {
                tokens.push({ type: tokenTypes.LOGIC, value: word });
            }
            else if (exports.patterns.FUNCCALL.test(word)) {
                tokens.push({ type: tokenTypes.FUNCCALL, value: word });
            }
            else {
                process_1.default.stdout.write(`Invalid token: ${word}\n`);
            }
        });
    });
    return tokens;
}
exports.tokenize = tokenize;
