import fs from 'node:fs';
import readline from 'node:readline';

interface ultimateStrategyGuide {
    opponent: {
        A: number,
        B: number,
        C: number
    },
    you: {
        X: number,
        Y: number,
        Z: number,
    },
    winMoves: {
        A: string,
        B: string,
        C: string,
    },
    loseMoves: {
        A: string,
        B: string,
        C: string,
    }
}

const guide: ultimateStrategyGuide = {
    'opponent': { 'A': 1, 'B': 2, 'C': 3 },
    'you': { 'X': 1, 'Y': 2, 'Z': 3 },
    'winMoves': { 'A': 'Y', 'B': 'Z', 'C': 'X' },
    'loseMoves': { 'A': 'Z', 'B': 'X', 'C': 'Y' },
}

export async function day2(): Promise<void> {
    let totalScore = 0;
    let ultimateTotalScore = 0;
    const fileStream = fs.createReadStream('src/day2/input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        if (line === "") {
            continue;
        }
        const [opponentMove, yourMove] = line.split(' ');
        const opponentScore = guide.opponent[opponentMove as keyof ultimateStrategyGuide['opponent']];
        const yourScore = guide.you[yourMove as keyof ultimateStrategyGuide['you']]
        if (opponentScore == 1 || yourScore == 1) {
            if (opponentScore == yourScore) 
                totalScore += yourScore + 3;
            else if (opponentScore == 3)
                totalScore += yourScore + 6;
            else if (yourScore == 3)
                totalScore += yourScore + 0;
            else if (yourScore > opponentScore)
                totalScore += yourScore + 6;
            else
                totalScore += yourScore + 0;
        } else {
            if (yourScore > opponentScore)
                totalScore += yourScore + 6;
            else if (yourScore == opponentScore)
                totalScore += yourScore + 3;
            else 
                totalScore += yourScore + 0;
        }

        ultimateTotalScore += part2(opponentMove, yourMove);
    }

    console.log(`Day 2: 
    Part 1) Your score if everything goes as planned: ${totalScore} points.
    Part 2) Your real super ultimate score:  ${ultimateTotalScore} points. Good job following that guide! \n`);
}

function part2(opponentMove: string, yourMove: string): number {
    let totalScore = 0;
    const opponentScore = guide.opponent[opponentMove as keyof ultimateStrategyGuide['opponent']];
    if (yourMove == 'Y') {
        totalScore += opponentScore + 3;
    } else if (yourMove == 'X') {
        const moveToChoose = guide.loseMoves[opponentMove as keyof ultimateStrategyGuide['loseMoves']];
        totalScore += guide.you[moveToChoose as keyof ultimateStrategyGuide['you']] + 0;
    } else {
        const moveToChoose = guide.winMoves[opponentMove as keyof ultimateStrategyGuide['winMoves']];
        totalScore += guide.you[moveToChoose as keyof ultimateStrategyGuide['you']] + 6;
    }
    return totalScore;
}
