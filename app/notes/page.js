import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

const notesDir = path.join(process.cwd(), 'content');

const getFolderImage = (folderName) => {
  const imagePath = path.join(process.cwd(), 'public', 'assets/notes', `${folderName.toLowerCase()}.png`);
  return fs.existsSync(imagePath) ? `/assets/notes/${folderName.toLowerCase()}.png` : null;
};

// Get folders and count .md files inside them
const getFolders = () => {
  return fs.readdirSync(notesDir, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(folder => {
      const folderPath = path.join(notesDir, folder.name);
      const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.md'));
      const fileCount = files.length;
      return {
        name: folder.name,
        slug: folder.name,
        image: getFolderImage(folder.name),
        fileCount
      };
    });
};

const folders = getFolders();

const FolderGrid = () => {
  return (
    <>
    <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-center py-5">Computer Notes</h2>
    <div className="max-w-full mx-auto p-6 md:px-14">
      <div className="grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-8">
        {folders.map((folder, index) => (
          <Link key={folder.slug || index} href={`/notes/${folder.slug}`} >
          <div className="rounded-lg shadow-md overflow-hidden dark:border-2">
            <div className="w-full h-48 bg-gray-300 flex justify-center items-center">
              {folder.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={folder.image}
                    alt={folder.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <span className="text-xl font-bold">{folder.name}</span>
              )}
            </div>
            
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{folder.name}</h2>
              {folder.fileCount > 0 ? (
                  <p className="text-sm text-gray-600">{folder.fileCount} {folder.fileCount > 1 ? 'Notes' : 'Note'}</p>
                ) : (
                  <p className="text-sm text-gray-600">No Notes</p>
                )}
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default FolderGrid;