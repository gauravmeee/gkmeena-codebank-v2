// app/notes/[slug]/page.js
import React from 'react';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

export default async function FolderPage({ params }) {
    if (!params?.slug) {
        notFound();
    }

    try {
        const folderPath = path.join(process.cwd(), 'content', params.slug);
        
        try {
            await fs.access(folderPath);
        } catch {
            console.error(`Folder not found: ${params.slug}`);
            notFound();
        }

        const files = await fs.readdir(folderPath);
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        if (markdownFiles.length === 0) {
            console.error(`No markdown files found in folder: ${params.slug}`);
            notFound();
        }

        const notesPromises = markdownFiles.map(async (file) => {
            const filePath = path.join(folderPath, file);
            
            try {
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const { data } = matter(fileContent);
                const stats = await fs.stat(filePath);

                // Get base filename without extension
                const baseFilename = file.replace('.md', '');
                
                // Format filename as title (capitalize words and replace hyphens with spaces)
                const formattedTitle = baseFilename.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');

                return {
                    ...data,
                    slug: data.slug || baseFilename,
                    title: data.title || formattedTitle,
                    filename: file,
                    createdDate: stats.birthtime,
                };
            } catch (error) {
                console.error(`Error processing file ${file}:`, error);
                return null;
            }
        });

        const notes = (await Promise.all(notesPromises)).filter(Boolean);

        if (notes.length === 0) {
            console.error(`No valid notes found in folder: ${params.slug}`);
            notFound();
        }

        notes.sort((a, b) => b.createdDate - a.createdDate);

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
    } catch (error) {
        console.error('Error processing folder page:', error);
        notFound();
    }
}