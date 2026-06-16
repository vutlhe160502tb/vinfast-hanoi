import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { formatPrice, CARS, SERVICE_CARS } from "@/lib/data";

export default function Footer() {
  const allCars = [...CARS.slice(0, 4), ...SERVICE_CARS.slice(0, 2)];

  return (
    <footer style={{ background: "linear-gradient(180deg, #060d1f 0%, #030810 100%)" }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Col 1 — Brand */}
          <div>
            <Image
              src="/images/logo-vinfast-horizontal.png"
              alt="VinFast"
              width={180}
              height={50}
              className="h-10 w-auto object-contain mb-5 brightness-0 invert"
            />
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">
              ĐẠI LÝ VINFAST LÊ TRỌNG TẤN
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-white/55">
                <MapPin size={15} className="text-[#db2a2a] flex-shrink-0 mt-0.5" />
                <span>Lô 03-04 C27 Đường Lê Trọng Tấn, KĐT Geleximco, Dương Nội, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/55">
                <Mail size={15} className="text-[#db2a2a] flex-shrink-0" />
                <span>hoanganh2610.vinfast@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#db2a2a] flex-shrink-0" />
                <a href="tel:0976633054" className="text-[#db2a2a] font-bold text-sm hover:text-red-400 transition-colors">
                  097.6633.054
                </a>
              </div>
            </div>

            <div className="mt-6 relative h-20 rounded-xl overflow-hidden border border-white/10">
              <Image
                src="/images/footer-cars.png"
                alt="VinFast cars"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Col 2 — Products */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.15em] mb-5 pb-3 border-b border-white/10">
              SẢN PHẨM
            </h3>
            <div className="space-y-2.5 mb-5">
              {allCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/san-pham/${car.slug}`}
                  className="flex items-center justify-between group"
                >
                  <span className="text-white/60 text-sm group-hover:text-white transition-colors duration-200">
                    {car.name}
                  </span>
                  <span className="text-white/30 text-xs group-hover:text-yellow-400 transition-colors duration-200">
                    {formatPrice(car.priceFrom)}
                  </span>
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              {[
                { label: "Tin tức", href: "/tin-tuc" },
                { label: "Giá xe", href: "/gia-xe" },
                { label: "Khuyến mãi", href: "/khuyen-mai" },
                { label: "Mua xe trả góp", href: "/mua-xe-tra-gop" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/55 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Map */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.15em] mb-5 pb-3 border-b border-white/10">
              VỊ TRÍ SHOWROOM
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10" style={{ height: "220px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.6!2d105.73!3d20.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU4JzEyLjAiTiAxMDXCsDQzJzQ4LjAiRQ!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VinFast Lê Trọng Tấn"
              />
            </div>
            <p className="text-white/35 text-xs mt-3 leading-relaxed">
              Mở cửa: Thứ 2 – Chủ nhật · 8:00 – 18:00
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-4 text-center">
        <p className="text-white/25 text-xs tracking-wide">
          © 2026 VinFast Lê Trọng Tấn · Đại lý chính hãng tại Hà Nội
        </p>
      </div>
    </footer>
  );
}
