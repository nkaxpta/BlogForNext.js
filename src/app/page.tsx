import Link from "next/link";
import { getRecentlyArticles } from "~/lib/client";
import Categories from "@/components/Categories";
import FormatDate from "@/components/FormatDate";
import Profile from "@/components/Profile";

const Home = async () => {
  const recentlyArticles = await getRecentlyArticles();
  // console.log(recentlyArticles);

  return (
    <div className="justify-center mt-24">
      <div className="text-center">
        <h1 className="font-medium text-4xl mb-4">
          エンジニアになった元数学教師の記録
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="text-sm text-gray-400">
          <Profile nameCenter={true} />
        </div>
      </div>
      <main>
        <div className="flex my-8 sm:w-auto md:w-2/3 lg:w-1/2 xl:w-5/12 mx-auto">
          <div className="flex-grow">
            <h2 className="text-2xl my-8">📝Recently Articles</h2>
            <article className="grid grid-cols-1 gap-10">
              {recentlyArticles.map((article) => (
                <div className="bg-gray-100 rounded-lg p-3" key={article.id}>
                  <Link href={`/Articles/Post/${article.id}`}>
                    <h1 className=" hover:underline text-xl md:text-x1 mb-3 font-semibold border-b-2">
                      {article.title}
                    </h1>
                  </Link>
                  <Categories article={article} />
                  <span className="text-center">
                    <FormatDate article={article} dateName="created" />
                  </span>
                </div>
              ))}
            </article>
            <h2 className="text-2xl mt-16 flex items-center justify-center">
              <Link
                href="/Articles/page/1"
                className="hover:text-blue-600 hover:underline duration-150 inline"
              >
                🚀All Post
              </Link>
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
