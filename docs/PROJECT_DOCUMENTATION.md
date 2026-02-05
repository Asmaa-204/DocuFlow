# DocuFlow Project Documentation

## Overview

**DocuFlow** is a comprehensive Document Workflow Management System designed to streamline document processing and approval workflows within organizations. The system supports role-based access control, multi-stage workflow management, and automated document generation.

---

## Architecture

DocuFlow follows a **full-stack architecture** with clear separation between:

- **Frontend**: React-based SPA with modern UI/UX
- **Backend**: Node.js/Express REST API
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT-based authentication
- **File Handling**: Support for DOCX templates and document generation

---

## Project Structure

```
DocuFlow/
├── frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   ├── features/           # Feature-specific modules
│   │   ├── pages/              # Page-level components
│   │   ├── context/            # React Context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── data/               # Static data & mock data
│   │   ├── styles/             # Global styles
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static assets
│   └── package.json
│
├── backend/                     # Node.js/Express Backend
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Sequelize models
│   │   ├── routes/             # API route definitions
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Express middleware
│   │   ├── validators/         # Input validation
│   │   ├── utils/              # Utility functions
│   │   ├── config/             # Configuration files
│   │   ├── constants/          # Application constants
│   │   └── errors/             # Custom error classes
│   ├── db/
│   │   ├── migrations/         # Database migrations
│   │   ├── seeders/            # Database seeders
│   │   └── db.config.json      # DB configuration
│   ├── docs/                   # API documentation
│   └── public/
│       └── templates/          # DOCX templates
│
└── README.md
```

---

## Backend (Node.js/Express)

### Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js v4.21.2
- **Database**: SQLite3 with Sequelize ORM v6.37.7
- **Authentication**: JWT (jsonwebtoken v9.0.2) + bcryptjs v3.0.2
- **Validation**: Joi v17.13.3, AJV v8.17.1
- **Documentation**: API Doc v1.2.0
- **File Processing**: Multer v2.0.2, docxtemplater v3.65.2, PizZip v3.2.0
- **Testing**: Jest v30.0.1, Supertest v7.1.1

### Core Models

#### 1. User Model
- **Fields**: id, firstName, lastName, email, password, role, departmentId
- **Roles**: professor, department_manager, administrator
- **Features**: Password hashing, JWT authentication, department association

#### 2. Workflow Model
- **Fields**: id, title, description, timestamps
- **Relations**: Has many Stages, Has many WorkflowInstances
- **Purpose**: Defines document approval workflows

#### 3. Stage Model
- **Fields**: id, title, description, role, stageOrder, workflowId
- **Roles**: professor, department_manager, administrator
- **Relations**: Belongs to Workflow, Has many Requests
- **Features**: Ordered stages within workflows

#### 4. WorkflowInstance Model
- **Fields**: id, workflowId, stageId, userId, departmentId, status
- **Status**: in_progress, completed, rejected
- **Relations**: Belongs to Workflow, Stage, User, Department; Has many Requests

#### 5. Request Model
- **Fields**: id, instanceId, stageId, userId, assignedToUserId, note, status, sentAt
- **Status**: draft, pending, approved, rejected
- **Relations**: Belongs to Instance, Stage, User, Assignee; Has many Documents

#### 6. Document Model
- **Fields**: id, data (JSON), templateId, requestId
- **Purpose**: Stores document data and template associations

#### 7. Department Model
- **Fields**: id, name, managerId, affairsEmployeeId
- **Relations**: Has Users, Has Instances

#### 8. Template Model
- **Fields**: id, name, filePath, fieldSchema
- **Relations**: Associated with Stages through Conditions

#### 9. Access Model (Junction Table)
- **Purpose**: Many-to-many relationship between Users and Requests

#### 10. Condition Model (Junction Table)
- **Purpose**: Links Stages with Templates based on conditions

### API Endpoints

#### Authentication (`/api/v1/auth`)
- `POST /login` - User login
- `POST /signup` - User registration

#### Workflows (`/api/v1/workflow`)
- `POST /` - Create new workflow
- `GET /` - Get all workflows with stages
- `GET /:id` - Get specific workflow

#### Instances (`/api/v1/instance`)
- `POST /` - Create workflow instance
- `GET /` - Get all instances
- `GET /:id` - Get specific instance

#### Requests (`/api/v1/request`)
- `POST /` - Create new request
- `GET /` - Get all requests
- `GET /:id` - Get specific request

#### User Profile (`/api/v1/me`)
- `GET /` - Get current user info
- `GET /request` - Get user's requests
- `GET /instance` - Get user's instances

#### Additional Routes
- `/api/v1/template` - Template management
- `/api/v1/document` - Document operations
- `/api/v1/department` - Department management

### Key Services

1. **auth.service.js** - Authentication logic
2. **workflow.service.js** - Workflow CRUD operations
3. **instance.service.js** - Instance management
4. **request.service.js** - Request processing
5. **document.service.js** - Document generation from templates
6. **template.service.js** - Template management
7. **department.service.js** - Department operations

### Database Configuration

- **Type**: SQLite
- **ORM**: Sequelize with Sequelize-CLI
- **Migrations**: Version-controlled schema changes
- **Seeders**: Initial data population

---

## Frontend (React)

### Technology Stack

- **Framework**: React v19.1.0
- **Build Tool**: Vite v6.3.5
- **Routing**: React Router DOM v7.6.2
- **State Management**: React Context + TanStack Query v5.80.6
- **Forms**: React Hook Form v7.57.0 + Yup v1.6.1
- **UI Library**: Ant Design v5.26.5 + Material UI v6.5.0
- **Styling**: Styled Components v6.1.18 + Emotion
- **JSON Forms**: @jsonforms v3.6.0
- **Icons**: React Icons v5.5.0
- **Notifications**: React Hot Toast v2.5.2
- **Date Handling**: date-fns v4.1.0

### Project Structure

```
frontend/src/
├── components/           # Shared UI components
│   ├── AppLayout.jsx    # Main app layout wrapper
│   ├── Sidebar.jsx      # Navigation sidebar
│   ├── Header.jsx       # App header
│   ├── ProtectedRoute.jsx
│   ├── Button.jsx
│   ├── Table.jsx
│   ├── Modal.jsx
│   └── ...
│
├── features/            # Domain-specific features
│   ├── auth/           # Authentication (login, signup, logout)
│   │   ├── login/
│   │   ├── signup/
│   │   └── logout/
│   ├── request/        # Request management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── data/
│   ├── workflow/       # Workflow management
│   │   ├── WorkflowStepper.jsx
│   │   ├── WorkflowInstanceList.jsx
│   │   ├── hooks/
│   │   └── services/
│   ├── Inbox/          # Inbox/Notifications
│   └── user/           # User profile features
│
├── pages/              # Route-level pages
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── MyWorkflows.jsx
│   ├── NewRequest.jsx
│   ├── Requests.jsx
│   ├── RequestsInbox.jsx
│   ├── StartNewWorkflow.jsx
│   └── Settings.jsx
│
├── context/            # React Context
│   └── AuthContext.jsx
│
├── hooks/              # Custom hooks
│   ├── useAuthCheck.js
│   └── useClickOutside.js
│
├── data/               # Static data
│   ├── translations/
│   ├── workflow/
│   ├── sidebar/
│   └── requests/
│
└── utils/              # Utilities
    ├── api.js
    ├── consts.js
    └── getInputType.js
```

### Routing Structure

```
/                          → Redirect to /dashboard
├── /login                 → Login page
├── /signup                → Signup page
├── /dashboard             → Dashboard (protected)
├── /workflows
│   ├── /new               → Start new workflow
│   ├── /my-workflows      → List user's workflows
│   └── /:workflowId/instances/:instanceId/request/:requestId
├── /requests
│   ├── /inbox             → Incoming requests
│   ├── /submitted         → Submitted requests
│   └── /drafts            → Draft requests
└── /settings              → User settings
```

### Key Features

1. **Authentication System**
   - JWT token-based authentication
   - Protected routes
   - Role-based access control

2. **Workflow Management**
   - Create and manage workflows
   - Multi-stage approval process
   - Visual workflow stepper

3. **Request System**
   - Create requests based on workflow templates
   - Draft and submit functionality
   - Request inbox for approvals

4. **Document Generation**
   - Dynamic form generation from templates
   - DOCX document generation
   - Document preview and download

5. **User Management**
   - User profiles
   - Department associations
   - Role-based permissions

### Custom Hooks

- **useLogin** - Login form handling
- **useSignup** - Signup form handling
- **useUser** - Current user data
- **useRequests** - Request list management
- **useIncomingRequests** - Incoming request handling
- **useDepartments** - Department data
- **usePatchRequest** - Request updates
- **useSendRequest** - Request submission
- **useMyWorkflowsPage** - Workflow list management
- **useCreateInstance** - Workflow instance creation
- **useAllWorkflows** - All workflows data

---

## Key Features

### 1. Role-Based Access Control

Three user roles with different permissions:
- **Professor**: Can create and submit requests
- **Department Manager**: Can approve/reject requests, manage department workflows
- **Administrator**: Full system access, user and workflow management

### 2. Multi-Stage Workflows

- Define custom workflows with multiple approval stages
- Each stage has specific roles that can process requests
- Sequential progression through stages

### 3. Document Templates

- Upload DOCX templates with placeholders
- Dynamic form generation based on template fields
- Automatic document generation with filled data

### 4. Request Management

- Create requests from workflow templates
- Save as drafts or submit immediately
- Track request status and history
- Inbox for incoming approval requests

### 5. Department Management

- Organize users by departments
- Department-specific workflows
- Manager and affairs employee roles per department

---

## Development

### Backend Development

```bash
cd backend
npm install
npm run dev        # Start with nodemon
npm test           # Run tests
npm run seed       # Seed database
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run lint       # Run ESLint
```

### Database Setup

```bash
cd backend
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

## Security Features

1. **Authentication**: JWT tokens with secure storage
2. **Password Security**: Bcrypt hashing with salt rounds
3. **CORS**: Configured for specific origins
4. **Input Validation**: Joi and AJV validators
5. **SQL Injection Protection**: Sequelize ORM parameterized queries
6. **File Upload Security**: Multer with file type validation

---

## API Documentation

API documentation is generated using API Doc and available at:
- Location: `backend/docs/output/index.html`
- Endpoints documented in: `backend/docs/*.doc.js`

---

## Future Enhancements

1. Email notifications for request updates
2. Real-time updates with WebSockets
3. Advanced reporting and analytics
4. Multi-tenant support
5. Mobile application
6. Document versioning
7. Audit logging
8. Integration with external systems

---

## License

Apache-2.0 License

---

## Contributors

Google LLC (Initial project template)

---

*Last Updated: February 2026*
