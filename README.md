# Pawfect Events

Welcome to **Pawfect Events**, a fullstack web application designed for individuals and Individuals acting on behalf of companies who specialise in hosting dog-related events. Whether you're an event organiser or a dog enthusiast, this platform enables users to create, share, and join dog-centered events with ease.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [API Integrations](#api-integrations)
5. [Installation & Setup](#installation--setup)
6. [Testing](#testing)

## Project Overview

**Pawfect Events** serves as a centralised platform for users to discover, organise, and participate in various dog-related events. The app provides organisers with the tools to create and manage events, while users can browse available events, sign up, and keep track of their upcoming events.

Whether it's a dog-walking meetup, a dog agility competition, or a dog training workshop, Pawfect Events allows users to explore different types of events tailored to their interests.

### Core Functionality
- Event organisers can create, update, and delete events.
- Users can sign up for events, opt out of events, and view their registered events on their homepage.
- Events can be filtered, sorted, and ordered based on user preferences.
- Integration with Google Calendar allows users to add events to their personal calendars with a single click.

## Features

### General User Features
- **Browse Events**: Users can view a list of available dog events on the homepage.
- **User Registration**: Users can create an account by providing a username, email, and password.
- **User Login**: Registered users can log in with their email and password.
- **Event Details**: Users can click on an event to view details, including the list of attendees.
- **User Profile Page**: Once logged in, users can view events they’ve signed up for on their user profile page.
- **Opt-out from Events**: Users can opt out of events they’ve signed up for directly from the event pages themselves.
- **Add to Google Calendar**: Users can add events to their Google Calendar for easy tracking.

### Event Organiser Features
- **Browse Events**: organisers can view a list of available dog events.
- **Create Events**: organisers can create new events with details like title, description, start and end times, event type, and price (free or paid).
- **Update Events**: organisers can edit event details, including title, description, and timings.
- **Delete Events**: organisers can delete events they’ve created.
- **View Attendees**: organisers can see a list of users who have signed up for their events.

### Potential Future Features
- **Email Notifications**: Users can opt in to receive notifications when they sign up for events.
- **Event Reminders**: Option to receive reminder emails a day before an event takes place.
- **Geolocation**: Users can enable geolocation to view how far an event is from their current location.
- **Cancellation Notifications**: When an organiser deletes an event, they can send notifications to attendees, either via email or on the platform, informing them of the cancellation.
- **Multiple Event Timeslots**: Additional event timeslot options so that users can choose which date and time best suits them.

## Tech Stack

### Front End
- **React**: The web app is built using React for a responsive, dynamic user interface.
- **Tailwind CSS**: Used for styling and creating a sleek, modern UI.
- **React Bootstrap**: Additional UI components such as modals, forms, and buttons.
- **Axios**: For more ease of use when handling API requests between the front end and back end server.

### Back End
- **Node.js**: JavaScript runtime used to build the back-end server.
- **Express**: A minimal and flexible & unopinionated Node.js web application framework.
- **PostgreSQL**: Relational database to store user and event data.
- **Pg-format**: Utility to safely construct SQL queries.
- **Nodemon**: Used during development for automatic server restarts when file changes are detected.

### Testing
- **Jest**: JavaScript testing framework for unit and integration tests.
- **Supertest**: For testing HTTP requests and API endpoints.

## API Integrations
- **The Dog API**: Provides random dog images for event pages or user profiles to give the app a fun and personalized touch.
- **ImgBB API**: Allows users and event organisers to upload and store their images for their events or profiles via a permanent web address.

## Installation & Setup

### Prerequisites
- Node.js (v21.2.0^)


