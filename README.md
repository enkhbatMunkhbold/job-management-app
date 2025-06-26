# Phase5 Project - Freelancer Task Management App

## Description 

The **Movie Ticket** app allows users to purchase movie tickets by selecting their desired movie, showtime, and number of tickets. To use the app, users must first sign up or log in. Purchased tickets are saved to the logged-in user's profile. If a user wishes to buy more tickets, they can simply click the **Home** button to return to the homepage, where they can select and purchase additional movie tickets.

## Table Of Contents 

- [Work Environment](#work-environment)

- [Home (Unsigned)](#home-unsigned)

- [Movie Card](#movie-card)

- [Create Movie](#create-movie)

- [Signup](#signup)

- [Login](#login)

- [Profile](#profile)

- [Ticket Card](#ticket-card)
  

## Work Environment  

The **Movie Ticket** app is built in **React** (a JavaScript library) on the front-end and **Flask** (Python) on the back-end. 
The back-end runs on port 5555, and front-end runs on port 3000. Therefore, the app's pages are accessible at the following local URLs:
- Home: - <http://localhost:3000/>  
- Signupt: - <http://localhost:3000/signup>
- Login: -<http://localhost:3000/login>
- User Profile: -<http://localhost:3000/profile> 

## Home

When a user opens the **Movie Ticket** app, it first loads the Home page. 
On the Home page, users can view a list of available movies. 
To purchase movie tickets, a user must login. If the user does not have an account, they will need to signup first.

If a user already has an account, then the logged-in **Home** page will display **Movie Cards**, through which the user can purchase tickets. 

## Movie Card

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

## Profile

After signing up or logging in, the user can view their purchased tickets on the **Profile** page.
At the top-left corner, a welcome message appears: **"Welcome, (Username)!"**
Below the welcome message, there is a title that says **"Your Tickets:"** followed by the list of purchased tickets.

If the user wants to purchase more tickets, they can return to the **Home** page and select additional movies from the **Movie List**.

## Ticket card

Each ticket card displays information such as the **number of tickets**, **showtime**, **ticket price**, and **total price**.
Users can modify their tickets by adjusting the number of tickets or selecting a different showtime from the dropdown menu.
When the number of tickets is changed, the **Total** updates automatically.
If a user no longer wishes to watch a movie, they can delete the ticket by clicking the **Delete** button on the corresponding ticket card.
