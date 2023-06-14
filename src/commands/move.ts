import type { Game } from '../game';
import chalk from 'chalk';

const directions: any = {
    north: 'n',
    east: 'e',
    south: 's',
    west: 'w',
};

export function move(game: Game) {
    return async function(opts?: string[]) {
        if (!opts || !opts.length) {
            console.log('\nWhere would you like to go?');
            console.log('Try providing a direction.');
            console.log(`example: ${chalk.cyan('move')} ${chalk.white('south')}\n`);
            return;
        }

        const reqDirection = opts[0];
        const route = directions && directions[reqDirection];

        if (!route) {
            console.log('\nI don\'t know how to go that way!\n');
            return;
        }

        // now, we check to see if the room has a viable exit
        const room = game.getCurrentRoom();
        const exitId = room.exits.find((e) => {
            return e.direction === route;
        });

        if (!exitId) {
            console.log(`\nThere is no exit to the ${chalk.white(reqDirection)}!\n`);
            return;
        }

        const exit = game.map.getPortal(exitId.portal);
        if (!exit.opened) {
            console.log(`\nThe exit in that direction is ${chalk.red('closed')}!\n`);
            return;
        }

        // if we get here, we can actually move
        const coords = game.position;
        if (route === 'n') coords.y -= 1;
        if (route === 'e') coords.x += 1;
        if (route === 's') coords.y += 1;
        if (route === 'w') coords.x -= 1;
        game.updatePosition(coords);
    }
}