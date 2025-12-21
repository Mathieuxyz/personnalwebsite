import Nametag from "@/components/nametag";
import HomeArticles from "@/components/homeArticles";
import { readSiteData } from "@/lib/data/store";

export default async function Home() {
  const siteData = await readSiteData();
  const articles = siteData.blog?.articles ?? [];

  return (
    <div className="flex justify-center w-full">
      <main className="flex flex-col w-full max-w-6xl gap-8 py-10">
        <Nametag />
        <HomeArticles articles={articles} />
      </main>
    </div>
  );
}
