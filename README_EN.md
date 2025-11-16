# 🏠 KeyHub - Real Estate Management System

<div align="center">

![KeyHub Logo](https://img.shields.io/badge/KeyHub-Real%20Estate-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-v4.18-lightgrey?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-v8.0-blue?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Professional web system for comprehensive real estate property management**

[🇪🇸 Versión en Español](./README.md) | [📖 Documentation](#documentation) | [🚀 Demo](#demo) | [📝 License](#license)

</div>

---

## 🎯 Project Rationale

### What is KeyHub?

KeyHub is a comprehensive web platform designed to revolutionize real estate management through complete digitalization of the buying, selling, and renting process of properties. The system connects three main actors in the real estate market: **users/clients**, **real estate agents**, and **administrators**, providing each with specific tools to optimize their daily operations.

### 🌟 Problem it Solves

In today's real estate market, there is a clear need for:
- **Information Centralization**: Consolidate multiple properties on a single accessible platform
- **Efficient Communication**: Facilitate contact between interested parties and agents without friction
- **Organized Management**: Maintain an ordered record of inquiries, favorites, and transactions
- **Modern User Experience**: Offer intuitive searches with advanced filters
- **Transparency**: Provide complete and updated information for each property

### 💡 Key Benefits

#### For Users/Clients:
- 🔍 **Smart Search**: Advanced filters by price, location, features, and operation type
- ❤️ **Favorites List**: Save and compare properties of interest in one place
- 📱 **24/7 Access**: Browse properties from any device, anytime
- 📧 **Direct Inquiries**: Communicate with agents through integrated forms
- 🗺️ **Geolocation**: Visualize properties on interactive maps with exact locations

#### For Real Estate Agents:
- 📊 **Control Panel**: Manage all properties from a centralized interface
- ⚡ **Quick Response**: Integrated notification and email response system
- 📈 **Tracking**: Monitor pending, attended, and canceled inquiries
- 🏘️ **Easy Publishing**: Upload properties with intuitive forms and automatic validation
- 📧 **Automated Emails**: Professional templates for client communication

#### For Administrators:
- 👥 **Total Management**: Complete control of users, agents, and properties
- 🔐 **Advanced Security**: Granular role and permission system
- 📊 **Reports**: Overview of all system operations
- 🛠️ **Maintenance**: Centralized administration and configuration tools

### 🏗️ How It's Built

KeyHub is developed following industry best practices:

#### Architecture:
- **MVC Pattern (Model-View-Controller)**: Clear separation of concerns
- **Backend**: Node.js with Express.js for robust RESTful APIs
- **Database**: MySQL with normalized relational modeling
- **Frontend**: EJS templates with Bootstrap 5 and Tailwind CSS for modern UI
- **Authentication**: Dual (traditional + OAuth 2.0 with Google)

#### Technology Stack:
```
Backend:
├── Node.js v18+
├── Express.js v4.18
├── MySQL2 (pool connections)
├── Express-session (session management)
├── Bcrypt (password encryption)
└── Nodemailer (email sending)

Frontend:
├── EJS (template engine)
├── Bootstrap 5
├── Tailwind CSS
├── Vanilla JavaScript
└── AJAX for dynamic interactions

Security:
├── Helmet.js (secure HTTP headers)
├── Express-validator (data validation)
├── Method-override (full HTTP verbs)
└── Passport.js (OAuth authentication)
```

#### Technical Features:
- ✅ **Scalable Architecture**: Modular design that facilitates growth
- ✅ **Normalized Database**: 15+ relational tables with referential integrity
- ✅ **RESTful APIs**: Well-structured endpoints following HTTP conventions
- ✅ **Robust Error Handling**: Centralized error middleware
- ✅ **Professional Logging**: Winston for event logging and debugging
- ✅ **Data Validation**: On both frontend and backend for security
- ✅ **Responsive Design**: Adaptable to mobile, tablets, and desktop

### 🌍 Real-World Application

KeyHub is designed to be implemented in various real estate market contexts:

#### Real Use Cases:

1. **Local Real Estate Agencies**
   - Replace legacy systems or Excel spreadsheets with a modern platform
   - Centralize property inventory from multiple agents
   - Improve client communication through automated inquiries

2. **Property Developers**
   - Publish construction projects with detailed information
   - Manage inquiries from potential buyers
   - Maintain updated catalog of available units

3. **Real Estate Portals**
   - Solid foundation to build property marketplaces
   - Multi-tenant system managing multiple agencies
   - Scalable for thousands of properties and concurrent users

4. **Temporary Rental Platforms**
   - Adaptable for day/month rental management
   - Inquiry system ideal for reservations
   - Integrable with online payment systems

#### Competitive Advantages:

- **🚀 Flexible Deployment**: Deployable on Heroku, Railway, VPS, or Docker
- **💰 Cost-Effective**: Open source with MIT license, no licensing costs
- **🔧 Customizable**: Modular code easily adaptable to specific needs
- **📱 Mobile-First**: Responsive design prioritizing mobile experience
- **🌐 Multi-region**: Prepared for international expansion (i18n ready)

#### Scalability:

The system is prepared to:
- Manage **thousands of properties** with optimized searches (DB indexes)
- Support **hundreds of concurrent users** through connection pools
- Integrate with **external APIs** (maps, payments, CRM)
- Expand with **microservices** if growth requires it

### 📈 Future Improvements

KeyHub has an expansion roadmap that includes:
- 🖼️ Multiple image gallery per property
- 💳 Payment gateway integration
- 📊 Analytics and metrics dashboard
- 🤖 AI-powered chatbot for automated support
- 📱 Native mobile app (iOS/Android)
- 🔔 Real-time push notifications
- 📄 Contract and legal documentation generation

---

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API & Routes](#-api--routes)
- [Database](#-database)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### 🏘️ Property Management
- ✅ Complete property catalog (sale/rent)
- ✅ Advanced search filters
- ✅ Detailed property information
- ✅ Geolocation with interactive maps
- ✅ Multiple property types (houses, apartments, garages, etc.)

### 👤 User System
- ✅ Traditional registration and login
- ✅ Google OAuth 2.0 authentication
- ✅ User profile management
- ✅ Role system (Admin, Agent, User)
- ✅ Personalized profile with photo

### ❤️ Favorites & Inquiries
- ✅ Save favorite properties
- ✅ Property inquiry system
- ✅ Inquiry status tracking
- ✅ Email notifications
- ✅ Complete history in profile

### 🔐 Security
- ✅ Secure authentication with bcrypt
- ✅ Persistent sessions in memory
- ✅ CSRF protection
- ✅ Server-side data validation
- ✅ XSS sanitization

### 🎨 Modern Interface
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Intuitive UI/UX with Tailwind CSS and Bootstrap
- ✅ Smooth animations and transitions
- ✅ Interactive components with Alpine.js
- ✅ Bootstrap Icons

---

## 🛠️ Technologies

### Backend
- **Node.js** v18+ - Runtime environment
- **Express.js** v4.18 - Web framework
- **MySQL2** - Relational database
- **Passport.js** - Authentication (Local + Google OAuth)
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **EJS** - Template engine

### Frontend
- **Bootstrap 5.3** - CSS framework
- **Tailwind CSS** - Utility-first CSS
- **Alpine.js** - Lightweight JS framework
- **Bootstrap Icons** - Iconography

### Development Tools
- **Nodemon** - Auto-reload in development
- **dotenv** - Environment variables
- **Method-Override** - Support for PUT/DELETE

---

## 📦 Prerequisites

Before starting, make sure you have installed:

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **MySQL** v8.0 or higher
- **Git** (to clone the repository)

### Verify installations:

```bash
node --version
npm --version
mysql --version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USER/KeyHub.git
cd KeyHub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

#### Create the database:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE inmobiliaria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE inmobiliaria;
SOURCE database/full-schema.sql;
```

Or using a single command:

```bash
mysql -u root -p inmobiliaria < database/full-schema.sql
```

#### Load test data (optional but recommended):

```bash
mysql -u root -p inmobiliaria < database/seed.sql
```

This will create test users and sample properties to facilitate testing.

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Server port
PORT=3000

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inmobiliaria
DB_PORT=3306

# Sessions
SESSION_SECRET=your_super_secure_secret_here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Environment
NODE_ENV=development
```

### 5. Start the Server

#### Development Mode (with auto-reload):

```bash
npm run dev
```

#### Production Mode:

```bash
npm start
```

The server will be available at: **http://localhost:3000**

---

## ⚙️ Configuration

### Configure Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials
5. Add authorized URIs:
   - `http://localhost:3000`
   - `http://localhost:3000/auth/google/callback`
6. Copy the Client ID and Client Secret to the `.env` file

### Configure Email (For notifications)

Edit `config/email.js` with your SMTP configuration:

```javascript
{
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password'
  }
}
```

---

## 💻 Usage

### 👥 Test Users

If you loaded the `database/seed.sql` file, you already have test users available:

#### 🔵 Regular User
- **Email:** `usuario@keyhub.com`
- **Password:** `password123`
- **Permissions:** View properties, save favorites, make inquiries

#### 🟢 Real Estate Agent
- **Email:** `agente@keyhub.com`
- **Password:** `password123`
- **Permissions:** Manage properties, handle inquiries, create contracts

#### 🔴 Administrator
- **Email:** `admin@keyhub.com`
- **Password:** `password123`
- **Permissions:** Full system access, user management

> **Note:** These users are for testing only. In production, change passwords and remove these test users.

### Create an Admin User Manually

If you didn't use the seed file, you can create an admin manually:

```bash
node scripts/create-admin.js
```

Or directly in MySQL:

```sql
INSERT INTO usuario (email, password_hash, is_active) 
VALUES ('admin@keyhub.com', '$2a$10$...', 1);

INSERT INTO usuario_rol_app (usuario_id, rol_app_id) 
VALUES (1, 3);
```

### Access the System

1. Open your browser at `http://localhost:3000`
2. Click "Sign In"
3. Use your credentials or "Sign in with Google"

### Main Routes

- `/` - Home page
- `/inmuebles` - Property catalog
- `/inmuebles/:id` - Property details
- `/auth/login` - Sign in
- `/auth/register` - Sign up
- `/usuarios/:id` - User profile
- `/usuarios/mis-consultas` - My inquiries

---

## 📁 Project Structure

```
KeyHub/
├── config/              # Configurations
│   ├── database.js      # MySQL connection
│   └── passport.js      # Authentication strategies
├── controllers/         # Business logic
│   ├── authController.js
│   ├── inmueblesController.js
│   ├── usuariosController.js
│   └── consultasController.js
├── database/            # SQL scripts
│   └── full-schema.sql  # Complete DB schema
├── middlewares/         # Custom middlewares
│   ├── auth.js          # Authentication & authorization
│   └── validators.js    # Data validation
├── models/              # Data models
│   ├── Usuario.js
│   ├── Inmueble.js
│   ├── Consulta.js
│   └── Favorito.js
├── public/              # Static files
│   ├── css/
│   ├── js/
│   └── uploads/
├── routes/              # Route definitions
│   ├── index.js
│   ├── auth.js
│   ├── inmuebles.js
│   ├── usuarios.js
│   └── consultas.js
├── views/               # EJS views
│   ├── partials/        # Reusable components
│   ├── auth/            # Login, register
│   ├── inmuebles/       # Listing, details
│   └── usuarios/        # Profile, favorites, inquiries
├── .env                 # Environment variables (not included in Git)
├── .gitignore          # Files ignored by Git
├── package.json        # Project dependencies
├── server.js           # Entry point
└── README.md           # Spanish README
```

---

## 🔌 API & Routes

### Public Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page |
| GET | `/inmuebles` | Property listing |
| GET | `/inmuebles/:id` | Property details |
| GET | `/auth/login` | Login form |
| POST | `/auth/login` | Process login |
| GET | `/auth/register` | Registration form |
| POST | `/auth/register` | Process registration |

### Protected Routes (Require authentication)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/usuarios/:id` | View user profile |
| GET | `/usuarios/:id/edit` | Edit profile |
| PUT | `/usuarios/:id` | Update profile |
| GET | `/usuarios/mis-consultas` | View my inquiries |
| POST | `/favoritos/toggle` | Add/remove favorite |
| POST | `/consultas` | Create inquiry |
| POST | `/auth/logout` | Logout |

### Admin Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/usuarios` | List all users |
| GET | `/consultas` | View all inquiries |
| PUT | `/consultas/:id/estado` | Update inquiry status |

---

## 🗄️ Database

### Entity-Relationship Model

The system uses MySQL with the following main tables:

- **usuario** - User information
- **persona** - Personal data
- **rol** - System roles
- **usuario_rol** - User-role relationship
- **inmueble** - Real estate properties
- **inmueble_tipo** - Property types
- **consulta** - User inquiries
- **favorito** - User favorites
- **zona** - Geographic zones
- **alquiler** - Rental contracts
- **compra** - Purchase operations

### Simplified ER Diagram

```
usuario ──┬─── persona
          ├─── usuario_rol ─── rol
          ├─── consulta ─── inmueble
          └─── favorito ─── inmueble
                            │
                            ├─── inmueble_tipo
                            ├─── zona
                            └─── alquiler/compra
```

---

## 🔒 Security Features

- **Hashed Passwords**: bcrypt with 10 salt rounds
- **Secure Sessions**: HttpOnly cookies, SameSite strict
- **Input Validation**: Server-side sanitization
- **XSS Protection**: Data escaping in views
- **SQL Injection**: Parameterized queries
- **CSRF Protection**: Tokens in forms
- **Rate Limiting**: Login attempt limitation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add: new feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Style Guide

- Use descriptive names for variables and functions
- Comment complex code
- Follow ES6+ conventions
- Use async/await instead of callbacks
- Keep functions small and focused

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Copyright © 2024 Facundo Nicolas Gandolfo

---

## 👨‍💻 Author

**Facundo Nicolas Gandolfo**

- GitHub: [@YOUR_USER](https://github.com/YOUR_USER)
- Email: facundo.gandolfo@example.com

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [Alpine.js](https://alpinejs.dev/) - JS framework
- [Passport.js](http://www.passportjs.org/) - Authentication
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icons

---

## 📞 Support

If you have any questions or issues, please:

1. Check the [documentation](#-table-of-contents)
2. Search in [Issues](https://github.com/YOUR_USER/KeyHub/issues)
3. Create a new [Issue](https://github.com/YOUR_USER/KeyHub/issues/new)

---

<div align="center">

**Made with ❤️ and ☕ by Facundo Nicolas Gandolfo**

⭐ If this project was useful to you, consider giving it a star on GitHub

</div>
