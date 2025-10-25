import Papa from 'papaparse';
import { Recipe } from './types';

export const parseCSV = (csvText: string): Recipe[] => {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  
  return parsed.data as Recipe[];
};

export const loadCSVFile = (file: File): Promise<Recipe[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      try {
        const recipes = parseCSV(csvText);
        resolve(recipes);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const exportCSVWithOpenCodes = (recipes: Recipe[], originalFileName: string) => {
  // Get all annotations from localStorage
  const recipesWithOpenCodes = recipes.map(recipe => ({
    ...recipe,
    open_codes: localStorage.getItem(`annotation_${recipe.id}`) || ''
  }));

  // Convert to CSV format
  const headers = ['id', 'query', 'response', 'open_codes'];
  const csvContent = [
    headers.join(','),
    ...recipesWithOpenCodes.map(recipe => [
      `"${recipe.id}"`,
      `"${recipe.query.replace(/"/g, '""')}"`,
      `"${recipe.response.replace(/"/g, '""')}"`,
      `"${recipe.open_codes.replace(/"/g, '""')}"`
    ].join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Generate filename
  const baseName = originalFileName.replace('.csv', '');
  const newFileName = `opencodes_${baseName}.csv`;
  
  // Create download link
  link.href = URL.createObjectURL(blob);
  link.download = newFileName;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up URL object
  URL.revokeObjectURL(link.href);
};