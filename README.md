# Job Management App

## Description 

The **Job Management App** helps users efficiently manage their job orders and related data, including Jobs and Clients. Users can create, edit, and delete Jobs, Clients, and Orders to suit their business needs. Each Order includes a **status** and a **due_day**, allowing users to stay organized and focused on specific tasks. Additionally, users can add notes to each Client's profile to keep track of special requirements or preferences for future reference.

## Table Of Contents 

- [Work Environment](#work-environment)

- [Home](#home)

- [Profile](#profile)

- [Job Card](#job-card)

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

After logging into the **Job Management App**, the user is redirected to the **Home page**. At the top of the page, a personalized message—"*Welcome, [Username]*"—is displayed, followed by a **Create New Job** button. The navigation bar at the top of the website contains two buttons: **Profile** and **Sign Out**, with the **Profile** button is highlighted to indicate the current page.
Below the button is a list of job cards on the market. Each card displays a **Job Title**, along with two buttons: **View Details** and **Create Order**.
* Clicking **Create New Job** takes the user to the /new_job route, where they can add a new job.
* Clicking **View Details** navigates to a page that shows more detailed information about the selected job.
* Clicking **Create Order** also redirects the user to the /new_job route, allowing them to create an order associated with that job.

## Profile

When the user clicks the **Profile** button in the navigation bar, they are redirected to the **Profile page**. At the same time, the **Profile** button in the navigation bar changes to **Home**, allowing the user to navigate back.
At the top of the **Profile page**, the same personalized welcome message—“Welcome, [Username]”—is displayed. Below it are three buttons: **Show My Jobs**, **Show My Clients**, and **Create**. By default, the **Show My Jobs** button is highlighted when the user first lands on the page, and the highlight switches depending on which button is clicked.
A list of the user's own job cards is displayed below these buttons. When the user hovers over a job card, it animates slightly to indicate that it is active or focused.

## Job Card

There are two different job cards in the app, one is in the **Home** page, and the other one is on **Profile** page. 

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
