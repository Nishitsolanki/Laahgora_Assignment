# Video Upload API

## Introduction
This is a simple API built with Node.js, Express, Multer, and MongoDB that allows users to upload videos and process them asynchronously. The API utilizes cron jobs for processing uploaded videos.

## Installation
 Clone the repository:
 
   git clone <repository_url>
   cd Laahgora_Assignment
Install dependencies:

npm install
Set up environment variables:
Create a .env file in the root directory and provide the following variables:

makefile
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=3002
Start the server:
npm start


Database Schema
The MongoDB database schema for storing uploaded videos:


Cron Jobs
A cron job is scheduled to process uploaded videos every minute.
Another cron job is scheduled to log a message every two minutes.
