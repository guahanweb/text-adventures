import type { Game } from '../game';
import chalk from 'chalk';

const directions = {
    n: 'north',
    e: 'east',
    s: 'south',
    w: 'west',
};

export default function look(game: Game) {
    return async function(opts?: string[]) {
        // look around or at an object
        if (!opts || !opts.length) {
            // just look around the room
            const room = game.getCurrentRoom();
            console.log(chalk.white('\nYou look at your surroundings...'));
            console.log(room.description);

            if (room.items.length) {
                console.log('\nThe following items can be seen nearby:');
                console.log(room.items.map((item) => `  ${chalk.white(item.description)}`).join('\n'));
            }

            console.log('');
            room.exits.forEach(({ direction, portal }) => {
                const exit = game.map.getPortal(portal);
                const message = `To the ${directions[direction]}, there is a ${chalk.yellow(exit.describe())}`;
                console.log(message);
            });

            console.log('');
            return;
        }
    }
}
