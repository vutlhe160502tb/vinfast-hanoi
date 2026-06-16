import Link from "next/link";
import Image from "next/image";
import { formatPrice, CARS, SERVICE_CARS } from "@/lib/data";

export default function Footer() {
  const allCars = [
    ...SERVICE_CARS.slice(0, 3),
    ...CARS.slice(0, 3),
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Brand info */}
          <div>
            <Image
              src="/images/logo-vinfast-horizontal.png"
              alt="VinFast"
              width={180}
              height={50}
              className="h-10 w-auto object-contain mb-4"
            />
            <h3 className="font-bold text-gray-900 text-lg mb-3">
              ĐẠI LÝ VINFAST LÊ TRỌNG TẤN
            </h3>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Địa chỉ:</span> Lô 03-04 C27
                Đường Lê Trọng Tấn, KĐT Geleximco, Dương Nội, Hà Nội
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                hoanganh2610.vinfast@gmail.com
              </p>
              <p>
                <span className="font-semibold">Hotline:</span>{" "}
                <a href="tel:0976633054" className="text-[#db2a2a] font-semibold">
                  097.6633.054
                </a>
              </p>
            </div>
            <div className="mt-5 relative h-24 rounded-lg overflow-hidden">
              <Image
                src="/images/footer-cars.png"
                alt="VinFast cars"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Column 2 - Products */}
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-4 uppercase tracking-wide">
              SẢN PHẨM
            </h3>
            <div className="space-y-2">
              {allCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/san-pham/${car.slug}`}
                  className="flex items-center justify-between text-sm hover:text-[#db2a2a] transition-colors group"
                >
                  <span className="text-[#db2a2a] font-medium group-hover:underline">
                    {car.name}
                  </span>
                  <span className="text-gray-600 text-xs">
                    {formatPrice(car.priceFrom)}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
              <Link href="/tin-tuc" className="block text-sm text-gray-600 hover:text-[#db2a2a] transition-colors">Tin tức</Link>
              <Link href="/gia-xe" className="block text-sm text-gray-600 hover:text-[#db2a2a] transition-colors">Giá xe</Link>
              <Link href="/khuyen-mai" className="block text-sm text-gray-600 hover:text-[#db2a2a] transition-colors">Khuyến mãi</Link>
              <Link href="/mua-xe-tra-gop" className="block text-sm text-gray-600 hover:text-[#db2a2a] transition-colors">Mua xe trả góp</Link>
            </div>
          </div>

          {/* Column 3 - Map */}
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-4 uppercase tracking-wide">
              BẢN ĐỒ
            </h3>
            <div className="rounded-lg overflow-hidden border border-gray-200 h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.6!2d105.73!3d20.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU4JzEyLjAiTiAxMDXCsDQzJzQ4LjAiRQ!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VinFast Lê Trọng Tấn Map"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-3 text-center text-sm text-gray-500">
        © 2025 Vinfast Lê Trọng Tấn
      </div>
    </footer>
  );
}
