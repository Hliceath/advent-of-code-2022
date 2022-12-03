import fs from 'node:fs';
import readline from 'node:readline';

export function readFile(path: string): readline.Interface {
    const fileStream = fs.createReadStream(path);
    return readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    
}