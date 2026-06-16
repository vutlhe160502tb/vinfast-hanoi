"use client";

import { motion } from "framer-motion";
import CarCard from "@/components/CarCard";
import { CARS } from "@/lib/data";

export default function DongXePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0f2344] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            DÒNG XE VINFAST
          </motion.h1>
          <p className="text-white/70 mt-2 text-sm">
            Khám phá các dòng xe điện VinFast – Mạnh liệt vì tương lai xanh
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARS.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CarCard
                name={car.name}
                slug={car.slug}
                description={car.description}
                logoSrc={car.logoSrc}
                carSrc={car.carSrc}
                priceFrom={car.priceFrom}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
