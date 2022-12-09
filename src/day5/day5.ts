import { readFile } from "../utils/utils";
import { stacks } from '../models/day5.models';

export async function day5(): Promise<void> {
    const rl = readFile('src/day5/input.txt');

    const part1Stacks: stacks = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: []
    };

    const part2Stacks: stacks = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: []
    };

    let i = 0;
    for await (const line of rl) {
        if (i < 8) {
            line.split('').forEach((letter, index) => {
                if (index % 4 === 1) {
                    if (letter !== " ") part1Stacks[(index - 1) / 4 + 1].unshift(letter);
                    if (letter !== " ") part2Stacks[(index - 1) / 4 + 1].unshift(letter);
                }
            });
        }

        if (line.startsWith("move")) {
            const lineSplitted = line.split(' ');
            const toMoveP2 = [];
            for (let i = 0; i < Number(lineSplitted[1]); i++) {
                const toMoveP1 = part1Stacks[Number(lineSplitted[3])].pop();
                if (toMoveP1) part1Stacks[Number(lineSplitted[5])].push(toMoveP1);

                toMoveP2.push(part2Stacks[Number(lineSplitted[3])].pop());
            }
            toMoveP2.reverse();
            toMoveP2.forEach((letter) => { if (letter) part2Stacks[Number(lineSplitted[5])].push(letter) });
        }
        i++;
    }
    let part1Answer=  "";
    Object.keys(part1Stacks).forEach((stack) => part1Answer += part1Stacks[Number(stack)].pop());
    let part2Answer=  "";
    Object.keys(part2Stacks).forEach((stack) => part2Answer += part2Stacks[Number(stack)].pop());

    console.log(`Day 5:
    Part 1) [CrateMover 9000] Top crates are: ${part1Answer}. 
    Part 2) [CrateMover 9001] Top crates are: ${part2Answer}. \n`);
}