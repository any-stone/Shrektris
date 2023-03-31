# Shrektris
## Tetris-like Shrek themed game

This is going to be a classic Tetrtis remake, Shrek-styled. The initial ambitious goal was to make Tetris shapes with Shrek's face and ears. Also add background and buttons with Shrek or others from the Movie. Adding nice sounds is another goal.
I'm not sure how much my design skills will be enough for all this, so the main goal is to make the project fully functional and good looking. With or without Shrek ears.

## Pseudocode for the overall gameplay

1. When the game is loaded, first thing the user sees is a screen with the Game name and text "Press START to play" 
2. Upon pressing START the playfield is created using the HTML Canvas tag. Canvas is used for the gamefield itself, for showing the game stats to the right of the screen, and to show the "next" piece upcoming. Canvas will be created through JS on step 6.
3. I will create the Game class to store score, lines, level and playfield initial state (which is going to contain 20 arrays of 0). The piece on the field will be represented with 1's. To move or rotate the shape we will need to change the 1's and 0's according to shape's moving trajectory. Game class will also contain the arrays to store the active piece and its coordinates using x and y axis. 
4. I will create methods inside of this class 
- 3 methods to make the active piece move on the playfield. To be completely clear, the piece and the playfield are not aware of each other's existence - I'm simply going to change x and y properties of the active piece to 1 or 0. So there are going to be at least 3 methods to move the active piece to the left, right and down. 
- 1 method to prevent the piece from moving outside of the playfield. It would work based on the playfield arrays width and height. This method would check if piece has moved outside of the playfield after every move by iterating thought the arrays of active piece and the playfield and checking its current value (not equal to 0). It also checks if the place on the playfield is vacant by checking the values of x and y. I will use if statements and "this" keyword to finish the checks.
- 1 method to move the coordinates of the current piece to the playfield (by iterating the accirding arrays). It will be called when the piece has reached the bottom or collided with another piece - therefore everytime after down movement is triggered. It also checks if the piece's current value is not 0.
- 1 method to bind the game array and the object in step 6, so that class Game passes the playfield state to the step 6 class for visualization of current game state. We will also need to return here the score and level.
- 1 method to update properties of Active piece and Next piece. It will generate a new piece after the old active piece is locked (reached the bottom or collided with other piece)
- 1 method to create a new piece. It will generate 1 of 7 possible pieces using Math.floor and Math.random. It will also store the names of the Pieces ("ITJLOSZ" string). We will iterate through this string, receive the letter and generate the piece shape according to it.
I - 4 blocks in a shape of straight line
T - 4 blocks in a shape of T letter
J - 4 blocks in a shape of J letter
L - 4 blocks in a shape of L letter
O - 4 blocks in a square
S - 4 blocks shaped like a capital S
Z - 4 blocks shaped like a capital Z
Each letter will be formed in an array of 0s and 1s where 1s form the shape of the piece. Each piece is generated in an initial state according to classical Tetris SRS system rotation (for I it is for 1s in the second row of 4 rows of 0s for eg)
- I will add one more playfield to the Game class to store the link to the Next piece. For this the new functions will be added to create pieces of different forms.
- 1 method to clear lines when the line of pieces is formed. It takes the rows starting from the lowest. We will check how many blocks are filled. If 10 blocks are filled, we delete this line. Can be implemented with two for loops iterating cycles and a variable to store the array of lines to be deleted. We also adding another for to loop through this new array if lines to be deleted, and not just delete them but add a new array above (can be done using splice and unshift methods).
- 1 method to update score after lines deletion. Takes the number of deleted lines as an argument. Can be implemented with if statement (if deleted lines > 0). When the level is higher, the score for the deleted lines is increasing. The level will be working as a miltiplicator, meaning the score will be multiplied on the level. Level is increasing every 10 deleted lines.
- Add a topOut check - it's official Tetris terminology to indicate the we have reached the top of the playfield. Add a condition - If the new piece appears and we have a collision, the game is over (topOut = true). The same check can be added to the "move piece down" functionality.
5. To implement the rotation of the piece I will use the official Tetris SRS system. I will create 4 arrays to store the ready-made piece configuration options for each rotation (containing 1s and 0s according to piece position). We are storing Left-Right-Down and initial position in these arrays. We will also need to store the current rotation in the variable. Next I'm creating a method that is going to use the arrays above to rotate the piece, it also should return to 0 position after 3rd. It can be done through if/else. 
6. To visualize the logic, I'm creating the View class that receives elements, width, height rows and columns. It will also create 2d canvas by appending it, with set width, height, columns and rows.
It will also include:
- 1 method to render playfield
- 1 method to render the side panel to show the level, score, lines and nextPiece. 
These methods is called when the game is initially rendered. 
7. There will be the method in the View class from step 6 that renders borders of the playfield. It will iterate through the playfield and draw something on each non-empty element (using for loop and if to check if empty). This is the place were we can draw the active piece according to its x and y coordinates, and set the color and stroke of the piece. Same method should also take care of cleaning out the previous position of the piece after it's being moved.
8. I also plan to add another class to control the interaction between the game and the view class. Include there:
- Start sreen render using method from View object to render Start Screen
- Event listener on keys for user to trigger the active piece moving and rotation. I'll also use keyCodes here to assign the movement to according arrows on keyboard. The View class will be updated according to pressed key. When the down arrow is pressed, the active piece will fall down fast.
- Add timer through setInterval to make pieces move down on its own. I will call the created method in the Game class to move piece down, update the screen and set the interval to ~1000. Speed will increase according to the game level. I will increase the speed by decrementing by 100miliseconds the initial 0 level speed every level. Also will need to add a check here so that the speed doesn't drop to 0.
- 2 Methods to put the game on pause, "play" and "pause". On pause we need to stop the timer with cancelInterval function, and to start the timer again when the user reterns to the game. 
- Add the check, if the game is playing, I show the main screen to the user, if paused - the paused screen we created in View class.
- Check whether the game is over - and render the appropriate screen from the View class.
- Add condition for the game state "game over" to render the game over screen from View class, and bind an enter button with the initial state of the game (to reset the game by pressing enter)