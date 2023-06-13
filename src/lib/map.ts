import { randomUUID } from 'crypto';
import { Item } from './item';

export class Portal {
    id: string;
    type: string;
    opened: boolean;
    locked: boolean;

    constructor() {
        this.id = randomUUID();
        this.type = 'doorway';
        this.opened = true;
        this.locked = false;
    }
}

type EgressDirections = 'n'|'s'|'e'|'w';
export type Exit = {
    direction: EgressDirections;
    portal: string; // portal UUID
}

export class Room {
    id: string;
    name: string;
    description: string;
    verbose: string;
    exits: Exit[];
    items: Item[];

    constructor() {
        this.id = randomUUID();
        this.exits = [];
        this.items = [];
    }

    addExit(direction: EgressDirections, uuid: string) {
        for (let i = 0; i < this.exits.length; i++) {
            const curr = this.exits[i];
            if (curr.direction === direction) {
                throw `room already has assigned exit in ${curr.direction} direction`;
            }
        }

        this.exits.push({ direction, portal: uuid });
    }
}

export class Map {
    portals: { [uuid: string]: Portal };
    rooms: { [uuid: string]: Room };
    layout: string[][]; // grid layout by uuid

    constructor() {
        this.portals = {};
        this.rooms = {};
        this.layout = [[]];
    }

    createPortal() {
        const portal = new Portal();
        this.portals[portal.id] = portal;
        return portal;
    }

    createRoom(coords: { x: number, y: number }) {
        const room = new Room();
        this.rooms[room.id] = room;
        this.layout[coords.y][coords.x] = room.id;
        return room;
    }
}
