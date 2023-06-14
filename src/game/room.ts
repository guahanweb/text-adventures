import { randomUUID } from 'crypto';
import { Item } from './item';

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

    addItem(item: Item) {
        this.items.push(item);
    }

    removeItem(id: string) {
        let item: Item|null = null;

        this.items = this.items.filter((curr: Item) => {
            if (curr.id === id) {
                // remove from the array
                item = curr;
                return false;
            }

            return true;
        });

        return item;
    }
}
