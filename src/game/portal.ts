import { randomUUID } from 'crypto';

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

    describe() {
        // we need to account for any portal types in the future
        const openState = this.opened ? 'open' : 'closed';
        const description = `${openState} ${this.type}`;
        return description;
    }
}

