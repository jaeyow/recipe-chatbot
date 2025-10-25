import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Recipe } from './types';
import { loadCSVFile, exportCSVWithOpenCodes } from './utils';
import { RecipeViewer } from './RecipeViewer';

const queryClient = new QueryClient();

const FileUploader: React.FC<{ onFileLoad: (recipes: Recipe[], fileName: string) => void }> = ({ onFileLoad }) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const recipes = await loadCSVFile(file);
        onFileLoad(recipes, file.name);
      } catch (error) {
        console.error('Error loading CSV file:', error);
        alert('Error loading CSV file. Please check the file format.');
      }
    }
  };

  return (
    <div className="file-uploader">
      <h1>Recipe Data Viewer</h1>
      <p>Upload your CSV file to view recipes</p>
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileChange}
        className="file-input"
      />
    </div>
  );
};

const RecipeNavigator: React.FC<{ recipes: Recipe[], originalFileName: string }> = ({ recipes, originalFileName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't navigate if user is typing in a textarea or input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
        return;
      }
      
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (event.key === 'ArrowRight' && currentIndex < recipes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, recipes.length]);

  if (recipes.length === 0) {
    return <div>No recipes found in the CSV file.</div>;
  }

  const handleExportOpenCodes = () => {
    exportCSVWithOpenCodes(recipes, originalFileName);
  };

  return (
    <div>
      <div className="export-controls">
        <button 
          onClick={handleExportOpenCodes}
          className="export-button"
        >
          📊 Export Open Codes CSV
        </button>
      </div>
      <RecipeViewer
        recipe={recipes[currentIndex]}
        currentIndex={currentIndex}
        total={recipes.length}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasData, setHasData] = useState(false);
  const [originalFileName, setOriginalFileName] = useState<string>('');

  const handleFileLoad = (loadedRecipes: Recipe[], fileName: string) => {
    setRecipes(loadedRecipes);
    setOriginalFileName(fileName);
    setHasData(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        {!hasData ? (
          <FileUploader onFileLoad={handleFileLoad} />
        ) : (
          <RecipeNavigator recipes={recipes} originalFileName={originalFileName} />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;