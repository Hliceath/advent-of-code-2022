import { readFile } from '../utils/utils';
import { letterOccurences } from '../models/day3.models';

export async function day3(): Promise<void> {
    let sumPriorities = 0;
    let sumPrioritiesByGroup = 0;
    const rl = readFile('src/day3/input.txt');

    let i = 1;
    let group: string[] = [];
    for await (const line of rl) {
        const firstHalf = line.substring(0, line.length / 2);
        const secondHalf = line.substring(line.length / 2);
        const commonChar = firstHalf.charAt(firstHalf.split("").findIndex((element: string) => secondHalf.includes(element)));
            sumPriorities += addPriority(commonChar);

        group.push(line);
        if (i % 3 === 0) {
            let letterOccurence: letterOccurences = {};
            group.forEach((line) => {
                line.split("").forEach((letter) => {
                    letterOccurence[letter] ? letterOccurence[letter]++ : letterOccurence[letter] = 1;
                });
            });
            Object.keys(letterOccurence).sort((a, b) => letterOccurence[b] - letterOccurence[a]).forEach((letter) => {
                if (group[0].includes(letter) && group[1].includes(letter) && group[2].includes(letter)) {
                    sumPrioritiesByGroup += addPriority(letter);
                }
            });
            group = [];
            letterOccurence = {};
        }
        i++;
    }

    console.log(`Day 3: 
    Part 1) The sum of priorities is: ${sumPriorities}.
    Part 2) The sum of priorities by group is: ${sumPrioritiesByGroup}. \n`);
}

function addPriority(letter: string): number {
    if (/^[a-z]+$/.test(letter)) 
        return parseInt(letter, 36) - 9;
    else
        return parseInt(letter, 36) - 9 + 26;
}