import { Player } from './player';
import { Map } from './map';
import { commandPrompt, validateCommand } from './turn-prompt';

function initializeMap() {
    const map = new Map();

    const room1 = map.createRoom({ x: 0, y: 0 });
    room1.name = 'Foyer';
    room1.description = 'You are staning in the entryway to the house.'

    const room2 = map.createRoom({ x: 1, y: 0 });
    room2.name = 'Dining Room';
    room2.description = 'This formal dining room is set for 18 guests, but nobody has been here in ages.';

    const door = map.createPortal();

    room1.addExit('e', door.id);
    room2.addExit('w', door.id);

    return map;
}

function initializePlayer() {
    // any initialization logic goes here
    const player = new Player();
    return player;
}

interface PlayerPosition {
    x: number;
    y: number;
}

export class Game {
    player: Player;
    map: Map;
    position: PlayerPosition;
    turn: number;

    constructor() {
        this.map = initializeMap();
        this.player = initializePlayer();
        this.position = { x: 0, y: 0 };
        this.turn = 0;
    }

    start(turnHandler: (cmd: string, opts?: string[]) => void) {
        this.execTurn(turnHandler);
    }

    async execTurn(turnHandler: (cmd: string, opts?: string[]) => void) {
        this.turn += 1;

        const { cmd, opts } = await commandPrompt();

        // handle the turn, then move on
        await turnHandler(cmd, opts);
        this.execTurn(turnHandler);
    }
}

