import type { Game } from '../lib/game';
import { confirm } from '@inquirer/prompts';

export default function quit(game: Game) {
    return async function() {
        // process quitting the game
        const answer = await confirm({ message: 'are you sure you wish to quit?' });

        if (answer) {
            console.log('quitting...');
            process.exit(0);
        }
    }
}