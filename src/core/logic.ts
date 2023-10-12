import { TokenType } from "./types";
import fs from "fs";
import { patterns, tokenize } from "./tokenize";

function runLibFunc(lib: string, func: string, data: any) {
    let x = fs.readdirSync("../lib") as Array<string>
    x = x.map(val => {
        return val.split(".")[0]
    })

    if (x.find(val => {
        return lib == val
    })) {
        // console.log(`const x=require('../lib/${lib}.ts');let y = new x.default(); y.${func}(${data});`)
        return eval(`const x=require('../lib/${lib}.ts');let y = new x.default(); y.${func}(${data});`)
    }
}

export function executeTokenizedCode(tokens: Array<TokenType>): void {
    let variableMap: { [key: string]: any } = {};

    console.log(tokens)

    for (let index = 0; index < tokens.length; index++) {
        const current = tokens[index]
        switch(tokens[index].type) {
            case "KEYWORD":
                switch(tokens[index].value) {
                    case "var":
                        const variableName = tokens[index+1]
                        const variableValue = tokens[index+2]
                        if (variableValue.type == "FUNCCALL") {
                            const func = variableValue.value.split(".")
                            variableMap[variableName.value] = runLibFunc(func[0], func[1], tokens[index+3].value)
                            index += 3
                            break
                        }
                        if (variableValue.type == "VAR_REF") {
                            variableMap[variableName.value] = variableMap[variableValue.value.substring(1)]
                            index += 2
                            break
                        }
                }
                break
            case "FUNCCALL":
                const func = current.value.split(".")
                let input = tokens[index+1]

                if (input.type == "VAR_REF") input = variableMap[input.value.substring(1)]

                runLibFunc(func[0], func[1], input)
        }
    }
    console.log(variableMap)
}

executeTokenizedCode(tokenize(`
var x stdout.returnData null
var y $x
stdout.log $y
`))

// runLibFunc("stdout", "log", '"aaa"')