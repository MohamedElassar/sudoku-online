## Link to Game:
https://mohamedelassar.github.io/sudoku-online/

Click on the link above and have fun playing Sudoku!!

## How it Works:
1. A grid is initially displayed and the user is prompted to select a difficulty level: Easy, Medium, or Hard
2. Based on the user's selection, a request is sent to [this](https://github.com/bertoort/sugoku) API (credit to github user @bertoort) and a puzzle of appropriate difficulty is obtained 
3. The puzzle is then displayed to the user, and the user is free to interact with the puzzle by inputting values into the blank fields
4. Behind the scenes, the program runs a backtracking algorithm to obtain the solution for the displayed sudoku puzzle
5. If the user input is invalid (i.e. not a number between 1 and 9, inclusive), an alert message will be showed and the field is reset
6. The user can verify their solution at any point by clicking on the Verify button
7. If the user successfully completes the puzzle and clicks the Verify button, a message will appear congratulating the user
8. To start a new game, just click on the Clear All button to select a new difficulty level and start a new game
