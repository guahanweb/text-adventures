import chalk from 'chalk';
import {
    input,
} from '@inquirer/prompts';

export function commandPrompt(): Promise<{cmd: string, opts: string[]}> {
    return new Promise((resolve, reject) => {
        input({
            message: 'command:',
            validate: validateCommand,
        }).then((answer) => {
            // todo: parse command
            const result = parseCommand(answer);
            resolve(result);
        }).catch((err: any) => {
            reject(err);
        });
    });
}

export function validateCommand(value: string) {
    if (!/^([a-z]+)(\s.+)?$/.test(value)) {
        return `unrecognized command: ${chalk.yellow(value)}, try ${chalk.cyan('help')}`;
    }

    return true;
}

export function parseCommand(value: string) {
    const parts = value.split(' ');
    const cmd = parts[0];
    const opts = parts.slice(1).map((v: string) => v.trim());

    return { cmd, opts };
}
