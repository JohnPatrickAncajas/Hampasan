function swapPage(page) {
    const pageDisplay = document.getElementById('pageDisplay');
    if (page === 'menu') {
        pageDisplay.innerHTML = `
        <h1>Menu</h1>
        <p>Dito lagay yung character tapos palit palit ng weapons</p>`;
    } else if (page === 'fight') {
        pageDisplay.innerHTML = `
            <div class="fightingDiv">
                <div class="fightBox">
                    <p>Character</p>
                </div>
                <div class="fightBox">
                    <p>Hahampasin</p>
                </div>
            </div>
        `;
    } else if (page === 'gacha') {
        pageDisplay.innerHTML = `
            <h1>Gacha</h1>
            <p>Lagay mo dito yung gacha mo</p>
        `;
    }
}