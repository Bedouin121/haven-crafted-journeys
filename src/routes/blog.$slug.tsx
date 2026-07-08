import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { articles } from "../lib/data";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — Aeris Journal` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:image", content: article.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial pt-40 pb-24 text-center">
      <h1 className="font-display text-4xl text-navy">Article not found</h1>
      <Link to="/blog" className="mt-6 inline-block text-teal">Return to journal</Link>
    </div>
  ),
  component: BlogArticle,
});

function BlogArticle() {
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article>
      <div className="container-editorial pt-32">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Journal", to: "/blog" }, { label: article.title }]} />
      </div>

      <div className="container-editorial pt-12 pb-16 max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-eyebrow text-teal">{article.category}</p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl text-navy leading-[1.05]">{article.title}</h1>
          <p className="mt-6 text-sm text-muted-foreground">By {article.author} · {article.date} · {article.readTime}</p>
        </motion.header>
      </div>

      <div className="container-editorial">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl">
          <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="container-editorial py-16 max-w-3xl">
        <p className="font-display text-2xl text-navy leading-[1.4] mb-10">{article.excerpt}</p>
        <div className="space-y-6 text-lg leading-relaxed text-foreground">
          {article.body.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <section className="bg-secondary py-20 mt-16">
        <div className="container-editorial">
          <p className="text-eyebrow text-teal">Continue reading</p>
          <h2 className="mt-3 font-display text-4xl text-navy">More from the journal</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {related.map((a) => (
              <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="group flex gap-6 items-start">
                <div className="w-32 h-32 shrink-0 overflow-hidden rounded-2xl">
                  <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.16em] text-teal">{a.category}</p>
                  <h3 className="mt-2 font-display text-xl text-navy group-hover:text-teal transition-colors leading-snug">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
