const puppeteer = require('puppeteer');

(async () => {
    // Take the urls from the command line
    var args = process.argv.slice(2);

    try {
        const browser = await puppeteer.launch();

        // loop over the urls
        for (let i = 0; i < args.length; i++) {

            const page = await browser.newPage();

            await page.setViewport({
                width: 1200,
                height: 630,
                deviceScaleFactor: 1,
            });

            await page.goto(args[i]);

            await page.addStyleTag({ path: 'cover.css' });

            await page.$eval('.page__body', e => {
                e.classList.add('cover');
                const img = new Image();
                img.src = '/images/favicon/logo-tips-512.png';
                img.classList.add('cover__img');
                e.prepend(img);
            });

            await page.screenshot({ path: `./screenshots/${i}.png` });

            // done!
            console.log(`✅ Screenshot of ${args[i]} saved!`);
        }

        // close the browser
        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();
