# Patient Directory Application

This is a [Next.js](https://nextjs.org) project that displays a patient directory with both table and card views. The application includes features such as search, filtering, sorting, and pagination.

## Features

- **Dual View Options**: Toggle between table and card views
- **Search Functionality**: Search patients by name, medical issue, or contact information
- **Filtering**: Filter patients by medical issue and age range
- **Sorting**: Sort patients by different fields (name, age, etc.)
- **Pagination**: Navigate through pages of patient data
- **Responsive Design**: Works on various screen sizes

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Hooks

## Project Structure

```
/src
  /app
    /api
      /patients
        route.ts       # API endpoint for patient data
    layout.tsx        # Root layout component
    page.tsx          # Main page component
  /components
    CardView.tsx      # Card view component
    Header.tsx        # Header component
    Pagination.tsx    # Pagination component
    SearchBar.tsx     # Search and filter component
    TableView.tsx     # Table view component
  /types
    index.ts          # TypeScript interfaces
/public
  data.json           # Patient data
```

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## Install the dependencies:
```bash
npm install
# or
yarn install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architectural Decisions

### API Implementation

The application uses Next.js Route Handlers to create a local API endpoint that serves patient data from a JSON file. This approach allows for:

- Server-side data processing
- Pagination, filtering, and sorting on the server
- Reduced client-side data processing

### State Management

React's built-in useState and useEffect hooks are used for state management. This approach is sufficient for this application's complexity level and avoids unnecessary dependencies.

### Component Structure

The application follows a component-based architecture with clear separation of concerns:

- **Page Component**: Manages overall state and data fetching
- **View Components**: Handle different display modes (table/card)
- **Utility Components**: Provide reusable functionality (search, pagination)

### TypeScript Integration

TypeScript interfaces are used throughout the application to ensure type safety and improve developer experience. Key interfaces include:

- Patient data structure
- API response format
- Filter and pagination parameters

## Performance Considerations

- **Debounced Search**: Prevents excessive API calls during typing
- **Pagination**: Limits the amount of data loaded at once
- **Server-side Filtering**: Reduces data transfer and client-side processing
- **Memoization**: Used where appropriate to prevent unnecessary re-renders

## Submission Details

This project was completed as part of the **Frontend Developer Assessment** for **PRUDENTBIT**.

### Candidate Information
- **Name**: Rudraksh Jhaveri  
- **Role Applied For**: Frontend Developer  
- **Email**: rudrakshjhaveri28@gmail.com  
- **GitHub**: [RudrakshDev](https://github.com/RudrakshDev)