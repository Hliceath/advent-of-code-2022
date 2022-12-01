import fs from 'node:fs';
import readline from 'node:readline';

export async function day1(): Promise<void> {
    const elves: number[] = [];
    const fileStream = fs.createReadStream('src/day1/input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let elfId = 0;
    for await (const line of rl) {
        if (line === "") {
            elfId++;
            continue;
        }
        elves[elfId] ? elves[elfId] += parseInt(line) : elves[elfId] = parseInt(line);
    }
    const elfWithMostCalories = Math.max(...elves);
    const sumTopThreeCalories = elves
        .sort(function (a, b) { return a - b })
        .slice(-3)
        .reduce((a, b) => a + b);

    console.log(`Day 1: 
     Part 1) The elf with the most calories is carrying ${elfWithMostCalories} calories.
     Part 2) The top three elves are carrying ${sumTopThreeCalories} calories. Thicc bois!`);
}
