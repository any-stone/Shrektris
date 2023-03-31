# Shrektris
## Tetris-like Shrek themed game

This is going to be a classic Tetrtis remake, Shrek-styled. The initial ambitious goal was to make Tetris shapes with Shrek's face and ears. Also add background and buttons with Shrek or others from the Movie. Adding nice sounds is another goal.
I'm not sure how much my design skills will be enough for all this, so the main goal is to make the project fully functional and good looking. With or without Shrek ears.

## Pseudocode for the overall gameplay

1. Start program
2. Set game state to game-start
3. Start new game
4. Create a a first piece (random of 7 possible pieces) and draw it at the top of the gamefield
5. THe piece is moving down on it's on
6. According to user input, the piece is moving left/right/down or rotating
7. When grid lines of gamefield are complete below, clear line, move all affected pieces down necessary grid units and increment score
8. Depending on score eventually increase game level and game speed
9. If piece collides with another piece and is at top of the gamefield, set game state to gameOver
10. End game and display the score, prompt user to start again