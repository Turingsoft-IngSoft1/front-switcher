// iniciar con node initGame.js

import puppeteer from 'puppeteer';

(async () => {
    // Lanzar el navegador en modo normal
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const ownerPage = await browser.newPage();
    
    // Navegar a la página
    await ownerPage.goto('http://localhost:5173/');

    // Rellenar un formulario
    await ownerPage.type('#formUsername', 'ElOwner');
    await ownerPage.type('#formGameTitle', 'PartidaAuto');
    await ownerPage.type('#formMinPlayers', '2');
    await ownerPage.type('#formMaxPlayer', '3');

    // Hacer clic en el botón de crear partida
    await ownerPage.click('#crear-partida-btn');

    const player1Page = await browser.newPage();
    await player1Page.goto('http://localhost:5173/');
    const rows = await player1Page.$$('table tbody tr'); // Selecciona todas las filas
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
    




    // No cierres el navegador
    // await browser.close(); // Comentar o eliminar esta línea para mantener el navegador abierto
})();
