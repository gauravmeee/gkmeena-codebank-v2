// app/notes/blogpost/[slug]/page.js
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import rehypePrettyCode from "rehype-pretty-code"
import { transformerCopyButton } from '@rehype-pretty/transformers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

export default async function BlogPost({ params }) {
    // Search for the file in all content subdirectories
    const contentDir = path.join(process.cwd(), 'content');
    const folders = fs.readdirSync(contentDir);
    
    let filepath;
    let fileContent;
    
    // Search through each folder for the matching markdown file
    for (const folder of folders) {
        const possiblePath = path.join(contentDir, folder, `${params.slug}.md`);
        if (fs.existsSync(possiblePath)) {
            filepath = possiblePath;
            fileContent = fs.readFileSync(filepath, "utf-8");
            break;
        }
    }
    
    if (!fileContent) {
        notFound();
        return;
    }

    const { content, data } = matter(fileContent);

    // Get the file creation time
    const stats = fs.statSync(filepath);
    const createdDate = stats.birthtime.toLocaleDateString(); // date created (from file)

    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument, { title: data.title || 'Blog Post' })
        .use(rehypeFormat)
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypePrettyCode, {
            theme: "github-dark",
            transformers: [
                transformerCopyButton({
                    visibility: 'always',
                    feedbackDuration: 3000,
                }),
            ],
        });

    const htmlContent = (await processor.process(content)).toString();

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
                    <p className="text-sm text-gray-500 mb-4">
                        {createdDate}
                    </p>
                )}
            </div>
            <div 
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
                className="prose dark:prose-invert max-w-none"
            />
        </div>
    );
}