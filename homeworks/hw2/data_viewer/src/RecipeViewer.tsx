import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Recipe } from './types';

interface RecipeViewerProps {
  recipe: Recipe;
  currentIndex: number;
  total: number;
}

export const RecipeViewer: React.FC<RecipeViewerProps> = ({ 
  recipe, 
  currentIndex, 
  total 
}) => {
  // State for annotations per recipe
  const [annotations, setAnnotations] = useState<Record<string, string>>({});
  const [currentAnnotation, setCurrentAnnotation] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // Load saved annotation for current recipe
  useEffect(() => {
    const saved = localStorage.getItem(`annotation_${recipe.id}`);
    if (saved) {
      setCurrentAnnotation(saved);
      setWordCount(saved.split(/\s+/).filter(word => word.length > 0).length);
    } else {
      setCurrentAnnotation('');
      setWordCount(0);
    }
  }, [recipe.id]);

  const handleAnnotationChange = (value: string) => {
    const words = value.split(/\s+/).filter(word => word.length > 0);
    if (words.length <= 500) {
      setCurrentAnnotation(value);
      setWordCount(words.length);
      // Auto-save to localStorage
      localStorage.setItem(`annotation_${recipe.id}`, value);
    }
  };

  return (
    <div className="recipe-viewer">
      <div className="recipe-header">
        <div className="recipe-navigation">
          <h1 className="recipe-id">
            Recipe {currentIndex + 1} of {total}
          </h1>
          <span className="navigation-hint">
            Use ← → keys to navigate
          </span>
        </div>
        {/* <h1 className="recipe-id">Recipe #{recipe.id}</h1> */}
      </div>
      
      <div className="recipe-content">
        <div className="query-section">
          <h2>User Query</h2>
          <div className="query-text">
            {recipe.query}
          </div>
        </div>
        
        <div className="response-section">
          <h2>Recipe Response</h2>
          <div className="response-text">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="recipe-title">{children}</h1>,
                h2: ({children}) => <h2 className="recipe-subtitle">{children}</h2>,
                h3: ({children}) => <h3 className="recipe-section">{children}</h3>,
                ul: ({children}) => <ul className="recipe-list">{children}</ul>,
                ol: ({children}) => <ol className="recipe-ordered-list">{children}</ol>,
                li: ({children}) => <li className="recipe-list-item">{children}</li>,
                p: ({children}) => <p className="recipe-paragraph">{children}</p>,
                strong: ({children}) => <strong className="recipe-bold">{children}</strong>,
                em: ({children}) => <em className="recipe-italic">{children}</em>,
              }}
            >
              {recipe.response}
            </ReactMarkdown>
          </div>
        </div>

        <div className="open-coding-section">
          <h2>Open Coding Analysis</h2>
          <p className="section-description">
            Record your observations, notes, patterns, and potential errors or areas for improvement. 
            This analysis will help identify failure modes and themes in the bot's responses.
          </p>
          
          <div className="annotation-container">
            <div className="annotation-header">
              <label htmlFor="annotations" className="annotation-label">
                Labels/Notes/Patterns:
              </label>
              <div className="word-counter">
                <span className={wordCount > 450 ? 'word-count-warning' : 'word-count'}>
                  {wordCount}/500 words
                </span>
              </div>
            </div>
            
            <textarea
              id="annotations"
              className="annotation-textarea"
              value={currentAnnotation}
              onChange={(e) => handleAnnotationChange(e.target.value)}
              placeholder="Enter your observations about this recipe response...

Examples:
- Does the response match the user's query?
- Are there any factual errors or inconsistencies?
- Is the recipe clear and followable?
- Any issues with ingredients, instructions, or formatting?
- Cultural authenticity concerns?
- Missing or incomplete information?"
              rows={8}
            />
          </div>
        </div>
      </div>
    </div>
  );
};