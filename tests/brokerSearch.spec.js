// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.yavlena.com/en/broker?city=Sofia');
});


test.describe('All brokers in Sofia', () => {
    test('should retrieve details for each broker after searching each of them', async ({ page }) => {

        // Wait for the 'Understood' button to appear and become visible
        const understoodButton = 'button:text("Understood")';
        await page.waitForSelector(understoodButton);

        // Click the button
        await page.click(understoodButton);

        // Extract text from all <h6> tags
        const brokerNames = await page.evaluate(() => {
            // Function to extract text from <h6> tags
            const names = [];
            document.querySelectorAll('h6').forEach(element => {
                if (element.textContent) {
                    names.push(element.textContent.trim());
                }
            });
            return names;
        });

        // Output the extracted text from <h6> tags
        console.log('Text from <h6> tags:');
        console.log(brokerNames);

        // Select the search input field by ID
        const inputSelector = '#broker-keyword';
        await page.waitForSelector(inputSelector);

        // Iterate through the names array and input each name
        for (const name of brokerNames) {
            // Clear existing text (if any)
            await page.fill(inputSelector, ''); // Clearing existing value

            // Type the current name into the input field
            await page.fill(inputSelector, name);

            // Optionally wait for a short period between inputs
            await page.waitForTimeout(1000); // Adjust timeout as needed

            // Get all search results
            const searchResults = await page.$$('[class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-1 MuiGrid-grid-sm-1 MuiGrid-grid-md-1 MuiGrid-grid-tablet-1 MuiGrid-grid-lg-1 MuiGrid-grid-xl-1 mui-style-rstqa8"]');
            expect(searchResults.length).toBe(1);

            // Check that number of properties is visible for each broker
            const numberOfProperties = page.locator('.MuiTypography-root.MuiTypography-inherit.MuiLink-root.MuiLink-underlineHover.mui-style-1ya14h1');
            expect(numberOfProperties).toBeVisible();

            // Click on details button
            const brokerDetailsButton = 'button:text("Details")';
            await page.click(brokerDetailsButton);

            // Wait for Contact us button to be visible
            await page.waitForSelector('a:text("Contact us")');

            // Check that the address is visible
            const address = page.locator('.MuiTypography-root.MuiTypography-textSmallRegular.mui-style-1ya7gnz');
            expect(address).toBeVisible();

            // Check that the 2 phone numbers are visible
            const firstPhoneNumber = page.locator('data-testid=PhoneOutlinedIcon').nth(0);
            expect(firstPhoneNumber).toBeVisible();
            const secondPhoneNumber = page.locator('data-testid=PhoneOutlinedIcon').nth(1);
            expect(secondPhoneNumber).toBeVisible();


        }

    });
});


