import Papa from 'papaparse';
import { Recipe } from './types';

export const parseCSV = (csvText: string): Recipe[] => {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  
  // Map the parsed data to ensure compatibility with both formats
  return (parsed.data as any[]).map((row, index) => {
    // Handle different CSV formats
    const recipe: Recipe = {
      // Use existing id field, or fallback to trace_id, query_id, or generate one
      id: row.id || row.trace_id || row.query_id || `recipe_${index + 1}`,
      query: row.query || '',
      response: row.response || '',
      // Optional fields for raw_traces.csv format
      dietary_restriction: row.dietary_restriction,
      success: row.success,
      error: row.error,
      trace_id: row.trace_id,
      query_id: row.query_id
    };
    
    return recipe;
  }).filter(recipe => recipe.query && recipe.response); // Filter out incomplete rows
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
    open_codes: localStorage.getItem(`annotation_${originalFileName}_${recipe.id}`) || ''
  }));

  // Determine headers based on available fields
  const baseHeaders = ['id', 'query', 'response'];
  const optionalHeaders = ['dietary_restriction', 'success', 'error', 'trace_id', 'query_id'];
  const availableHeaders = optionalHeaders.filter(header => 
    recipesWithOpenCodes.some(recipe => recipe[header as keyof Recipe] !== undefined)
  );
  const headers = [...baseHeaders, ...availableHeaders, 'open_codes'];

  // Convert to CSV format
  const csvContent = [
    headers.join(','),
    ...recipesWithOpenCodes.map(recipe => 
      headers.map(header => {
        const value = header === 'open_codes' 
          ? recipe.open_codes 
          : recipe[header as keyof Recipe] || '';
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    )
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