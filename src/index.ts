import { tokenize } from "./core/tokenize"
import { executeTokenizedCode } from "./core/logic"

let x = `

var x 4734

if $x > 0 {
    stdout.log "hi"
} else {
    stdout.log "not hi"
}

`

console.log(tokenize(x))