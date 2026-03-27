import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

function extractLegacyTitle(rawContent, slug) {
  const headingMatch = rawContent.match(/^\s*#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  const firstNonEmptyLine = rawContent
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  if (
    firstNonEmptyLine &&
    !firstNonEmptyLine.startsWith('**Date:**') &&
    !firstNonEmptyLine.startsWith('![')
  ) {
    return firstNonEmptyLine;
  }

  return slug;
}

function extractLegacyDate(rawContent) {
  const dateMatch = rawContent.match(/\*\*Date:\*\* (.+)/);
  return dateMatch ? dateMatch[1] : 'Unknown';
}

function extractLegacyBody(rawContent) {
  const lines = rawContent.split('\n');
  const contentStart = lines.findIndex(
    (line, i) => i > 0 && line.match(/\*\*Date:\*\*/)
  );

  if (contentStart === -1) {
    return rawContent.trim();
  }

  return lines
    .slice(contentStart + 1)
    .join('\n')
    .trim();
}

function normalizeDateValue(dateValue) {
  if (!dateValue) return 'Unknown';
  if (dateValue instanceof Date) {
    return dateValue.toISOString().split('T')[0];
  }
  return String(dateValue);
}

function toTimestamp(dateString) {
  const timestamp = Date.parse(dateString);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export async function getPosts() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = await fs.readdir(contentDir);

  const posts = await Promise.all(
    files
      .filter((file) => /\.mdx?$/.test(file))
      .map(async (file) => {
        const filePath = path.join(contentDir, file);
        const rawContent = await fs.readFile(filePath, 'utf-8');
        const slug = file.replace(/\.mdx?$/, '');
        const parsed = matter(rawContent);

        const frontmatterTitle = parsed.data?.title;
        const frontmatterDate = parsed.data?.date;
        const hasLegacyHeader =
          !frontmatterTitle &&
          !frontmatterDate &&
          /\*\*Date:\*\*/.test(rawContent);
        const resolvedDate = frontmatterDate
          ? normalizeDateValue(frontmatterDate)
          : extractLegacyDate(rawContent);

        return {
          slug,
          title: frontmatterTitle || extractLegacyTitle(rawContent, slug),
          date: resolvedDate,
          content: hasLegacyHeader
            ? extractLegacyBody(rawContent)
            : parsed.content.trim(),
        };
      })
  );

  // Sort by date, newest first
  return posts.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
