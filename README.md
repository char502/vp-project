# VP-Project (made with create-react-app)

- App runs in react
- Use 'git pull' to pull the repo down locally
- Use `npm start` to run the app

## Technologies used

- Create-react-app
- TypeScript
- Tailwind CSS (for styling)
- FontAwesome (for star rating component)

## What was Done

## Working with the static data

- Initially unable to get the data via api call
- So focused on creating the cards and the responsive layout with the static data (example-payload.json) so as not to lose time
- Created a reusable card layout (including TypeScript types) and mapped through the product data to display a grid of cards
- Implemented some features shown in the card example (i.e. created a star rating component and conditionally rendered the bestseller banner)

- implemented the Sort By feature on the static data, starting with 'initial list' then enabling the option to sort by 'lowest price first' or 'highest price first'

- Implemented a Filter feature in the sidebar - clicking on the checkboxes filters by brand (numerous brands can be selected at once)

## Finally figured out how to make the api call ([Shown in a separate branch off the main branch](https://github.com/char502/vp-project/tree/started-example-with-fetched-data))

- Finally realised how to implement the POST request to get the data (a request body as a second argument to the fetch request after the URL)
- Implemented this in a separate branch (off the main branch above), which can be found [here](https://github.com/char502/vp-project/tree/started-example-with-fetched-data)

- Did not have much time left so just had a go at implementing a couple of features
- Added Error handling in the fetch request (covered it in a course recently and wanted the practice)

- Able to implement sorting by 'Recommended', 'Price Low to High', 'Price High to Low' and 'Largest Discount' using api calls
- Implemented Pagination using api calls but it has a small bug (explained in App.tsx):

## What more could be done with more time

- Fixed Pagination in the fetched data branch version
- Moved all sorting, filtering and Pagination logic to their own components
- Investigate the response returned from the api to fix the pagination bug and add filtering functionality to the app via api calls
