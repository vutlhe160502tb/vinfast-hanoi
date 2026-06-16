import { notFound } from "next/navigation";
import { NEWS } from "@/lib/data";
import NewsDetailClient from "./NewsDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = NEWS.find((n) => n.slug === slug);
  if (!news) notFound();
  return <NewsDetailClient news={news} />;
}
