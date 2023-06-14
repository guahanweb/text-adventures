import type { Game } from '../game';
type RouteHandler = (opts?: string[]) => void;

import quitCommand from './quit';
import lookCommand from './look';
import { pickup, drop, inventory } from './inventory';
import { move } from './move';

type RouteMapping = {
    [key: string]: RouteHandler;
}

const routes: RouteMapping = {};

export function initialize(game: Game) {
    // game controls
    command('quit', quitCommand(game));

    // inspection commands
    command('look', lookCommand(game));

    // inventory commands
    command('pickup', pickup(game));
    command('drop', drop(game));
    command('inventory', inventory(game));

    // movement commands
    command('move', move(game));
    command('go', move(game));
}

export function command(action: string, handler: RouteHandler) {
    routes[action] = handler;
}

export async function process(action: string, opts?: string[]) {
    const handler = routes && routes[action];

    // we need to have a global error case
    if (typeof handler === 'function') {
        await handler(opts);
    } else {
        // if we reach this point, it's an unrecognized action
        console.log('unkown action:', action);
    }
}
