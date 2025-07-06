# AI-MEVN-App
# MEVN AI Chat Application

A full-stack web application featuring an interactive AI assistant, built with the MEVN stack (MongoDB, Express.js, Vue.js, Node.js). This project includes user authentication, a real-time chat interface, and a backend powered by a custom rule-based AI service.

<!-- Add a link to your live demo here -->
<!-- ##  लाइव डेमो

[your-app-url.com](https://your-app-url.com) -->

## ✨ Key Features

-   **User Authentication**: Secure user registration and login system using JWT (JSON Web Tokens).
-   **Interactive AI Chat**: A responsive chat interface for communicating with the AI, built with Vue 3 and Pinia.
-   **Rule-Based AI Service**: A custom backend AI that can handle greetings, questions, basic math, and more.
-   **RESTful API**: A well-structured Express.js API to serve the frontend application.
-   **User Dashboard**: A protected route displaying user-specific information.
-   **Modern Tech Stack**: Built with Vue 3 (Composition API), Vite, TypeScript, Pinia, and Express.js.

## 🛠️ Tech Stack

### Backend

-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Web framework for Node.js.
-   **MongoDB**: NoSQL database for storing user data.
-   **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
-   **JSON Web Token (JWT)**: For securing API endpoints.
-   **bcrypt.js**: For hashing user passwords.
-   **Dotenv**: For managing environment variables.
-   **CORS, Helmet**: For securing Express applications.

### Frontend

-   **Vue.js 3**: Progressive JavaScript framework (using Composition API & `<script setup>`).
-   **Vite**: Next-generation frontend tooling for rapid development.
-   **TypeScript**: Statically typed superset of JavaScript.
-   **Pinia**: Intuitive and type-safe state management for Vue.
-   **Vue Router**: Official router for Vue.js.
-   **Axios**: Promise-based HTTP client for making API requests.
-   **ESLint & Prettier**: For code linting and formatting.

## 📂 Project Structure

The project is organized into two main directories: `backend` and `frontend`.

├── backend/ # Express.js REST API
│ ├── middleware/ # Custom middleware (e.g., auth)
│ ├── models/ # Mongoose data models
│ ├── routes/ # API route definitions
│ ├── services/ # Business logic (e.g., AI Service)
│ └── server.js # Main server entry point
│
├── frontend/ # Vue.js 3 Client
│ ├── src/
│ │ ├── assets/ # Static assets (CSS, images)
│ │ ├── components/ # Reusable Vue components
│ │ ├── router/ # Vue Router configuration
│ │ ├── stores/ # Pinia state management stores
│ │ ├── views/ # Page components
│ │ └── main.ts # Main frontend entry point
│ └── vite.config.ts # Vite configuration


## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [MongoDB](https://www.mongodb.com/try/download/community) installed and running, or a MongoDB Atlas connection string.
-   `npm` or `yarn` package manager.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project directory and add the following variables. Replace the placeholder values with your actual configuration.

    ```env
    # Backend Configuration
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/ai-mevn-app
    JWT_SECRET=your_super_secret_jwt_key_that_is_long_and_random

    # Frontend Configuration (Vite reads from VITE_ prefix)
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

3.  **Install Backend Dependencies:**
    Navigate to the `backend` directory and install the required npm packages.
    ```bash
    cd backend
    npm install
    ```

4.  **Install Frontend Dependencies:**
    Navigate to the `frontend` directory and install the required npm packages.
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

You will need to run the backend and frontend servers in separate terminal windows.

1.  **Run the Backend Server:**
    From the `backend` directory:
    ```bash
    npm run dev
    ```
    The server should now be running on `http://localhost:5000`.

2.  **Run the Frontend Development Server:**
    From the `frontend` directory:
    ```bash
    npm run dev
    ```
    The Vue application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📝 API Endpoints

The backend provides the following REST API endpoints under the `/api` prefix.

| Method | Endpoint             | Description                      | Protected |
| :----- | :------------------- | :------------------------------- | :-------- |
| `POST` | `/auth/register`     | Register a new user.             | No        |
| `POST` | `/auth/login`        | Log in a user and get a token.   | No        |
| `GET`  | `/users/profile`     | Get the profile of the logged-in user. | Yes       |
| `POST` | `/ai/chat`           | Send a message to the AI and get a response. | No        |
| `POST` | `/ai/sentiment`      | Analyze the sentiment of a text. | No        |
| `POST` | `/ai/summarize`      | Summarize a block of text.       | No        |
| `POST` | `/ai/image`          | Analyze an uploaded image (mock).| No        |


## 📜 Available Scripts

### Backend (`/backend`)

-   `npm run dev`: Starts the server using `nodemon` for development.
-   `npm start`: Starts the server in production mode.

### Frontend (`/frontend`)

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Compiles the TypeScript and Vue files for production.
-   `npm run preview`: Previews the production build locally.
-   `npm run lint`: Lints the code using ESLint.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
