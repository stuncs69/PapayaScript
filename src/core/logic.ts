import { TokenType } from "./types";
import fs from "fs";
import { patterns } from "./tokenize";

function runLibFunc(lib: string, func: string, data: any) {
    let x = fs.readdirSync("../lib") as Array<string>
    x = x.map(val => {
        return val.split(".")[0]
    })

    if (x.find(val => {
        return lib == val
    })) {
        eval(`const x=require('../lib/${lib}.ts');let y = new x.default(); x.${func}(${data});`)
    }
}

export function executeTokenizedCode(tokens: Array<TokenType>): void {
    let variableMap: { [key: string]: any } = {};

    for (let index = 0; index < tokens.length; index++) {
        switch(tokens[index].type) {
            case "keyword":
                switch(tokens[index].value) {
                    case "var":
                        const variableName = tokens[index+1]
                        const variableValue = tokens[index+2]


                }
        }
    }
}

runLibFunc("stdout", "log", "aa")