import { randomUUID } from "crypto";

export class Item {
    id: string; // identifier (uuid)
    titles: string[]; // match on these words
    name: string; // use this to display
    description: string; // basic information
    verbose: string | null; // additional information
    obtainable: boolean; // can be picked up?

    constructor() {
        this.id = randomUUID();
        this.verbose = null;
    }

    examine() {
        return this.verbose || 'You see nothing special about it.';
    }
}
