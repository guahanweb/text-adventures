import { Item } from './item';

export class Player {
    inventory: Item[];

    constructor() {
        this.inventory = [];
    }

    pickup(item: Item) {
        this.inventory.push(item);
    }

    drop(id: string) {
        let item: Item|null = null;

        this.inventory = this.inventory.filter((curr: Item) => {
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