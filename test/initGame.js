// iniciar con node initGame.js

import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const ownerPage = await browser.newPage();
    
    await ownerPage.goto('http://localhost:5173/');

    // Rellenado del form e inicio
    await ownerPage.type('#formUsername', 'ElOwner');
    await ownerPage.type('#formGameTitle', 'PartidaAuto');
    await ownerPage.type('#formMinPlayers', '2');
    await ownerPage.type('#formMaxPlayer', '3');
    await ownerPage.click('#crear-partida-btn');

    // Entrada a la partida recién creada
    const player1Page = await browser.newPage();
    await player1Page.goto('http://localhost:5173/');
    const rows = await player1Page.$$('table tbody tr');
    for (const row of rows) {
        const text = await row.evaluate(el => el.innerText);
        if (text.includes('PartidaAuto')) {
            await row.click();
            break;
        }
    }
    
    await player1Page.click('.join-btn');
    await player1Page.type('.modal-body input', 'player1');
    await player1Page.click('.modal-footer .btn-success');

    await ownerPage.click('.start-button');

    /*
        Si se quieren mas jugadores..
    const player2Page = await browser.newPage();
    await player2Page.goto('http://localhost:5173/');
    await player2Page.click('table tbody tr:first-child');
    await player2Page.click('.join-btn');
    await player2Page.type('.modal-body input', 'player2');
    await player2Page.click('.modal-footer .btn-success');

    */
    
})();
