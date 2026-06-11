# SkillBridge 🎓

> A smart tutor-student booking platform with verified tutors, flexible scheduling, and community-driven reviews.

---

## 📌 Overview

**SkillBridge** is a full-stack web application that bridges the gap between skilled tutors and eager learners. Unlike traditional tutoring platforms, SkillBridge puts quality first — every tutor goes through an admin verification process before they can accept bookings. Students get access to a curated pool of trusted educators, real-time slot availability, and a dedicated space to discover their favorite tutors.

---

## 🚀 Live Demo

> 🔗 [https://skillbridge-client-nine.vercel.app/](#) &nbsp;|&nbsp;(#)

### 🔐 Test Credentials

| Role    | Email                   | Password |
| ------- | ----------------------- | -------- |
| Admin   | admin@gmail.com         | 12345678 |
| Tutor   | harun@gmail.com         | 12345678 |
| Student | mahimsatkania@gmail.com | 12345678 |

---

## ✨ Key Features

### 👨‍🏫 For Tutors

- Create a detailed profile with subjects, bio, and hourly rate
- Submit profile for admin review and verification
- Set custom availability by creating time slots (e.g., 10:00 AM – 11:00 AM)
- Manage and track incoming sessions and student bookings

### 🎓 For Students

- Browse and search verified tutors by subject or name
- View tutor profiles with ratings, reviews, and hourly rates
- Book sessions based on real-time tutor availability
- Leave reviews after completing a session
- Save and revisit favorite tutors in **TutorHub**

### 🛡️ For Admins

- Review tutor registration requests from a dedicated dashboard
- Approve or reject tutors after independent verification
- Maintain platform quality and trust

---

## 🛠️ Tech Stack

| Layer      | Technology        |
| ---------- | ----------------- |
| Frontend   | Next.js           |
| Backend    | Node.js / Express |
| Database   | PostgreSQL        |
| ORM        | Prisma            |
| Auth       | Better Auth       |
| Styling    | Shadcn ui         |
| Deployment | vercel            |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `v18+`
- npm
- PostgreSQL

### Installation

```bash
# 1. Clone Client repository
git clone https://github.com/jahedulislamdev/Skillbridge_A4_client.git

# 1. Clone Server repository
git clone https://github.com/jahedulislamdev/Skillbridge_A4_server.git

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start the development server
npm run dev
```

### Environment Variables

```env
# Backend
BACKEND_API=your_backend_url
API_URL=your_backend_api_url
AUTH_URL=your_auth_url

# Frontend
NEXT_PUBLIC_FRONTEND_API=your_frontend_url
NEXT_PUBLIC_BACKEND_API=your_backend_url
NEXT_PUBLIC_AUTH_URL=your_auth_url
```

---

## 🔄 User Flow

```
User registar → Login → Tutor registers → Admin reviews & approves → Tutor sets availability -> Manage session & bookings
                                                        ↓
Student searches tutors with advanced fillters → Views profile → Books a slot → Session happens → Leaves a review
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ to make quality education more accessible.</p>
