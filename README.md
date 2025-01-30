# Cambridge Mobile Telematics - Board Game

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the required node modules for running the project. \

### `npm start`

Runs the app in the development mode.\
It should automatically open a new tab in a web browser window. If it does not, open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## The Game
Starts with an empty 5x5 table. \
When you click a cell its value is set to C, M or T. \
Once a cell value is set it cannot change anymore. \
The C,M,T values are provisioned in round robin order. The first cell you click is set to C, the second to M, the third to T, then the fourth to C again and so forth. \
If three or more identical consecutive characters align along a line, horizontally, vertically or diagonally then their color changes to indicate that they are part of a line (C-s green, M-s blue and T-s red). \
When the table is full, the game score is displayed. \
You do not get extra points for longer lines. \
Reset button clears the board and resets the game.