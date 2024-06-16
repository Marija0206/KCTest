# KCTest

To run the tests you need to first clone the repo to your local machine with: git clone https://github.com/Marija0206/KCTest

After cloning the project run following commands:

1. `npm install`
2. `npx playwright test` - to run the tests in the background
3. `npx playwright test --ui` - to run the tests with ui enabled
4. `npx playwright show-report` - to see html reports

Note: The test is expected to fail, since after searching Daniel Krastev, there are 2 search results displayed, since there sre 2 brokers with the same First and Last name.
