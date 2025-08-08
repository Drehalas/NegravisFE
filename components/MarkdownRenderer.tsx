/**
 * TypeScript Markdown Renderer Component
 * Converts markdown strings to safe TypeScript JSX without HTML injection
 */

'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface MarkdownElement {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'code' | 'pre' | 'strong' | 'em' | 'br' | 'text';
  content: string;
  children?: MarkdownElement[];
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const parseMarkdown = (text: string): MarkdownElement[] => {
    if (!text) return [];

    const elements: MarkdownElement[] = [];
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Headers
      if (line.startsWith('### ')) {
        elements.push({
          type: 'h3',
          content: line.substring(4)
        });
      } else if (line.startsWith('## ')) {
        elements.push({
          type: 'h2',
          content: line.substring(3)
        });
      } else if (line.startsWith('# ')) {
        elements.push({
          type: 'h1',
          content: line.substring(2)
        });
      }
      // Code blocks
      else if (line.startsWith('```')) {
        const codeContent: string[] = [];
        i++; // Skip opening ```
        
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeContent.push(lines[i]);
          i++;
        }
        
        elements.push({
          type: 'pre',
          content: codeContent.join('\n')
        });
      }
      // Empty lines become breaks
      else if (line.trim() === '') {
        elements.push({
          type: 'br',
          content: ''
        });
      }
      // Regular paragraphs
      else {
        elements.push({
          type: 'p',
          content: line
        });
      }
    }
    
    return elements;
  };

  const parseInlineMarkdown = (text: string): React.ReactElement[] => {
    const parts: React.ReactElement[] = [];
    let currentIndex = 0;
    
    // Regular expressions for inline elements
    const patterns = [
      { type: 'code', regex: /`([^`]+)`/g },
      { type: 'strong', regex: /\*\*([^*]+)\*\*/g },
      { type: 'em', regex: /\*([^*]+)\*/g },
    ];
    
    // Find all matches
    const matches: Array<{ start: number; end: number; type: string; content: string; match: string }> = [];
    
    patterns.forEach(({ type, regex }) => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          type,
          content: match[1],
          match: match[0]
        });
      }
    });
    
    // Sort matches by position
    matches.sort((a, b) => a.start - b.start);
    
    // Process matches
    matches.forEach((match, index) => {
      // Add text before match
      if (match.start > currentIndex) {
        const textContent = text.substring(currentIndex, match.start);
        if (textContent) {
          parts.push(
            <span key={`text-${index}-${currentIndex}`}>
              {textContent}
            </span>
          );
        }
      }
      
      // Add formatted element
      switch (match.type) {
        case 'code':
          parts.push(
            <code 
              key={`code-${index}`}
              className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono"
            >
              {match.content}
            </code>
          );
          break;
        case 'strong':
          parts.push(
            <strong key={`strong-${index}`} className="font-semibold">
              {match.content}
            </strong>
          );
          break;
        case 'em':
          parts.push(
            <em key={`em-${index}`} className="italic">
              {match.content}
            </em>
          );
          break;
      }
      
      currentIndex = match.end;
    });
    
    // Add remaining text
    if (currentIndex < text.length) {
      const remainingText = text.substring(currentIndex);
      if (remainingText) {
        parts.push(
          <span key={`text-end-${currentIndex}`}>
            {remainingText}
          </span>
        );
      }
    }
    
    return parts.length > 0 ? parts : [<span key="default">{text}</span>];
  };

  const renderElement = (element: MarkdownElement, index: number): React.ReactElement => {
    const key = `${element.type}-${index}`;
    
    switch (element.type) {
      case 'h1':
        return (
          <h1 key={key} className="text-3xl font-bold text-white mb-6">
            {parseInlineMarkdown(element.content)}
          </h1>
        );
      
      case 'h2':
        return (
          <h2 key={key} className="text-2xl font-semibold text-white mb-4 mt-8">
            {parseInlineMarkdown(element.content)}
          </h2>
        );
      
      case 'h3':
        return (
          <h3 key={key} className="text-xl font-semibold text-white mb-3 mt-6">
            {parseInlineMarkdown(element.content)}
          </h3>
        );
      
      case 'pre':
        return (
          <pre key={key} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm font-mono">
              {element.content}
            </code>
          </pre>
        );
      
      case 'p':
        return (
          <p key={key} className="text-gray-300 mb-4 leading-relaxed">
            {parseInlineMarkdown(element.content)}
          </p>
        );
      
      case 'br':
        return <br key={key} />;
      
      default:
        return (
          <span key={key} className="text-gray-300">
            {element.content}
          </span>
        );
    }
  };

  const elements = parseMarkdown(content);

  return (
    <div className={`markdown-content prose prose-lg max-w-none ${className}`}>
      {elements.map((element, index) => renderElement(element, index))}
    </div>
  );
}

// Export types for external use
export type { MarkdownRendererProps, MarkdownElement };