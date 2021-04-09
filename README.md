Application is about budget calculation based on monthly income, budget and user expenses

ON launch user will be displayed with monthly income modal 
Monthly Income modal -
    User can't access the application without providing the valid date in the monthly income modal
    user need to provide valid monthly income and budget ending date
    Budget ending should be greater than today's date

After providing valid data, main screen will be displayed with Budget, savings, expense and balance, modify budget button and add expenses button
    Default value of budget is 20% of the monthly income. User can change it using modify budget button
    expense can be fixed or variable, default value is 0
    savings is calculated based on expense till now and monthly income
    balance is different between budget and  expenses 
    
Modify Budget modal will be opened when clicked on modify budget button
    User can modify budget value usin this modal    

Add expense button will open add expense modal  having form to add expenses and to displayed countdown to budget ending date
    user can add various modal  
    select type of expenses and then provide valid data
    for fixed expense there are further sub categories that can be selected by user
    Fixed expenses can't be deleted once added but can be modified
    variable expenses can be deleted/updated once added
    at a time only 5 expense will be displayed
    if there are more than 5 expenses then view all button will be displayed
    clicking on view all will open list of all expenses

List of all expenses modal-
    user can modify/delete various expense using edit and save button
    user can delete multiple using checkbox and delete button
    values added here will be updated across the Application
    User can close this modal only with Escape key
    













Coding Part:
Styling:
Bootstrap 3 CSS file has been used for standard styling
styles.css file has been used to add extra styling to modal and table

image:
Background.jpg image has been used to cover main screen content when modal in visible on screen

budgetCalculator.html file has all the elements like modal, table, list 

script.js has all the functions and validations for various field based on user input
Also script.js has countdown value based on budget ending date to notify user
