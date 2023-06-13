import type { Game } from '../lib/game';
type RouteHandler = (opts?: string[]) => void;

import quitCommand from './quit';

type RouteMapping = {
    [key: string]: RouteHandler;
}

const routes: RouteMapping = {};

export function initialize(game: Game) {
    // route all handlers here
    command('q', quitCommand(game));
    command('quit', quitCommand(game));
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
