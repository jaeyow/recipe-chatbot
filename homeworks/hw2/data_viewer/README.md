# Recipe Data Viewer

A React-based application for viewing CSV recipe data with markdown support and keyboard navigation.

## Features

- Load CSV files with recipe data
- Navigate between recipes using left/right arrow keys
- Render markdown content in recipe responses
- Clean, responsive interface
- Real-time recipe counter and navigation hints

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

4. Upload your CSV file with the expected format:
   - `id`: Recipe identifier
   - `query`: User query text
   - `response`: Recipe response in markdown format

## Usage

- Upload a CSV file using the file input
- Use left/right arrow keys to navigate between recipes
- The interface displays both the user query and formatted recipe response
- Recipe counter shows current position in the dataset

## CSV Format

Expected CSV columns:
- `id`: Unique identifier for the recipe
- `query`: The user's original query
- `response`: The recipe response (supports markdown formatting)

## Technologies Used

- React 18
- TypeScript
- Vite
- TanStack Query
- React Markdown
- Papa Parse