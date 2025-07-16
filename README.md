# Job Management App

## Description 

The **Job Management App** helps users efficiently manage their job orders and related data, including Jobs and Clients. Users can create, edit, and delete Jobs, Clients, and Orders to suit their business needs. Each Order includes a **status** and a **due_day**, allowing users to stay organized and focused on specific tasks. Additionally, users can add notes to each Client's profile to keep track of special requirements or preferences for future reference.

## Table Of Contents 

- [Work Environment](#work-environment)

- [Home](#home)

- [Profile](#profile)

- [Create Movie](#create-movie)

- [Signup](#signup)

- [Login](#login)

- [Ticket Card](#ticket-card)
  

## Work Environment  

The **Job Management App** is a full-stack web application built with **React** on the front end and **Flask** (Python) on the back end. On the front end, it utilizes the **useContext** hook to manage and share Jobs and User data across multiple components, enabling smooth and centralized state management.
On the back end, the app is powered by the **Flask** framework, along with key tools such as **SQLAlchemy** for database interaction and **Marshmallow** for data serialization and validation.
The development servers run on different ports:
The back end runs on port 5555
The front end runs on port 3000

As a result, the app's pages can be accessed locally at the following URLs:  
- Signupt: - <http://localhost:3000/register>
- Login: -<http://localhost:3000/login>
- Home: - <http://localhost:3000/home>
- User Profile: -<http://localhost:3000/profile> 

## Login/Register

When a user opens the app in the browser, the first screen they see is the **Register** page with a registration form. New users can fill out the form with a **valid username**, **email address**, and matching **password** and **password confirmation** to create an account.
If the user already has an account, they can simply click on the Login option and sign in using their existing username and password.

## Home

After login to **Job Management App**, the user will directed to the **Home page**. 
On the this page, users can see *Welcome, Username* message and **Create New Job** button directly under it. Below the create button there is a list of job cards. Each card on this list has a **Title** and below it **View Details** and **Create Order** buttons. if user clicks on the **Create New Job** button, then it directs him/her to *new_job* directory. If the user clicks **View Details** button, then he/she will be directed to page where more info about the job displayed. Similarly, if he/she clicks on **Create Order**, then the user goes to *new_job* route.

After logging into the **Job Management App**, the user is redirected to the **Home page**. At the top of the page, a personalized message—"*Welcome, [Username]*"—is displayed, followed by a **Create New Job** button.
Below the button is a list of job cards. Each card displays a **Job Title**, along with two buttons: **View Details** and **Create Order**.
* Clicking **Create New Job** takes the user to the /new_job route, where they can add a new job.
* Clicking **View Details** navigates to a page that shows more detailed information about the selected job.
* Clicking **Create Order** also redirects the user to the /new_job route, allowing them to create an order associated with that job.

## Profile

Each **Movie Card** displays the movie title in the top-left corner. 
There are also two dropdown menus: one for selecting the **number of tickets** and another for choosing the **showtime**.
The card shows the **ticket price** and the t**otal price**, which initially is $0.00. 
When the user selects the number of tickets, the **Total Price** updates automatically. 
At the bottom of the Movie Card, there is a **Buy Ticket** button. When the user clicks this button, they are redirected to the **Profile** page.

## Create Movie

At the bottom of the **Home** page, there is a **Create a New Movie** section. 
If a user wants to add a new movie to the list, they can fill out the form and click the **Create Movie** button. 
Once the button is clicked, the new movie will appear in the movie list.

## Signup  

When a user clicks on **Signup** button signup page will open up. 
The user can fill out the form by entering **Username**, **Password** and **Password Confirmation**. 
Once the form is submitted, the app saves the entered credentials, and the user is redirected directly to the **Profile** page. 

## Login

If a user wants to log in, they can click the **Login** button located at the top-right corner of the page.
A login form will appear in a window.
The user must enter their **Username** and **Password**, then click the **Login** button at the bottom of the form.
If the login is successful, the user will be redirected to their **Profile** page.
If the login fails, an error message ***"Username or password is incorrect"*** will be displayed.

## Profile Old

After signing up or logging in, the user can view their purchased tickets on the **Profile** page.
At the top-left corner, a welcome message appears: **"Welcome, (Username)!"**
Below the welcome message, there is a title that says **"Your Tickets:"** followed by the list of purchased tickets.

If the user wants to purchase more tickets, they can return to the **Home** page and select additional movies from the **Movie List**.

## Ticket card

Each ticket card displays information such as the **number of tickets**, **showtime**, **ticket price**, and **total price**.
Users can modify their tickets by adjusting the number of tickets or selecting a different showtime from the dropdown menu.
When the number of tickets is changed, the **Total** updates automatically.
If a user no longer wishes to watch a movie, they can delete the ticket by clicking the **Delete** button on the corresponding ticket card.
