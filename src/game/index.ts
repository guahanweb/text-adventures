import { Player } from './player';
import { Map } from './map';
import { Room } from './room';
import { Item } from './item';
import { commandPrompt } from '../lib/turn-prompt';
import chalk from 'chalk';

function initializeMap() {
    const map = new Map();

    const candlestick = new Item();
    candlestick.name = 'candlestick';
    candlestick.description = 'tarnished candlestick';
    candlestick.obtainable = true;

    const room1 = map.createRoom({ x: 0, y: 0 });
    room1.name = 'Foyer';
    room1.description = 'You are standing in the entryway to the house.'

    room1.addItem(candlestick);

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

    getCurrentRoom(): Room {
        const room = this.map.getRoom(this.position);
        return room;
    }

    updatePosition(coords: PlayerPosition) {
        this.position = coords;

        const room = this.getCurrentRoom();
        console.log('');
        console.log(chalk.white(room.name));
        console.log(room.description);
        console.log('');
    }

    async execTurn(turnHandler: (cmd: string, opts?: string[]) => void) {
        this.turn += 1;

        const { cmd, opts } = await commandPrompt();

        // handle the turn, then move on
        await turnHandler(cmd, opts);
        this.execTurn(turnHandler);
    }
}

