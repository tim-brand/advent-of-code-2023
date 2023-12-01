
const inputLines = (await Bun.file(import.meta.dir + '/input').text()).split('\n')
let sum = 0
inputLines.forEach((line, i) => {
    const digits = line.replaceAll(/[a-z]*/g, "")
    sum += +`${digits[0]}${digits.at(-1)}`
})

console.log(sum)
