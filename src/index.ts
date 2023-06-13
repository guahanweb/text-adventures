import { Game } from './lib/game';
import { initialize, process } from './commands';

if (require.main === module) {
    // if called directly, we will execute immediately
    main();
}

export async function main() {
    const game = new Game();

    initialize(game);
    game.start(async function (cmd: string, opts?: string[]) {
        await process(cmd, opts);
    });
}

