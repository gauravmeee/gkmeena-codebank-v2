// app/notes/[slug]/page.js
import React from "react";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const fileOrFolderToFriendlySlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9-]/gi, "-") // Replace non-alphanumeric characters with '-'
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

const filenameToFormattedTitle = (str) => {
  // Ignore the Prefix, (And splits which have between '_')
  const [tag, ...restTitle] = str.split("_");
  // Joins the remaining parts (restTitle) with spaces.
  return restTitle.join(" ");
};

export default async function FolderPage({ params }) {
  if (!params?.subject) {
    notFound();
  }

  try {
    // const subjectPath = path.join(process.cwd(), 'content', params.subject);

    // -----------------------------Find Subject Folder Path---------------
    const notesPath = path.join(process.cwd(), "content");
    const subjectsFolders = await fs.readdir(notesPath, {
      withFileTypes: true,
    });

    // Find the correct folder by comparing slugified names
    const matchedSubject = subjectsFolders
      .filter((dirent) => dirent.isDirectory())
      .find(
        (dirent) => fileOrFolderToFriendlySlug(dirent.name) === params.subject
      )?.name;

    if (!matchedSubject) {
      console.error(`Folder not found for slug: ${params.subject}`);
      notFound();
    }

    const subjectPath = path.join(notesPath, matchedSubject);

    // --------------------------------------------------

    try {
      await fs.access(subjectPath);
    } catch {
      console.error(`Folder not found: ${params.subject}`);
      notFound();
    }
    // Check All files in folder Paths
    const files = await fs.readdir(subjectPath);
    // each files = name of files (including extension)
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    if (markdownFiles.length === 0) {
      console.error(`No markdown files found in folder: ${params.subject}`);
      notFound();
    }

    const notesPromises = markdownFiles.map(async (file) => {
      const filePath = path.join(subjectPath, file);

      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data } = matter(fileContent);
        const stats = await fs.stat(filePath);

        // Extracts the filename without the any extension(ex '.md')
        const baseFilename = path.parse(file).name;

        // Format filename as title (capitalize words and replace hyphens with spaces)
        const noteTitle = filenameToFormattedTitle(baseFilename);
        const noteSlug = fileOrFolderToFriendlySlug(noteTitle);

        //

        return {
          ...data,
          slug: data.slug || noteSlug,
          title: data.title || noteTitle,
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
      console.error(`No valid notes found in folder: ${params.subject}`);
      notFound();
    }

    notes.sort((a, b) => b.createdDate - a.createdDate);

    return (
      <div className="max-w-full mx-auto xsm:p-6 sm:p-10 md:px-14">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {matchedSubject} Notes
        </h1>

        <div className="flex flex-col gap-8">
          {notes.map((note, index) => (
            <Link key={index} href={`/notes/${params.subject}/${note.slug}`}>
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
                        {note.author && " | "}
                        <span>
                          {new Date(note.createdDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
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
    console.error("Error processing folder page:", error);
    notFound();
  }
}
