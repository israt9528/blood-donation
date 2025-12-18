# Project Name  
## PULSE

---



## About the Project 
Pulse is a full-stack Blood Donation Management Platform designed to connect blood donors, recipients, volunteers, and administrators through a secure, efficient, and user-friendly system. The platform aims to reduce the gap between people in urgent need of blood and available donors across Bangladesh, enabling faster response, better coordination, and transparent management of blood donation activities.

The application supports role-based access control with three distinct user roles — Admin, Donor, and Volunteer — each having clearly defined permissions and responsibilities. Users can register, manage their profiles, create or respond to blood donation requests, search for donors by location and blood group, and track donation statuses in real time.

Pulse is built using the MERN stack (MongoDB, Express.js, React, Node.js) with modern best practices such as JWT authentication, protected routes, environment-based security, and responsive UI design. The platform also integrates Firebase authentication, ImageBB for avatar uploads, and Stripe payment gateway for funding support.

Special focus has been given to clean UI/UX, accessibility, and performance. The dashboard uses a sidebar-based layout, supports pagination, filtering, charts, and ensures that users remain logged in even after refreshing private routes. Admins have full control over users, roles, donation requests, and funding data, while volunteers assist by managing donation request statuses.

Pulse is not just a project—it is a socially impactful solution aimed at saving lives through technology.


---

## Project Overview  
Pulse is a modern blood donation web application that enables users to request blood, donate blood, search donors, manage requests, and support organizations through funding, all within a secure and responsive platform built using the MERN stack.
<img src="https://i.ibb.co.com/wN8g97c1/3a4b9d5c-0cdb-40ed-97d9-ec06bb80b45f.jpg"/>
<img src="https://i.ibb.co.com/G37P6kCC/303087e2-bba7-4d26-a323-6e1884551b51.jpg"/>
<img src="https://i.ibb.co.com/YT79vK7Q/5bdeb4d7-eb80-4cf9-8d3a-cb35dbf6d96a.jpg"/>

---

## Key Features  
-Secure Authentication & Authorization
Implements JWT-based authentication with protected routes and role-based access to ensure data privacy and secure user sessions.

-User Role Management
Supports Admin, Donor, and Volunteer roles with controlled permissions, allowing admins to manage users, roles, and access levels.

-Blood Donation Request System
Enables users to create, update, track, and manage blood donation requests with real-time status updates.

-Dashboard with Analytics
Role-specific dashboards displaying statistics, charts, and insights for quick monitoring of users, requests, and funding data.

-Advanced Donor Search
Allows users to find donors efficiently by filtering blood group, district, and upazila.

-Profile Management
Users can view and update their profile information, including avatar, location, and blood group, with secure data handling.

-Funding & Stripe Integration
Integrates Stripe payment gateway to securely collect and track funding contributions from users.

-Fully Responsive Design
Optimized for mobile, tablet, and desktop devices with consistent layout, spacing, and modern UI principles.

-Production-Ready Security
Uses environment variables for sensitive credentials and ensures error-free deployment with CORS-safe backend configuration.

-Additional Enhancements
Includes pagination, filtering, confirmation modals, animations, and improved UX for a smooth user experience.

---

## Tech Stack  
**Frontend:** React.js · Tailwind CSS · JavaScript
**Backend:** Node.js · Express.js · MongoDB  
**Tools:** Git · VS Code · Firebase · JWT

---

## Dependencies  
List required dependencies or major libraries:

```json
{
 "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "daisyui": "^5.5.8",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.26",
    "lucide-react": "^0.561.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.68.0",
    "react-icons": "^5.5.0",
    "react-router": "^7.10.1",
    "react-router-dom": "^7.11.0",
    "recharts": "^3.6.0",
    "sweetalert2": "^11.26.4",
    "tailwindcss": "^4.1.17"
}
```

---

## Installation️ & Setup
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/israt9528/blood-donation.git
cd blood-donation
npm install
```

2. Set up environment variables by creating a `.env` file in the root directory:

```env
  VITE_apiKey=AIzaSyAgmIHm5Ei-8Z20P5X3YzZ5BrBcQoO41QA
  VITE_authDomain=blood-donation-9b87e.firebaseapp.com
  VITE_projectId=blood-donation-9b87e
  VITE_storageBucket=blood-donation-9b87e.firebasestorage.app
  VITE_messagingSenderId=666643422722
  VITE_appId=1:666643422722:web:fce3f781f204312ee1911
  VITE_image_api=c929082cce4b419056cf61a210438fef
```

3. Run the application:

```bash
npm run dev
```

---

## Folder Structure

```plaintext
your-project/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   └── hooks/
│   └── layouts/
│   └── context/
│   └── firebase/
├── public/
└── package.json
```



## Contact

**Live URL:** [Live Site](https://blood-donation-9b87e.web.app/)
**Email:** [israt](israt9528@gmail.com)
**Portfolio:** [Portfolio](https://github.com/israt9528/portfolio.git)
