import { readFile } from '../utils/utils';

export async function day4(): Promise<void> {
    const rl = readFile('src/day4/input.txt');
    let countDuplicatePairs = 0;
    let countOverlappingPairs = 0;

    for await (const line of rl) {
        const pairs = line.split(",");
        const ranges = pairs.map((pair) => pair.split("-"));
        const rangesAsNumbers = ranges.map((range) => range.map((number) => parseInt(number)));
        if (isDuplicateWork(rangesAsNumbers[0], rangesAsNumbers[1])) countDuplicatePairs++;
        if (isDuplicateWork(rangesAsNumbers[0], rangesAsNumbers[1], true)) +countOverlappingPairs++;
    }

    console.log(`Day 4:
    Part 1) The number of duplicate pairs is: ${countDuplicatePairs}.
    Part 2) The number of overlapping pairs is: ${countOverlappingPairs}. \n`);
}

function isDuplicateWork(range1: number[], range2: number[], checkOverlap = false): boolean {
    if (range1[0] <= range2[0] && range1[1] >= range2[1])
        return true;
    if (range2[0] <= range1[0] && range2[1]>= range1[1])
        return true;

    if (checkOverlap) {
        if(isOverlapping(range1, range2) || isOverlapping(range2, range1))
            return true;
    }

    return false;
}

function isOverlapping(range1: number[], range2: number[]): boolean {
    return range1[0] <= range2[0] && range1[1] >= range2[0];
}