// app/notes/blogpost/[slug]/page.js
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm"; // for rendering markdown table correctly

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

export default async function BlogPost({ params }) {
  if (!params?.slug) {
    notFound();
  }

  try {
    const contentDir = path.join(process.cwd(), "content");
    let matchedNote = null;

    try {
      await fs.access(contentDir);
    } catch {
      console.error("Content directory not found");
      notFound();
    }

    const subjects = await fs.readdir(contentDir);

    // Go to Subject Directory
    for (const subject of subjects) {
      if (fileOrFolderToFriendlySlug(subject) == params.subject) {
        const subjectPath = path.join(contentDir, subject);

        try {
          const notes = await fs.readdir(subjectPath);

          for (const note of notes) {
            if (!note.endsWith(".md")) continue;

            const notePath = path.join(subjectPath, note);

            const content = await fs.readFile(notePath, "utf-8");

            const { data } = matter(content);

            // Calculate noteTitle and noteSlug BEFORE checking if it matches
            const noteTitle = filenameToFormattedTitle(note.replace(".md", ""));
            const noteSlug = data.slug || fileOrFolderToFriendlySlug(noteTitle);

            if (noteSlug === params.slug) {
              matchedNote = {
                content,
                notePath: notePath,
                note: note,
                noteTitle: noteTitle,
                noteSlug: noteSlug,
              };

              break;
            }
          }
        } catch (error) {
          console.error(`Error processing subject ${subject}:`, error);
          continue;
        }

        // If we found a match, break out of the subjects loop
        if (matchedNote) break;
      }
    }

    if (!matchedNote) {
      console.error(`No content found for slug: ${params.slug}`);
      notFound();
    }

    const { content, data } = matter(matchedNote.content);

    // Use the pre-calculated title and slug that we stored in matchedNote
    data.title = data.title || matchedNote.noteTitle;
    data.slug = data.slug || matchedNote.noteSlug;

    const stats = await fs.stat(matchedNote.notePath);
    const createdDate = stats.birthtime.toLocaleDateString();

    // Markdown processing
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm) // Add GitHub Flavored Markdown support here, for rendering markdown table correctly
      .use(remarkRehype)
      .use(rehypeDocument, { title: data.title })
      .use(rehypeFormat)
      .use(rehypeStringify)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypePrettyCode, {
        theme: "github-dark",
        transformers: [
          transformerCopyButton({
            visibility: "always",
            feedbackDuration: 3000,
          }),
        ],
      });

    const htmlContent = await processor.process(content);

    return (
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        {data.description && (
          <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
            &quot;{data.description}&quot;
          </p>
        )}
        <div className="flex gap-2">
          {data.author && (
            <p className="text-sm text-gray-500 mb-4 italic">
              By {data.author}
            </p>
          )}
          {createdDate && (
            <p className="text-sm text-gray-500 mb-4">{createdDate}</p>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: String(htmlContent) }}
          className="prose dark:prose-invert max-w-none"
        />
      </div>
    );
  } catch (error) {
    console.error("Error processing blog post:", error);
    notFound();
  }
}
