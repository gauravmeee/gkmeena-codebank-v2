// app/notes/[slug]/page.js
import React from 'react';  
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; 

export default function FolderPage({ params }) {
  const folderPath = path.join(process.cwd(), 'content', params.slug);
  
  // Read files in the folder and filter for .md files only
  const files = fs.readdirSync(folderPath)
    .filter(filename => filename.endsWith('.md'));

  // Process files
  const notes = files.map((file) => {
    // Construct the full file path
    const filePath = path.join(folderPath, file);

    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse frontmatter using matter
    const { data } = matter(fileContent);

    // Get file creation time
    const stats = fs.statSync(filePath);
    const createdDate = stats.birthtime.toLocaleDateString();
    
    return {
      ...data,
      slug: file.replace('.md', ''), // Remove .md extension for the slug
      filename: file,
      createdDate, // Include the file's created date
    };
  });

  return (
    <div className="container mx-auto p-4 lg:px-60">
      <h1 className="text-4xl font-bold mb-8 text-center">{params.slug} Notes</h1>
      
      <div className="flex flex-col gap-8">
        {notes.map((note, index) => (
          <Link key={index} href={`/notes/blogpost/${note.slug}`}>
            <div className="rounded-lg shadow-md overflow-hidden dark:border-2 hover:shadow-lg transition-shadow">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
                
                {note.description && (
                  <p className="mb-4">{note.description}</p>
                )}
                
                <div className="text-sm mb-4">
                  {note.author && <span>By {note.author}</span>}
                  {note.createdDate && (
                    <>
                      {note.author && ' | '}
                      <span>{new Date(note.createdDate).toLocaleDateString('en-GB', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}