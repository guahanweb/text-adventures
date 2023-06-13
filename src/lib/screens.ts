import blessed from 'blessed';

export async function initialize() {
    const screen = blessed.screen({ smartCSR: true });
    const layout = blessed.layout({
        parent: screen,
        width: '100%',
        height: '100%',
        layout: 'inline',
    });
    const panel1 = blessed.box({
        parent: layout,
        top: '0',
        left: '0',
        width: '50%',
        height: '100%',
        content: 'Panel 1',
        style: {
            fg: 'white',
            bg: 'blue',
        },
    });
    const panel2 = blessed.box({
        parent: layout,
        top: '0',
        left: '50%',
        width: '50%',
        height: '100%',
        content: 'Panel 2',
        style: {
            fg: 'white',
            bg: 'red',
        },
    });

    screen.key(['escape', 'q', 'C-c'], function () {
        // clean up and exit
        screen.destroy();
        process.exit(0);
    });

    return screen;
}
