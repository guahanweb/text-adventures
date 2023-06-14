import { Room } from './room';
import { Portal } from './portal';

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

    getPortal(uuid: string) {
        const portal = this.portals && this.portals[uuid];
        return portal;
    }

    getRoom(coords: { x: number, y: number }) {
        const row = this.layout && this.layout[coords.y];
        const id = row && row[coords.x];
        const room = this.rooms && this.rooms[id];
        return room;
    }
}
