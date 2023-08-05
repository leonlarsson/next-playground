import { profanity } from "@2toad/profanity";
import DeleteEntryButton from "./DeleteEntryButton";
import { getEntries } from "../lib/actions";

export default async ({ userEmail }: { userEmail: string | null }) => {
  const entries = await getEntries();
  if (!entries) return <span className="text-red-500 dark:text-red-400">Failed to fetch messages.</span>;
  const userIsAdmin = !!userEmail && !!process.env.ADMIN_EMAIL && userEmail === process.env.ADMIN_EMAIL;

  return (
    <section className="flex flex-col text-start">
      {entries.map(entry => (
        <div key={entry.id} className="break-all rounded p-1 text-sm hover:bg-gray-300 dark:hover:bg-gray-300/10">
          {userIsAdmin || (userEmail && userEmail === entry.email) ? <DeleteEntryButton id={entry.id} /> : null}{" "}
          <span className={entry.name ? "font-semibold dark:text-kinda-white" : "text-kinda-black/90 dark:text-kinda-white/75"} title={`${entry.date} UTC`}>
            {entry.name ?? "Anonymous"}:
          </span>{" "}
          <span>{profanity.censor(entry.body.replace(/\s+/g, " "))}</span>
        </div>
      ))}
      {!entries.length && <span>Awaiting messages...</span>}
    </section>
  );
};

export type Entry = {
  id: string;
  date: number;
  body: string;
  name?: string;
  email?: string;
};
