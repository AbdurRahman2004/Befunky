Got it! Here’s the updated `README.md` with the **frontend environment variable** included:  

---

```md
# Vite React Full-Stack Application

This is a full-stack web application built using **Vite + React** for both the frontend and backend. This README provides step-by-step instructions to set up and run the project on your local development environment.

## 🛠 Tech Stack

- **Frontend:** Vite + React  
- **Backend:** Node.js + Express  
- **Database:** MongoDB (via MongoDB Atlas)  
- **Authentication:** JWT (JSON Web Token)  
- **Cloud Storage:** Cloudinary  
- **Payment Gateway:** Stripe  

---

## 📂 Project Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repository.git
cd your-repository
```

### 2️⃣ Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the **backend** directory and add the following environment variables:
   ```
   PORT=4000
   MONGODB_URI=your-mongodb-uri
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_SECRET_KEY=your-cloudinary-secret-key
   CLOUDINARY_NAME=your-cloudinary-name
   JWT_SECRET=your-jwt-secret
   ADMIN_EMAIL=your-admin-email
   ADMIN_PASSWORD=your-admin-password
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```
   **Replace the placeholders with your actual credentials.**

4. Start the backend server:
   ```sh
   npm run server
   ```
   The backend should now be running on `http://localhost:4000`.

---

### 3️⃣ Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the **frontend** directory and add the following environment variable:
   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```
   This tells the frontend where to send API requests.

4. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend should now be running on `http://localhost:5173` (default Vite port).

---

## 🔑 Environment Variables Setup Guide

### Backend `.env` Variables

| Variable            | Description                     |
|---------------------|---------------------------------|
| `PORT`             | Port for the backend (default: 4000) |
| `MONGODB_URI`      | MongoDB connection string |
| `CLOUDINARY_API_KEY` | Cloudinary API Key |
| `CLOUDINARY_SECRET_KEY` | Cloudinary Secret Key |
| `CLOUDINARY_NAME`  | Cloudinary Cloud Name |
| `JWT_SECRET`       | Secret key for JWT authentication |
| `ADMIN_EMAIL`      | Default admin email |
| `ADMIN_PASSWORD`   | Default admin password |
| `STRIPE_SECRET_KEY` | Stripe secret API key |

### Frontend `.env` Variables

| Variable          | Description |
|------------------|-------------|
| `VITE_BACKEND_URL` | Backend API URL (default: `http://localhost:4000`) |

---

## 🚀 Running the Application

Once both the frontend and backend are set up:

1. **Start the backend**:  
   ```sh
   cd backend
   npm run server
   ```
2. **Start the frontend**:  
   ```sh
   cd frontend
   npm run dev
   ```

Now, open `http://localhost:5173` in your browser to access the application.

---

## ⚠️ Troubleshooting

- If you face dependency issues, try running:
  ```sh
  npm install --legacy-peer-deps
  ```
- Ensure your `.env` file is correctly set up in both backend and frontend.
- Make sure MongoDB, Cloudinary, and Stripe credentials are correctly configured.

---

## 📜 License

This project is licensed under the MIT License.

---

### 🎯 Happy Coding! 🚀
```

