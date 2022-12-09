import { readFile } from '../utils/utils';

export async function day6(): Promise<void> {
    const rl = readFile('src/day6/input.txt');

    let charactersProcessedPart1 = 0;
    let charactersProcessedPart2 = 0;
    for await (const line of rl) {
        charactersProcessedPart1 = findCharactersProcessed(line, 4);
        charactersProcessedPart2 = findCharactersProcessed(line, 14);
    }

    console.log(`Day 6: 
    Part 1) The number of characters processed to find four distinct characters: ${charactersProcessedPart1} characters.
    Part 2) The number of characters processed to find fourteen distinct characters: ${charactersProcessedPart2} characters. \n`);
}

function findCharactersProcessed(line: string, nbDistinctChars: number): number {
    const lineSplitted = line.split('');
    let charactersProcessed = 0;

    const fourChars: string[] = [];
    for (const character of lineSplitted) {
        fourChars.push(character);
        
        if (fourChars.length === nbDistinctChars && [...new Set(fourChars)].length === nbDistinctChars)  {
            charactersProcessed = line.indexOf(fourChars.join("")) + nbDistinctChars;
            break;
        }

        if (fourChars.length === nbDistinctChars) {
            fourChars.shift();
        }
    }
    return charactersProcessed;
}