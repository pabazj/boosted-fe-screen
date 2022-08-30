
## Getting Started

Welcome to the Boosted Technology Technical Screener frontend interview. We're going to perform a quick live-coding react style interview focusing on getting data from an API, 

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


## Question 1:
Given an ETH address, and API key ( see /index ), create a user interface to display the latest 25 transactions (show hash, block, how old the transaction is, from address, to address, and value)

A) Create a button to fetch data using react hooks and the fetchETHData() function.
B) Create a table to show the above data, 25 results at a time 
C) Paginate the data.

## Question 2: 
Add a component that will show the total balance of the transactions.

## Question 3:
Extend the above functionality to include a button that when pressed will only show transactions with a non-zero value. The sum should also reflect this change.




