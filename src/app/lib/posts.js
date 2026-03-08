import fs from "fs/promises";
import path from "path";

export async function getPosts() {
  const contentDir = path.join(process.cwd(), "content");
  const files = await fs.readdir(contentDir);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, "utf-8");
        const slug = file.replace(".md", "");

        // Extract title and date from markdown
        const titleMatch = content.match(/^# (.+)$/m);
        const dateMatch = content.match(/\*\*Date:\*\* (.+)/);

        return {
          slug,
          title: titleMatch ? titleMatch[1] : slug,
          date: dateMatch ? dateMatch[1] : "Unknown",
          content,
        };
      })
  );

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
