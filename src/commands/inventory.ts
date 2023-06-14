import type { Game } from '../game';
import chalk from 'chalk';

export function inventory(game: Game) {
    return async function() {
        console.log('\nYou are currently carrying:');
        game.player.inventory.forEach((item) => {
            console.log(`  ${chalk.white(item.description)}`);
        });
        console.log('');
    }
}

export function pickup(game: Game) {
    return async function(opts?: string[]) {
        if (!opts || !opts.length) {
            // command without options needs clarity
            console.log('\nWhat would you like to pick up?');
            console.log('Try providing an item name.');
            console.log(`example: ${chalk.cyan('pick up')} ${chalk.white('candlestick')}\n`);
            return;
        }

        const reqItemName = opts[0];
        const room = game.getCurrentRoom();
        const item = room.items.find((curr) => {
            return curr.name === reqItemName;
        });

        if (!item) {
            // non matching item requested
            console.log(`\nThere doesn't seem to be a ${chalk.white(reqItemName)} nearby.\n`);
            return;
        } else if (!item.obtainable) {
            // cannot pick up this item
            console.log(`\nYou can't pick that up!\n`);
            return;
        }

        // if we reach this point, we have found the item
        game.player.pickup(room.removeItem(item.id));
        console.log(`\nYou picked up the ${chalk.white(item.description)}\n`);
    }
}

export function drop(game: Game) {
    return async function(opts?: string[]) {
        if (!opts || !opts.length) {
            console.log('\nWhat would you like to drop?');
            console.log('Try providing an item name.');
            console.log(`example: ${chalk.cyan('drop')} ${chalk.white('candlestick')}\n`);
            return;
        }

        const reqItemName = opts[0];
        const room = game.getCurrentRoom();
        const item = game.player.inventory.find((curr) => {
            return curr.name === reqItemName;
        });

        if (!item) {
            console.log(`\nYou are not carrying a ${chalk.white(reqItemName)}.\n`);
            return;
        }

        // if we reach this point, we can drop the item
        room.addItem(game.player.drop(item.id));
        console.log(`\nYou dropped the ${chalk.white(item.description)}\n`);
    }
}

