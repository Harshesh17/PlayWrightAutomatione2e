//const {test}= require('@playwright/test');
import { test, expect } from '@playwright/test';



test.skip('First Playwright Test', async ({browser }) =>
{

    const context = await browser.newContext();
    const page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.close();
    await context.close();
});


test.skip('Using only Pagefixture' ,async({page}) =>
{
    //const page = await browser.newPage();
   await page.goto("https://google.com");
   await expect(page).toHaveTitle("Google");
   await page.close();
});


test.skip('login page with invalid credentials', async({page}) =>
{
    const username = page.locator('#username')
    const password = page.locator('#password')
    const signin =page.locator('#signInBtn')

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await signin.click();

    console.log(await page.locator("[style*='block']").inputValue ());
    await expect(page.locator("[style*='block']")).toContainText("Old");
    await page.screenshot({path:'screenshot.png'});
    await page.close();

});


test.skip('login page with valid credentials', async({page}) =>
{
    const username = page.locator('#username')
    const password = page.locator('#password')
    const signin =page.locator('#signInBtn')
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signin.click();

    // await page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop");
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText("Learning@830$3mK2");
     await page.screenshot({path:'screenshot2.png'});
     await page.close();
});


test.skip('login page and selecting a product', async({page}) =>
{
    const username = page.locator('#username')
    const password = page.locator('#password')
    const signin =page.locator('#signInBtn')
    const cards = page.locator('.card-body a');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signin.click();

    await page.screenshot({path:'screenshot2.png'});

    console.log(await cards.first().textContent());
    console.log(await cards.nth(1).textContent());
    const allTitles = await cards.allTextContents();
    console.log(allTitles);
    await page.close(); 



});

test('UI Controls',async({page}) =>

    {
        
        const username = page.locator('#username')
        const password = page.locator('#password')
        const signin =page.locator('#signInBtn')
        const dropdown=page.locator('select.form-control');
        const blinkinglink = page.locator("[href*='documents-request']");
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await username.fill("rahulshettyacademy");
        await password.fill("Learning@830$3mK2");
        //radio button handling
        await page.locator('.radiotextsty').last().click();
        await expect(page.locator('.radiotextsty').last()).toBeChecked();
        await page.locator('.btn.btn-success').click();
        //dropdown handling
        await dropdown.selectOption('consult');
        //checkbox handling
        await page.locator('#terms').click();
        await expect(page.locator('#terms')).toBeChecked();
        await page.locator('#terms').uncheck();
        await expect(page.locator('#terms')).not.toBeChecked();
        //clicking on sign in button
        await page.locator('#signInBtn').click();

        // blinking text handling
      //  await expect(blinkinglink).toBeVisible();
        await expect(blinkinglink).toHaveAttribute('class','blinkingText');
        

    
        
    });

    test('blinking link test', async ({ browser }) => 
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        const blinkinglink = page.locator("[href*='documents-request']");

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            blinkinglink.click(),
        ]);

        console.log(await newPage.locator(".red").textContent());
        const text = await newPage.locator(".red").textContent();
        const arraytext= text.split("@");
        const domain = arraytext[1].split(" ")[0];
        console.log(domain);
        await page.locator('#username').type(domain);
        await expect(page.locator('#username')).toHaveValue(domain);
        await page.pause();


    //     const page1Promise = page.waitForEvent('popup');
    //     await page.getByRole('link', { name: 'Free Access to InterviewQues/' }).click();
    //     const page1 = await page1Promise;
    //     console.log(await expect(page1.locator('#interview-material-container')).toContainText('Please email us at mentor@rahulshettyacademy.com with below template to receive response'));
     });