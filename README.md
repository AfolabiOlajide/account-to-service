# ATS Tracker

ATS Tracker (Account To Service Tracker) is a local-first application designed to help you organize and track your digital identities and the services associated with them. It allows you to map out which email addresses or social details are used for which services, giving you a clear "Identity Map" of your digital footprint.

## Features

- **Identity Map**: Visualize your accounts (identities) and their connected services.
- **Local Storage**: All data is persisted locally in your browser's LocalStorage. No external database required.
- **Dark/Light Mode**: Fully supported theming with system preference detection.
- **Search & Filter**: Quickly find specific services or accounts using the built-in search.
- **Responsive Design**: Built with a mobile-first approach using Tailwind CSS.

## Tech Stack

- **Frontend**: React (v19) with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4)
- **UI Components**: shadcn/ui (Radix UI + Lucide Icons)

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd ats-tracker
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Linting

To run the linter:

```bash
npm run lint
```

## Project Structure

- `src/components`: UI components (including shadcn/ui primitives).
- `src/hooks`: Custom React hooks (e.g., `useAccounts`).
- `src/lib`: Utilities, types, and storage logic.
- `src/App.tsx`: Main application file.
