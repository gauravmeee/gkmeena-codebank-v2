import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";

const notesDir = path.join(process.cwd(), "content");

const getFolderImage = (folderName) => {
  const imagePath = path.join(process.cwd(), "public", "assets", "notes", `${folderName.toLowerCase()}.png`);
  return fs.existsSync(imagePath)
    ? `/assets/notes/${folderName.toLowerCase()}.png`
    : null;
};

const fileOrFolderToFriendlySlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9-]/gi, "-") // Replace non-alphanumeric characters with '-'
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

const folderToFriendlyName = (str) => {
  // Remove all non-word chars (except hyphens)
  return str.replace(/[^\w\s-]/g, "");
};

// Get folders and count .md files inside them
const getFolders = () => {
  // Read the Notes folder to get All Subject Folder
  return fs
    .readdirSync(notesDir, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((folder) => {
      const folderPath = path.join(notesDir, folder.name);

      // ON Notes Page: Read 'md' files Inside each [subject] folder to  To find no. of .md files ⭐
      const files = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".md"));
      const fileCount = files.length;

      // Friendly Slug and Folder Name
      const folderSlug = fileOrFolderToFriendlySlug(folder.name);
      const folderName = folderToFriendlyName(folder.name);

      return {
        name: folderName,
        slug: folderSlug,
        image: getFolderImage(folderSlug),
        fileCount,
      };
    });
};

const folders = getFolders();


{/* <div className="min-h-screen px-4 sm:px-6 py-6 max-w-7xl mx-auto backdrop-blur">
<div className="flex items-center justify-center mb-6 sm:mb-8">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
    Tech Jobs
  </h2>
</div> */}
const FolderGrid = () => {
  return (
    // note in tailwind.config.js, xsm, sm, lg, xl, 2x are redefined
    <div className="min-h-screen sm:px-6 py-6 mx-auto backdrop-blur"> 
      <div className="flex items-center justify-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          Programming Notes
        </h2>
      </div>
      <div className="grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-8">
        {folders.map((folder, index) => (
          <Link key={folder.slug || index} href={`/notes/${folder.slug}`}>
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
                <p
                  className={`text-sm italic ${
                    folder.fileCount < 1
                      ? "text-red-600 font-light"
                      : "text-gray-600 font-bold"
                  }`}
                >
                  {folder.fileCount} {folder.fileCount === 1 ? "Note" : "Notes"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FolderGrid;
