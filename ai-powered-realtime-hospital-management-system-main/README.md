# 🏥 AI-Powered Real-Time Hospital Management System

A modern, full-stack hospital management system built with React Router, Express, MongoDB, and Socket.IO. This system provides real-time updates, AI-powered features, and comprehensive management tools for healthcare facilities.

![Hospital Management System](./frontend/public/Screenshot%20from%202026-04-14%2014-52-06.png)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Updates**: Live notifications and data synchronization using Socket.IO
- **AI-Powered Insights**: Intelligent diagnosis suggestions and analytics powered by Google Generative AI
- **Role-Based Access Control**: Separate interfaces for Admins, Doctors, Nurses, Lab Technicians, and Patients
- **Comprehensive Dashboard**: Real-time analytics, charts, and key metrics visualization
- **Activity Logging**: Complete audit trail of all system activities

### 👥 User Management
- **Multi-Role Support**: Admin, Doctor, Nurse, Lab Technician, Patient
- **Secure Authentication**: Built with Better Auth for robust security
- **Profile Management**: Customizable user profiles with avatar support
- **Staff Scheduling**: Manage doctor and nurse schedules efficiently

### 🏥 Patient Management
- **Patient Records**: Complete medical history and personal information
- **Appointment Scheduling**: Book and manage patient appointments
- **Prescription Management**: Digital prescription creation and tracking
- **Lab Results**: Upload and manage laboratory test results
- **Vital Signs Monitoring**: Track patient vitals in real-time

### 💰 Financial Management
- **Invoice Generation**: Automated billing and invoice creation
- **Payment Tracking**: Monitor payments and outstanding balances
- **Financial Reports**: Comprehensive revenue analytics and charts
- **Insurance Integration**: Manage insurance claims and verification

### 📊 Analytics & Reporting
- **Revenue Charts**: Visual representation of financial data
- **Activity Dashboard**: Recent activities and system usage
- **Patient Statistics**: Track admissions, discharges, and occupancy
- **Performance Metrics**: Monitor system and staff performance

![Dashboard View](./frontend/public/Screenshot%20from%202026-04-14%2015-09-12.png)

## 🛠️ Technology Stack

### Frontend
- **React Router 7**: Modern routing and server-side rendering
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Recharts**: Data visualization
- **Socket.IO Client**: Real-time communication
- **React Hook Form**: Form management with Zod validation
- **TanStack Query**: Server state management
- **Uploadthing**: File upload handling

### Backend
- **Express.js**: Web application framework
- **MongoDB & Mongoose**: Database and ODM
- **Socket.IO**: Real-time bidirectional communication
- **Better Auth**: Authentication and authorization
- **Inngest**: Background job processing
- **Google Generative AI**: AI-powered features
- **Helmet**: Security middleware
- **Morgan**: HTTP request logging

### DevOps & Tools
- **Bun**: Fast JavaScript runtime and package manager
- **Docker**: Containerization support
- **Nodemon**: Development auto-reload
- **Concurrently**: Run multiple processes
- **TypeScript**: Static type checking

![Features Overview](./frontend/public/Screenshot%20from%202026-04-14%2015-17-50.png)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun 1.3+
- MongoDB instance (local or cloud)
- ngrok account (for webhooks in development)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-powered-realtime-hospital-management-system-main
```

2. **Backend Setup**
```bash
cd backend
bun install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
# or
bun install
```

### Environment Variables

#### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/hospital-management

# Authentication
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:5000

# Google AI
GOOGLE_AI_API_KEY=your-google-ai-key

# Uploadthing
UPLOADTHING_TOKEN=your-uploadthing-token

# Inngest
INNGEST_EVENT_KEY=your-inngest-key
INNGEST_SIGNING_KEY=your-inngest-signing-key

# Server
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### Database Setup

Run migrations and seed data:
```bash
cd backend
bun run migrate
bun run seed
```

### Create Admin User

```bash
cd backend
bun run create-admin
```

Follow the prompts to create your first admin user.

## 🏃 Running the Application

### Development Mode

**Backend** (runs server, ngrok, and Inngest):
```bash
cd backend
bun run dev
```

This will start:
- Express server on `http://localhost:5000`
- ngrok tunnel for webhooks
- Inngest dev server for background jobs

**Frontend**:
```bash
cd frontend
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`

### Production Build

**Backend**:
```bash
cd backend
bun run start:server
```

**Frontend**:
```bash
cd frontend
npm run build
npm run start
```

## 🐳 Docker Deployment

### Build Docker Image
```bash
cd frontend
docker build -t hospital-management-system .
```

### Run Container
```bash
docker run -p 3000:3000 hospital-management-system
```

## 📁 Project Structure

```
ai-powered-realtime-hospital-management-system-main/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── middleware/      # Auth & role checking
│   │   ├── lib/             # Utilities (auth, socket, activity)
│   │   ├── routes/          # API routes
│   │   ├── inngest/         # Background jobs
│   │   ├── scripts/         # Database scripts
│   │   └── server.ts        # Entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── components/      # React components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── dashboard/   # Dashboard widgets
│   │   │   ├── global/      # Shared components
│   │   │   └── navigation/  # Header, sidebar, etc.
│   │   ├── routes/          # Route components
│   │   │   ├── protected/   # Protected routes
│   │   │   ├── home.tsx     # Landing page
│   │   │   └── Login.tsx    # Login page
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities
│   │   ├── root.tsx         # Root component
│   │   └── types.ts         # TypeScript types
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 🔐 User Roles & Permissions

### Admin
- Full system access
- User management (create, edit, delete)
- System configuration
- Financial reports
- Activity logs

### Doctor
- Patient records access
- Prescription management
- Appointment scheduling
- Lab results review
- Medical history updates

### Nurse
- Patient vitals monitoring
- Medication administration
- Patient care notes
- Appointment assistance

### Lab Technician
- Lab test management
- Results upload
- Test scheduling
- Report generation

### Patient
- View personal medical records
- Book appointments
- View prescriptions
- Access lab results
- Update personal information

## 🔧 Available Scripts

### Backend
- `bun run dev` - Start development environment (server + ngrok + Inngest)
- `bun run start:server` - Start Express server only
- `bun run start:ngrok` - Start ngrok tunnel
- `bun run start:inngest` - Start Inngest dev server
- `bun run migrate` - Run database migrations
- `bun run seed` - Seed database with sample data
- `bun run create-admin` - Create admin user

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## 🎨 Key Features Showcase

### Real-Time Notifications
- Instant updates for new appointments
- Lab results notifications
- Emergency alerts
- System-wide announcements

### AI-Powered Features
- Intelligent diagnosis suggestions
- Medical history analysis
- Treatment recommendations
- Predictive analytics

### Responsive Design
- Mobile-friendly interface
- Tablet optimization
- Desktop-first approach
- Accessible components

### Security Features
- JWT-based authentication
- Role-based access control
- Secure password hashing
- CORS protection
- Helmet security headers
- Input validation and sanitization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Router team for the amazing framework
- Better Auth for authentication solution
- MongoDB team for the database
- Socket.IO for real-time capabilities
- Google for Generative AI API
- All open-source contributors

## 📧 Support

For support, email support@hospital-management.com or open an issue in the repository.

## 🔗 Links

- [Documentation](./docs)
- [API Reference](./docs/api)
- [Contributing Guide](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

---

Built with ❤️ for better healthcare management


