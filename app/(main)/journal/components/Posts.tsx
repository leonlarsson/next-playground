import { getPosts } from "../lib/actions";
import DeletePostButton from "./DeletePostButton";

export default async ({ admin }: { admin: boolean }) => {
  const res = await getPosts();
  if (!res.ok) return <span className="text-red-500 dark:text-red-400">Failed to fetch posts.</span>;
  const posts: Post[] = await res.json();

  return (
    <section className="grid max-w-prose grid-cols-2 gap-3 max-sm:grid-cols-1">
      {posts.map(post => (
        <div key={post.id} className="flex flex-col justify-between rounded border border-kinda-black p-2 text-left dark:border-kinda-white">
          <div className="flex flex-col">
            <span className="text-xs">{new Date(post.date).toLocaleString()}</span>
            <span className="text-lg font-bold">{post.title}</span>
            <span className="whitespace-pre-wrap">{post.body}</span>
          </div>
          {admin && <DeletePostButton id={post.id} />}
        </div>
      ))}
      {!posts.length && <span>Awaiting messages...</span>}
    </section>
  );
};

export type Post = {
  id: string;
  date: number;
  title: string;
  body: string;
};
