import fs from 'node:fs';
import readline from 'node:readline';

export async function day3(): Promise<void> {
    let sumPriorities = 0;
    const fileStream = fs.createReadStream('src/day3/input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const firstHalf = line.substring(0, line.length / 2);
        const secondHalf = line.substring(line.length / 2);
        const commonChar = firstHalf.charAt(
            firstHalf.split("").findIndex((element: string) => secondHalf.includes(element)));
        if (/^[a-z]+$/.test(commonChar)) 
            sumPriorities += parseInt(commonChar, 36) - 9;
        else
            sumPriorities += parseInt(commonChar, 36) - 9 + 26;
    }

    console.log(`Day 3: 
    Part 1) The sum of priorities is: ${sumPriorities}.`);
}
