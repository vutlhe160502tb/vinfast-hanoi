"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar } from "lucide-react";
import { NEWS } from "@/lib/data";

type News = {
  id: number;
  title: string;
  date: string;
  image: string;
  slug: string;
  excerpt?: string;
};

interface Props {
  news: News;
}

export default function NewsDetailClient({ news }: Props) {
  const relatedNews = NEWS.filter((n) => n.slug !== news.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          href="/tin-tuc"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#db2a2a] mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          Tin tức
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
            {news.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
            <Calendar size={14} />
            <span>{news.date}</span>
          </div>

          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg font-medium text-gray-800 mb-4">{news.excerpt}</p>
            <p>
              VinFast Lê Trọng Tấn – Đại lý VinFast chính hãng tại Hà Nội luôn mang đến
              những thông tin mới nhất và các chương trình ưu đãi hấp dẫn cho khách hàng.
            </p>
            <p>
              Với mục tiêu đồng hành cùng khách hàng trong từng hành trình, VinFast Lê Trọng
              Tấn cam kết cung cấp dịch vụ tư vấn chuyên nghiệp và hỗ trợ tận tâm nhất.
            </p>
            <p>
              Để biết thêm thông tin, vui lòng liên hệ hotline{" "}
              <a href="tel:0976633054" className="text-[#db2a2a] font-semibold">097.6633.054</a>{" "}
              hoặc đến trực tiếp showroom.
            </p>
          </div>
        </motion.article>

        {relatedNews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
              Tin tức liên quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedNews.map((n) => (
                <Link key={n.id} href={`/tin-tuc/${n.slug}`} className="group">
                  <div className="relative h-36 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={n.image}
                      alt={n.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="33vw"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 group-hover:text-[#db2a2a] line-clamp-2 transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{n.date}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
