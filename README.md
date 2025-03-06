# Patient Management Application

A modern React application for managing patient data with TypeScript, React Query, and CSS Modules.

## Features

- View a list of patient records in a responsive grid layout
- Add new patients with form validation
- Edit existing patient information
- Delete patients with confirmation dialog
- Expandable patient cards for viewing detailed information
- Responsive design that works on desktop and mobile devices
- Toast notifications for user feedback

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button/
│   │   ├── FormInput/
│   │   ├── FormSelect/
│   │   ├── FormTextarea/
│   │   ├── Modal/
│   │   └── Notification/
│   └── patients/         # Domain-specific components
│       ├── PatientCard/
│       ├── PatientForm/
│       ├── PatientList/
│       └── PatientPage/
├── contexts/             # Application-wide contexts
│   └── NotificationContext.ts
├── providers/            # Context providers
│   └── NotificationProvider.tsx
├── hooks/                # Custom React hooks
│   ├── useNotification.ts
│   └── usePatients.ts    # React Query hooks for data fetching
├── services/             # API services
│   └── api.ts
├── types/                # TypeScript type definitions
│   └── patient.ts
├── utils/                # Utility functions
│   └── validationSchema.ts
├── App.tsx               # Main application component
├── App.css               # Global styles
└── main.tsx              # Application entry point
```

## Tech Stack

- **React**: UI library for building the user interface
- **TypeScript**: For static type checking and improved developer experience
- **React Query**: For data fetching, caching, and server state management
- **React Hook Form**: For efficient form state management
- **Zod**: For schema validation with TypeScript integration
- **Framer Motion**: For animations and transitions
- **CSS Modules**: For component-scoped styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ValentinMorali7/lightit.git
cd patient-management-app
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Design Decisions

### Component Architecture

The application follows a component-based architecture with clear separation of concerns:

- **Common Components**: Reusable UI components that can be used across different parts of the application
- **Domain Components**: Components specific to the patient management domain
- **Contexts & Providers**: For sharing state across components (like notifications)
- **Hooks**: Custom hooks for data fetching and other reusable logic
- **Services**: API communication layer

### State Management

- **Server State**: Managed by React Query for efficient data fetching, caching, and updates
- **UI State**: Managed with React's useState and useReducer hooks
- **Global State**: Managed through React Context for cross-component communication

### Styling Approach

- CSS Modules for component-scoped styling
- Global variables for consistent theming (colors, spacing, etc.)
- Responsive design with mobile-first approach

### API Integration

The application connects to a REST API for patient data:

- Fetching patients list
- Creating new patients
- Updating existing patients
- Deleting patients

## Key Components

### Common Components

- **Button**: Versatile button component with support for different variants, sizes, loading states
- **FormInput/FormSelect/FormTextarea**: Form components with integrated label, error state, and helper text
- **Modal**: Reusable modal dialog for forms and confirmations
- **Notification**: Toast notification system for user feedback

### Patient Components

- **PatientCard**: Card component displaying patient information with expand/collapse functionality
- **PatientForm**: Form for adding/editing patient information with validation
- **PatientList**: Grid layout for displaying patient cards
- **PatientPage**: Main page component orchestrating the patient management UI

## Future Improvements

- Add authentication and authorization
- Implement advanced filtering and search functionality
- Add pagination for large datasets
- Implement unit and integration tests
- Add dark/light theme support
- Improve accessibility features

## License

MIT
