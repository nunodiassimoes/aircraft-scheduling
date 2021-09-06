To run the app you can use:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run the tests you can use:

### `yarn test`

Things that could be done better:
- Some tests are missing but I would have implemented them if I had more time;
- The list of flights should be sent sorted by the BE. I didn't operate sort in the flights list because it would be messy with the lazy loading;
- When a flight is removed it goes to the end of the list of flights. Could be placed in the correct order if the list was sorted, but since I don't have it sorted I didn't wasted much time on that. 
