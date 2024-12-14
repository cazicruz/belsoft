# Endpoint Documentation For Task Posting API

## Resources

The resources provided by this API are listed as follows:


# API Documentation

This document provides Swagger documentation for the API endpoints exposed by the application.

## Users

### Get All Users
- **URL:** `/api/users`
- **Method:** `GET`
- **Description:** Get a list of all users.
- **Response:**
  - `200 OK`: Successfully retrieved users.
    - Response Body: Array of user objects.
  - `500 Internal Server Error`: Error getting users.

### Get User by ID
- **URL:** `/api/users/{id}`
- **Method:** `GET`
- **Description:** Get a user by their ID.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the user.
- **Response:**
  - `200 OK`: User retrieved successfully.
    - Response Body: User object.
  - `400 Bad Request`: Missing route parameter `ID` or user not found.
  - `500 Internal Server Error`: Error getting user.

### Update User
- **URL:** `/api/users/{id}`
- **Method:** `PUT`
- **Description:** Update a user's information.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the user.
- **Request Body:** JSON object with the following properties:
  - `username` (optional) - The new username.
  - `email` (optional) - The new email.
- **Response:**
  - `200 OK`: User updated successfully.
    - Response Body: Updated user object.
  - `400 Bad Request`: Missing route parameter `ID`, cannot update this user, or username or email is required.
  - `500 Internal Server Error`: Error updating user.

### Delete User
- **URL:** `/api/users/{id}`
- **Method:** `DELETE`
- **Description:** Delete a user by their ID.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the user.
- **Response:**
  - `200 OK`: User deleted successfully.
    - Response Body: Deleted user object.
  - `400 Bad Request`: Missing route parameter `ID` or cannot delete this user.
  - `500 Internal Server Error`: Error deleting user.

### Perform Task
- **URL:** `/api/tasks/{taskId}`
- **Method:** `POST`
- **Description:** Perform a task associated with a user.
- **Parameters:**
  - `taskId` (Path Parameter) - The ID of the task.
- **Response:**
  - `200 OK`: Task done successfully.
    - Response Body: Task details.
  - `400 Bad Request`: Missing route parameter `ID`, user not found, task not found, user already did the task, or insufficient balance.
  - `500 Internal Server Error`: Error performing the task or funding referals.

## Authentication

### Register User
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:** JSON object with the following properties:
  - `username` (string, required) - The username of the user.
  - `password` (string, required) - The password of the user.
  - `email` (string, required) - The email address of the user.
  - `referer_code` (string, optional) - The referral code, if provided.
- **Response:**
  - `200 OK`: User registered successfully.
    - Response Body: Registered user details.
  - `400 Bad Request`: Missing username, password, or email, or user already exists.
  - `500 Internal Server Error`: Error during registration.

### Login
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Log in with user credentials.
- **Request Body:** JSON object with the following properties:
  - `email` (string) - The user's email address.
  - `password` (string) - The user's password.
- **Response:**
  - `200 OK`: Successfully logged in.
    - Response Body: Access and refresh tokens.
  - `400 Bad Request`: Invalid credentials.
  - `500 Internal Server Error`: Error during login.

### Token Refresh
- **URL:** `/api/auth/token-refresh`
- **Method:** `POST`
- **Description:** Refresh an access token using a refresh token.
- **Request Body:** JSON object with the following properties:
  - `refreshToken` (string) - The refresh token.
- **Response:**
  - `200 OK`: Token refreshed successfully.
    - Response Body: New access and refresh tokens.
  - `401 Unauthorized`: Access denied, token missing, invalid, or server error.
  - `500 Internal Server Error`: Error during token refresh.

### Forgot Password
- **URL:** `/api/auth/forgot-password`
- **Method:** `POST`
- **Description:** Request a password reset for a user.
- **Request Body:** JSON object with the following properties:
  - `email` (string) - The user's email address.
- **Response:**
  - `200 OK`: OTP sent successfully.
    - Response Body: Success message and timestamp.
  - `400 Bad Request`: Email is required or user not found.
  - `500 Internal Server Error`: Error sending OTP.

### Reset Password
- **URL:** `/api/auth/reset-password`
- **Method:** `POST`
- **Description:** Reset the user's password using OTP.
- **Request Body:** JSON object with the following properties:
  - `email` (string) - The user's email address.
  - `otp` (string) - The one-time password.
  - `password` (string) - The new password.
- **Response:**
  - `200 OK`: Password updated successfully.
  - `400 Bad Request`: All fields are required, user not found, invalid OTP, or OTP expired.
  - `500 Internal Server Error`: Error updating the password.
  
## Tasks

### Create Task
- **URL:** `/api/tasks`
- **Method:** `POST`
- **Description:** Create a new task.
- **Request Body:** JSON object with the following properties:
  - `name` (string, required) - The name of the task.
  - `amount` (number, required) - The amount associated with the task.
- **Response:**
  - `200 OK`: Task created successfully.
    - Response Body: Created task details.
  - `400 Bad Request`: Name and amount are required.
  - `500 Internal Server Error`: Error creating the task.

### Get All Tasks
- **URL:** `/api/tasks`
- **Method:** `GET`
- **Description:** Get a list of all tasks.
- **Response:**
  - `200 OK`: Tasks retrieved successfully.
    - Response Body: Array of task objects.
  - `500 Internal Server Error`: Error getting tasks.

### Get Random Task
- **URL:** `/api/tasks/random`
- **Method:** `GET`
- **Description:** Get a random task from the available tasks.
- **Response:**
  - `200 OK`: Random task retrieved successfully.
    - Response Body: Random task details.
  - `500 Internal Server Error`: Error getting random task.

### Update Task
- **URL:** `/api/tasks/{id}`
- **Method:** `PUT`
- **Description:** Update a task's information.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the task to update.
- **Request Body:** JSON object with the following properties:
  - `name` (string, optional) - The new name for the task.
  - `amount` (number, optional) - The new amount for the task.
- **Response:**
  - `200 OK`: Task updated successfully.
    - Response Body: Updated task details.
  - `400 Bad Request`: Name or amount is required or a task with the same name already exists.
  - `500 Internal Server Error`: Error updating the task.

### Delete Task
- **URL:** `/api/tasks/{id}`
- **Method:** `DELETE`
- **Description:** Delete a task by its ID.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the task to delete.
- **Response:**
  - `200 OK`: Task deleted successfully.
    - Response Body: Deleted task details.
  - `400 Bad Request`: Task not found.
  - `500 Internal Server Error`: Error deleting the task.

## Tasks

### Create Task
- **URL:** `/api/tasks`
- **Method:** `POST`
- **Description:** Create a new task.
- **Request Body:** JSON object with the following properties:
  - `name` (string, required) - The name of the task.
  - `amount` (number, required) - The amount associated with the task.
- **Response:**
  - `200 OK`: Task created successfully.
    - Response Body: Created task details.
  - `400 Bad Request`: Name and amount are required.
  - `500 Internal Server Error`: Error creating the task.

### Get All Tasks
- **URL:** `/api/tasks`
- **Method:** `GET`
- **Description:** Get a list of all tasks.
- **Response:**
  - `200 OK`: Tasks retrieved successfully.
    - Response Body: Array of task objects.
  - `500 Internal Server Error`: Error getting tasks.

### Get Random Task
- **URL:** `/api/tasks/random`
- **Method:** `GET`
- **Description:** Get a random task from the available tasks.
- **Response:**
  - `200 OK`: Random task retrieved successfully.
    - Response Body: Random task details.
  - `500 Internal Server Error`: Error getting random task.

### Update Task
- **URL:** `/api/tasks/{id}`
- **Method:** `PUT`
- **Description:** Update a task's information.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the task to update.
- **Request Body:** JSON object with the following properties:
  - `name` (string, optional) - The new name for the task.
  - `amount` (number, optional) - The new amount for the task.
- **Response:**
  - `200 OK`: Task updated successfully.
    - Response Body: Updated task details.
  - `400 Bad Request`: Name or amount is required or a task with the same name already exists.
  - `500 Internal Server Error`: Error updating the task.

### Delete Task
- **URL:** `/api/tasks/{id}`
- **Method:** `DELETE`
- **Description:** Delete a task by its ID.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the task to delete.
- **Response:**
  - `200 OK`: Task deleted successfully.
    - Response Body: Deleted task details.
  - `400 Bad Request`: Task not found.
  - `500 Internal Server Error`: Error deleting the task.

## VIP Levels

### Get VIP Levels
- **URL:** `/api/vip-levels`
- **Method:** `GET`
- **Description:** Get a list of all VIP levels.
- **Response:**
  - `200 OK`: VIP levels retrieved successfully.
    - Response Body: Array of VIP level objects.
  - `500 Internal Server Error`: Error getting VIP levels.

### Update VIP Level
- **URL:** `/api/vip-levels/{id}`
- **Method:** `PUT`
- **Description:** Update a VIP level's information.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the VIP level to update.
- **Request Body:** JSON object with the following properties:
  - `name` (string, optional) - The new name for the VIP level.
  - `amount` (number, optional) - The new fee for the VIP level.
- **Response:**
  - `200 OK`: VIP level updated successfully.
    - Response Body: Updated VIP level details.
  - `400 Bad Request`: Path parameter `Id` is required, you cannot update the VIP level, or name or amount is required.
  - `500 Internal Server Error`: Error updating the VIP level.

### Create VIP Level
- **URL:** `/api/vip-levels`
- **Method:** `POST`
- **Description:** Create a new VIP level.
- **Request Body:** JSON object with the following properties:
  - `name` (string, required) - The name of the new VIP level.
  - `amount` (number, required) - The fee for the new VIP level.
- **Response:**
  - `200 OK`: VIP level created successfully.
    - Response Body: Created VIP level details.
  - `400 Bad Request`: You cannot create the VIP level, name and amount are required, or VIP level with the same name already exists.
  - `500 Internal Server Error`: Error creating the VIP level.

### Delete VIP Level
- **URL:** `/api/vip-levels/{id}`
- **Method:** `DELETE`
- **Description:** Delete a VIP level by its ID.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the VIP level to delete.
- **Response:**
  - `200 OK`: VIP level deleted successfully.
    - Response Body: Deleted VIP level details.
  - `400 Bad Request`: You cannot delete the VIP level.
  - `500 Internal Server Error`: Error deleting the VIP level.

### Update User VIP Level
- **URL:** `/api/users/{id}/vip-level`
- **Method:** `PUT`
- **Description:** Update a user's VIP level.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the user.
- **Response:**
  - `200 OK`: User VIP level updated successfully.
    - Response Body: Updated user details.
  - `400 Bad Request`: User or VIP level do not exist, user already has this VIP level, or insufficient balance.
  - `500 Internal Server Error`: Error updating user's VIP level.

## Account Recharge

### Recharge Account
- **URL:** `/api/recharge`
- **Method:** `POST`
- **Description:** Recharge a user's account.
- **Request Body:** JSON object with the following properties:
  - `amount` (number, required) - The amount to recharge the account.
  - `receiverId` (string, required) - The ID of the user receiving the recharge.
  - `transaction` (string, required) - The transaction details.
- **Request File:** `screenshot` - A screenshot of the transaction.
- **Response:**
  - `200 OK`: Recharge request submitted successfully.
    - Response Body: Success message and recharge details.
  - `400 Bad Request`: Screenshot is required, or all fields are required.
  - `500 Internal Server Error`: Error recharging the account or sending mail.

### Get Recharge
- **URL:** `/api/recharge/{id}`
- **Method:** `GET`
- **Description:** Get the details of a recharge by its ID.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the recharge.
- **Response:**
  - `200 OK`: Recharge retrieved successfully.
    - Response Body: Recharge details.
  - `400 Bad Request`: Missing route parameter `ID` or you cannot view this recharge.
  - `500 Internal Server Error`: Error getting the recharge.

## Account Withdrawals

### Create Withdrawal
- **URL:** `/api/withdrawals`
- **Method:** `POST`
- **Description:** Create a withdrawal request.
- **Request Body:** JSON object with the following properties:
  - `amount` (number, required) - The amount to withdraw.
  - `receiverAddress` (string, required) - The receiving address for the withdrawal.
  - `password` (string, required) - User's password for verification.
- **Response:**
  - `200 OK`: Withdrawal request submitted successfully.
    - Response Body: Success message and withdrawal details.
  - `400 Bad Request`: Please enter all fields, user does not exist, server error, invalid credentials, or insufficient balance.
  - `500 Internal Server Error`: Error creating the withdrawal or sending email.

### Get Withdrawal
- **URL:** `/api/withdrawals/{id}`
- **Method:** `GET`
- **Description:** Get the details of a withdrawal by its ID.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the withdrawal.
- **Response:**
  - `200 OK`: Withdrawal retrieved successfully.
    - Response Body: Withdrawal details.
  - `400 Bad Request`: Missing route parameter `ID` or you cannot view this withdrawal.
  - `500 Internal Server Error`: Error getting the withdrawal.

### Update Withdrawal
- **URL:** `/api/withdrawals/{id}`
- **Method:** `PUT`
- **Description:** Update the status of a withdrawal.
- **Parameters:**
  - `id` (Path Parameter) - The ID of the withdrawal.
- **Request Body:** JSON object with the following properties:
  - `status` (boolean, required) - The new status of the withdrawal (true or false).
- **Response:**
  - `200 OK`: Withdrawal updated successfully.
    - Response Body: Updated withdrawal details.
  - `400 Bad Request`: Missing route parameter `ID` or status is required to be boolean, withdrawal not found, or withdrawal already confirmed.
  - `500 Internal Server Error`: Error updating the withdrawal.


## Reference Links

- [GitHub Repository](https://github.com/cazicruz/node_proj1)
- [API Documentation](/api-docs)

