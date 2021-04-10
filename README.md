# Budget Calculator
This Application is designed using Javascript, CSS and HTML

## Ground Rules
* Monthly Income modal.
    * User can't access the application without providing the valid date in the monthly income modal.
    * User need to provide valid monthly income and budget ending date.
    * Budget ending should be greater than today's date.

* Main Screen - Contains Budget, savings, expense and balance details. It has modify budget button and add expenses button to modify budget and add expenses resp.
    * Default value of budget is 20% of the monthly income. User can change it by using modify budget button.
    * Expense can be fixed or variable, default value is 0.
    * Savings is calculated based on expenses added and monthly income.
    * Balance is different between budget and expenses.

* Modify Budget modal.
    * User can modify budget value using this modal.

* Add expense Modal - Contains list of expenses added(upto 5) and countdown to budget ending date.
    * User can add various expenses.
    * Select type of expenses and then provide valid data.
    * For fixed expense there are further sub categories that can be selected.
    * Fixed expenses can't be deleted once added but can be modified.
    * Variable expenses can be deleted/updated once added.
    * At a time only 5 expense will be displayed.
    * If there are more than 5 expenses then view all button will be displayed.
    * Clicking on view all will open list of all expenses.

* All Expenses modal - Contains list of all expenses.
    * User can modify/delete various expense using edit and save button.
    * User can delete multiple expenses using checkbox and delete button.
    * Values added here will be updated across the Application.
    * User can close this modal only with Escape key.

## Coding Part
##### Styling
* Bootstrap 3 CSS file has been used for standard styling.
* styles.css file has been used to add extra styling to modal, table and other elements.

##### Image
* Background.jpg image has been used to cover main screen content when modal in visible on screen.

##### HTML file 
* This file has all the elements like modal, table, list, etc.

##### JS file
* This file has all the functions and validations for various field based on user input.
* Also script.js has countdown value based on budget ending date to notify user.
