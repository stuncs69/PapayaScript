import { TokenType } from "./types"

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

export const patterns = {
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

export function tokenize(code: string) {
    const tokens = [] as Array<TokenType>;
    const lines = code.split('\n');
    
    lines.forEach(line => {
        const words = line.split(/\s+/);
        words.forEach(word => {
            if (patterns.KEYWORD.test(word)) {
                tokens.push({ type: tokenTypes.KEYWORD, value: word });
            } else if (patterns.OPERATOR.test(word)) {
                tokens.push({ type: tokenTypes.OPERATOR, value: word });
            } else if (patterns.IDENTIFIER.test(word)) {
                tokens.push({ type: tokenTypes.IDENTIFIER, value: word });
            } else if (patterns.LITERAL.test(word)) {
                tokens.push({ type: tokenTypes.LITERAL, value: word });
            } else if (patterns.SPECIAL_SYMBOL.test(word)) {
                tokens.push({ type: tokenTypes.SPECIAL_SYMBOL, value: word });
            } else if (patterns.COMMENT.test(word)) {
                tokens.push({ type: tokenTypes.COMMENT, value: word });
            } else if (patterns.VAR_REF.test(word)) {
                tokens.push({ type: tokenTypes.VAR_REF, value: word });
            } else if (patterns.LOGIC.test(word)) {
                tokens.push({ type: tokenTypes.LOGIC, value: word });
            } else if (patterns.FUNCCALL.test(word)) {
                tokens.push({ type: tokenTypes.FUNCCALL, value: word })
            } else {
                // ignore invalid tokens
            }
        });
    });

    return tokens;
}