\# Task Manager — Full-Stack Web Application



A full-stack task management application with secure user authentication, built using React, Node.js, Express, and PostgreSQL. Users can register, log in, and manage their personal tasks with full CRUD functionality.



\## 🔗 Live Demo



\- \*\*Frontend (Live App):\*\* \[task-manager-three-psi-19.vercel.app](https://task-manager-three-psi-19.vercel.app)

\- \*\*Backend API:\*\* \[task-manager-api-svoe.onrender.com](https://task-manager-api-svoe.onrender.com)



> Note: The backend is hosted on Render's free tier and may take 30–50 seconds to respond on the first request after inactivity.



\## ✨ Features



\- \*\*User Authentication\*\* — Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing

\- \*\*Protected Routes\*\* — Users can only access their own tasks; routes are protected via middleware

\- \*\*Task Management (CRUD)\*\* — Create, read, update, and delete tasks

\- \*\*Task Attributes\*\* — Each task includes a title, description, status (pending / in-progress / completed), priority (low / medium / high), and due date

\- \*\*Responsive UI\*\* — Clean, card-based design with color-coded status and priority indicators



\## 🛠️ Tech Stack



\*\*Frontend:\*\*

\- React (Vite)

\- React Router for client-side routing

\- Axios for API requests

\- Context API for authentication state management



\*\*Backend:\*\*

\- Node.js + Express

\- JWT for authentication

\- bcrypt.js for password hashing

\- PostgreSQL (hosted on Supabase)



\*\*Deployment:\*\*

\- Frontend: Vercel

\- Backend: Render

\- Database: Supabase



\## 📁 Project Structure

