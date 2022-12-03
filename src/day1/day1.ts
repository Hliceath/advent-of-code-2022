import { readFile } from '../utils/utils';

export async function day1(): Promise<void> {
    const elves: number[] = [];
    const rl = readFile('src/day1/input.txt');

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
    Part 2) The top three elves are carrying ${sumTopThreeCalories} calories. Thicc bois! \n`);
}