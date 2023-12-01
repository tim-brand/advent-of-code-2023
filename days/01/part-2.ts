
const inputLines = (await Bun.file(import.meta.dir + '/part-2-input').text()).split('\n')

const numberMap: Record<string, string> = {
    'one': "1",
    'two': "2",
    'three': "3",
    'four': "4", 
    'five': "5",
    'six': "6",
    'seven': "7",
    'eight': "8",
    'nine': "9"
}

let sum = 0
inputLines.forEach((line, i) => {
    let updatedLine = line
    for (let i = 0; i < line.length; ++i) {
        const key = Object.keys(numberMap).find(key => line.indexOf(key, i) == i)
        if (!key) continue;
        updatedLine = updatedLine.replace(key, `${key[0]}${numberMap[key]}${key.at(-1)}`)
    }
    const digits = updatedLine.replaceAll(/[a-z\s]*/g, "")
    const value = +`${digits[0]}${digits.at(-1)}`
    sum += value

    console.log(i, line, updatedLine, +digits, value, sum)
})

console.log(sum)
