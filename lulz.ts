import { Temporal } from 'temporal-polyfill'

const instant = Temporal.Now.instant()

console.log(instant.toString())
