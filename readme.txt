This project implements a Python Django-based eRationing system to improve and digitize the public foodgrain 
distribution system in India.


Features:

    Three user types:
        
        Cardholder:
            View available shops and their stock.
            Place ration orders.
            See order history and status.
            Provide feedback on shopkeepers.
        
        Shopkeeper:
            View pending and completed orders and update their status if completed.
            View stock levels.
            View customer feedback.
        
        Admin:
            Add, modify, or remove users.
            Manage user details (shopkeeper, cardholder).
            Access complete system data.


Technologies Used :

    Python(Django Framework)
    MySQL server
    MySQL Workbench(Recomended)
    React JS


DB design:

    Precise details about all the tables of our database schema are given in eRation DB Design.xlxs file attached.


Pre-Requisites (before running the project code): 

    Live MySQL server
    The database for the project has been configured in My SQL Workbench which needs a local instance with 
    the following details :-
    NAME: erationdb
    USER: root
    PASSWORD: mysqlPassword
    HOST: 127.0.0.1 
    PORT: 3306


Frontend Pages Structure:

    The application utilizes a multi-page structure to cater to different user types.

    1. Home Page:
        Serves as the landing page for all users.
        Contains prominent login button.
    
    2. Login Page:
        Provides separate login forms for Cardholder and Shopkeeper.
        Validates user credentials and redirects to respective user Homepages upon successful login.

    3. User Homepages:
        
        Cardholder Homepage:
            Displays user name and welcome message.
            Shows details and status of the most recent order.
            Lists available shops with available stock.
            Offers "Order History" button for past order details.
            Provides "Profile" button for managing personal information.

        Shopkeeper Homepage:
            Displays current inventory items and their quantities.
            Presents buttons for "Pending Orders" and "Completed Orders" management.
            Offers "Feedback" button to view customer feedback.

        Admin Homepage:
            Provides functionalities for user management (add, modify, remove).
            Offers access to complete system data and reports.

    4. Additional Pages:

        Order History:
            Cardholder-specific page listing all past orders with details.
            Allows feedback submission for individual orders.

        Profile:
            Enables Cardholder to view and edit personal information.

        Pending Orders:
            Shopkeeper-specific page listing pending orders.
            Allows order status update (Pending to Completed).
        
        Completed Orders:
            Shopkeeper-specific page listing completed orders.
        
        Feedback:
            Shopkeeper-specific page displaying customer feedback.

        Shop Details:
            Displays item details and stock information for a selected shop (Cardholder view).
        
        Place Order:
            Allows Cardholder to select items and place an order from a chosen shop.