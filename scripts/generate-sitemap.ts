import { createWriteStream } from "fs";
import { SitemapStream } from "sitemap";
import { pipeline } from "stream";
import { promisify } from "util";

const asyncPipeline = promisify(pipeline);

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: "https://baseweb.com" });
  const writeStream = createWriteStream("./public/sitemap.xml");

  // Add URLs to the sitemap
  const urls = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    // 他のURLをここに追加
  ];

  for (const url of urls) {
    sitemap.write(url);
  }

  sitemap.end();

  try {
    await asyncPipeline(sitemap, writeStream);
    console.log("Sitemap created successfully");
  } catch (error) {
    console.error("Error creating sitemap:", error);
  }
}

generateSitemap();
