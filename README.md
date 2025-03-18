Role-Based Task Management Frontend



This is the frontend implementation of the Role-Based Task Management Web Application, designed for streamlined hierarchical task assignment within teams.
The frontend is built using React.js with responsive UI, seamless role-based navigation, and easy interaction with the backend API.

Features
✅ Role-Based Dashboards

Host (Admin) Dashboard:
Create and manage team members
Assign, edit, and delete tasks
View all tasks and team members
Team Member Dashboard:
View only personal assigned tasks for the current week
Track task deadlines and statuses
✅ Authentication & Authorization

Login functionality with secure JWT token-based authentication
Role-specific redirection and route protection
✅ Task Management Interface

Hosts can:
Create new tasks with description, deadline, status, and assigned member
Edit and delete tasks
Manage members' accounts
Team members:
View assigned tasks neatly organized by week
✅ Responsive UI Design

Clean, minimalistic UI optimized for desktop, tablet, and mobile devices
User-friendly forms and tables
Clear task visualization for better team productivity
Tech Stack
Technology	Description
React.js	Frontend library
React Router DOM	Client-side routing
Axios	HTTP client for API requests
Tailwind CSS	Utility-first CSS framework for styling
Context API	Global state management (Authentication & Role-based access)
JWT	Token handling for secured sessions
Folder Structure
bash
Copy
Edit
📦 frontend/
 ┣ 📂 src/
 ┃ ┣ 📂 components/      # Reusable UI Components (Buttons, Modals, Forms)
 ┃ ┣ 📂 pages/           # Host & Member Dashboards, Login, Error pages
 ┃ ┣ 📂 services/        # Axios API functions
 ┃ ┣ 📂 context/         # Auth context for managing login state
 ┃ ┣ 📂 utils/           # Utility functions (e.g., token handling)
 ┃ ┣ 📄 App.js           # Route definitions and layout
 ┃ ┣ 📄 index.css        # Tailwind CSS styles
 ┃ ┣ 📄 main.jsx         # Entry point
 ┣ 📄 package.json
 ┣ 📄 tailwind.config.js

 
Getting Started 🚀


1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/task-management-frontend.git
cd task-management-frontend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Environment Variables
Create a .env file in the root directory:

bash
Copy
Edit
VITE_BACKEND_URL=http://localhost:5000/api
(Replace with your actual backend URL if deployed)

4. Run the App
bash
Copy
Edit
npm run dev
Frontend will be running at:
http://localhost:5173

Key Pages
Route	Description	Access
/login	User login page	Public
/admin/dashboard	Host's dashboard (manage users/tasks)	Host
/member/dashboard	Team member dashboard (view tasks)	Member
/admin/users	Manage members (create/delete users)	Host
/admin/tasks	Create/Edit/Delete tasks	Host
API Integration
Communicates with backend API using Axios
Protected routes use JWT tokens stored securely in local storage or context
Role-based redirects and route guards implemented
Security Measures
JWT Authentication
Role-based Routing & Component Protection
Token verification before sensitive actions
Future Enhancements
Password reset functionality
Profile editing options
Notifications for task deadlines
UI theme customization (Light/Dark Mode)
