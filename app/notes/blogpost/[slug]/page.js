// app/notes/blogpost/[slug]/page.js
import fs from 'fs/promises';
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default async function BlogPost({ params }) {
    if (!params?.slug) {
        notFound();
    }

    try {
        const contentDir = path.join(process.cwd(), 'content');
        let matchedContent = null;

        // Check if content directory exists
        try {
            await fs.access(contentDir);
        } catch {
            console.error('Content directory not found');
            notFound();
        }

        const files = await fs.readdir(contentDir);
        
        for (const file of files) {
            const filePath = path.join(contentDir, file);
            
            try {
                const stat = await fs.stat(filePath);
                if (stat.isDirectory()) {
                    const subFiles = await fs.readdir(filePath);
                    for (const subFile of subFiles) {
                        if (!subFile.endsWith('.md')) continue;
                        
                        const subFilePath = path.join(filePath, subFile);
                        const content = await fs.readFile(subFilePath, 'utf-8');
                        const { data } = matter(content);
                        
                        // Use filename as slug if not present in frontmatter
                        const fileSlug = data.slug || subFile.replace('.md', '');
                        
                        if (fileSlug === params.slug) {
                            matchedContent = {
                                content,
                                filePath: subFilePath,
                                filename: subFile
                            };
                            break;
                        }
                    }
                } else if (file.endsWith('.md')) {
                    const content = await fs.readFile(filePath, 'utf-8');
                    const { data } = matter(content);
                    
                    // Use filename as slug if not present in frontmatter
                    const fileSlug = data.slug || file.replace('.md', '');
                    
                    if (fileSlug === params.slug) {
                        matchedContent = {
                            content,
                            filePath,
                            filename: file
                        };
                        break;
                    }
                }
            } catch (error) {
                console.error(`Error processing file ${file}:`, error);
                continue;
            }
        }

        if (!matchedContent) {
            console.error(`No content found for slug: ${params.slug}`);
            notFound();
        }

        const { content, data } = matter(matchedContent.content);
        data.slug = data.slug || matchedContent.filename.replace('.md', '');
        
        const stats = await fs.stat(matchedContent.filePath);
        const createdDate = stats.birthtime.toLocaleDateString();

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
                        <p className="text-sm text-gray-500 mb-4">
                            {createdDate}
                        </p>
                    )}
                </div>
                <div 
                    dangerouslySetInnerHTML={{ __html: String(htmlContent) }} 
                    className="prose dark:prose-invert max-w-none"
                />
            </div>
        );
    } catch (error) {
        console.error('Error processing blog post:', error);
        notFound();
    }
}