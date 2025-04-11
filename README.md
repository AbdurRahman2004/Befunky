
# 🎨 Befunky - Vite React Full-Stack Application

This is a full-stack web application built with **Vite + React** for the frontend and **Node.js + Express** for the backend. It integrates modern tools and APIs including **MongoDB Atlas**, **Cloudinary**, **JWT authentication**, and **Stripe** for payments.

---

## 🛠 Tech Stack

- **Frontend**: Vite + React  
- **Backend**: Node.js + Express  
- **Database**: MongoDB (via MongoDB Atlas)  
- **Authentication**: JWT (JSON Web Tokens)  
- **Media Uploads**: Cloudinary  
- **Payments**: Stripe  

---

## 📁 Monorepo Structure

```
/Befunky
├── backend/          # Node.js + Express server
├── frontend/         # Vite + React frontend
├── infra/            # Infrastructure code (Terraform + Ansible)
├── README.md         # Project documentation
```

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AbdurRahman2004/Befunky.git
cd Befunky
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` and add:

```env
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

Start the backend server:

```bash
npm run server
```

📍 Backend runs on: `http://localhost:4000`

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in `/frontend` and add:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the Vite dev server:

```bash
npm run dev
```

📍 Frontend runs on: `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend

| Variable               | Description                            |
|------------------------|----------------------------------------|
| `PORT`                 | Backend port (default: 4000)           |
| `MONGODB_URI`          | MongoDB connection URI                 |
| `CLOUDINARY_API_KEY`   | Cloudinary API Key                     |
| `CLOUDINARY_SECRET_KEY`| Cloudinary Secret                      |
| `CLOUDINARY_NAME`      | Cloudinary Cloud Name                  |
| `JWT_SECRET`           | JWT Secret                             |
| `ADMIN_EMAIL`          | Default admin email                    |
| `ADMIN_PASSWORD`       | Default admin password                 |
| `STRIPE_SECRET_KEY`    | Stripe Secret API Key                  |

### Frontend

| Variable             | Description                              |
|----------------------|------------------------------------------|
| `VITE_BACKEND_URL`   | Backend URL (default: http://localhost:4000) |

---

## 🧪 Running the App

Start the backend:

```bash
cd backend
npm run server
```

Start the frontend:

```bash
cd frontend
npm run dev
```

🔗 Open in browser: [http://localhost:5173](http://localhost:5173)

---

## 🐳 Docker Support (Coming Soon)

> Docker setup and CI/CD pipelines will be added in upcoming updates.

---

## ⚠️ Troubleshooting

- Run this if you face dependency issues:
  ```bash
  npm install --legacy-peer-deps
  ```
- Make sure both `.env` files are correctly set up
- Ensure all credentials for MongoDB, Cloudinary, and Stripe are valid

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> Made with ❤️ by Abdur Rahman
```

---

Let me know if you want to add:
- A logo/banner at the top
- GitHub badges (for version, license, build passing)
- A contribution guide  
I can format and add those for you too!
