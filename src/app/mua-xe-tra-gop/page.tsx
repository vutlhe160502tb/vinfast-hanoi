"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle, Phone } from "lucide-react";
import { CARS, SERVICE_CARS, formatPrice } from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";

export default function MuaXeTraGopPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState("VF3");
  const [downPayment, setDownPayment] = useState(30);
  const [loanTerm, setLoanTerm] = useState(48);
  const interestRate = 5.5;

  const allCars = [...CARS, ...SERVICE_CARS];
  const car = allCars.find((c) => c.name === selectedCar) || allCars[0];
  const carPrice = car.priceFrom;
  const loanAmount = carPrice * (1 - downPayment / 100);
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
    (Math.pow(1 + monthlyRate, loanTerm) - 1);

  const steps = [
    { step: "01", title: "Chọn xe & đặt cọc", desc: "Chọn mẫu xe VinFast bạn muốn và đặt cọc tối thiểu 10% giá trị xe." },
    { step: "02", title: "Nộp hồ sơ vay", desc: "Chuẩn bị hồ sơ thu nhập, CMND/CCCD và các giấy tờ liên quan." },
    { step: "03", title: "Thẩm định & duyệt vay", desc: "Ngân hàng thẩm định hồ sơ trong vòng 2-3 ngày làm việc." },
    { step: "04", title: "Ký hợp đồng & nhận xe", desc: "Ký hợp đồng tín dụng và nhận xe tại showroom VinFast Lê Trọng Tấn." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0f2344] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            MUA XE TRẢ GÓP
          </motion.h1>
          <p className="text-white/70 mt-2 text-sm">
            Sở hữu xe VinFast dễ dàng với lãi suất ưu đãi từ 5%/năm
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Calculator */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator size={22} className="text-[#db2a2a]" />
              Tính toán khoản vay
            </h2>

            <div className="space-y-5 bg-gray-50 rounded-2xl p-6">
              {/* Select car */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chọn mẫu xe</label>
                <select
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#db2a2a] focus:border-transparent"
                >
                  {allCars.map((c) => (
                    <option key={c.id} value={c.name}>{c.name} – {formatPrice(c.priceFrom)}</option>
                  ))}
                </select>
              </div>

              {/* Down payment */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Trả trước</label>
                  <span className="text-sm font-bold text-[#db2a2a]">{downPayment}% – {formatPrice(carPrice * downPayment / 100)}</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={80}
                  step={5}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-[#db2a2a]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>20%</span><span>80%</span>
                </div>
              </div>

              {/* Loan term */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Thời gian vay</label>
                  <span className="text-sm font-bold text-[#db2a2a]">{loanTerm} tháng</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={84}
                  step={12}
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full accent-[#db2a2a]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>12 tháng</span><span>84 tháng</span>
                </div>
              </div>

              {/* Result */}
              <motion.div
                key={`${selectedCar}-${downPayment}-${loanTerm}`}
                initial={{ scale: 0.97 }}
                animate={{ scale: 1 }}
                className="bg-[#0f2344] rounded-xl p-5 text-white"
              >
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/60">Giá xe</p>
                    <p className="font-bold text-base">{formatPrice(carPrice)}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Số tiền vay</p>
                    <p className="font-bold text-base">{formatPrice(Math.round(loanAmount))}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Lãi suất</p>
                    <p className="font-bold text-base">{interestRate}%/năm</p>
                  </div>
                  <div>
                    <p className="text-white/60">Trả góp hàng tháng</p>
                    <p className="font-bold text-xl text-yellow-300">{formatPrice(Math.round(monthlyPayment))}</p>
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-3">
                  * Kết quả tham khảo, lãi suất thực tế phụ thuộc vào ngân hàng và hồ sơ khách hàng.
                </p>
              </motion.div>

              <button
                onClick={() => setQuoteOpen(true)}
                className="w-full bg-[#db2a2a] text-white font-semibold py-3.5 rounded-xl hover:bg-[#b91c1c] transition-colors"
              >
                ĐĂNG KÝ VAY NGAY
              </button>
            </div>
          </div>

          {/* Steps + Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quy trình mua xe trả góp</h2>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#db2a2a]/30 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[#db2a2a] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{s.title}</h3>
                    <p className="text-gray-600 text-xs mt-1">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="mt-6 bg-blue-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">Lợi ích khi mua xe trả góp tại VinFast Lê Trọng Tấn</h3>
              <ul className="space-y-2">
                {[
                  "Lãi suất ưu đãi từ 5%/năm cố định",
                  "Hỗ trợ thủ tục vay nhanh chóng, đơn giản",
                  "Thời gian vay linh hoạt từ 12 – 84 tháng",
                  "Trả trước tối thiểu chỉ 20% giá trị xe",
                  "Hỗ trợ xử lý nợ xấu",
                  "Đăng ký, đăng kiểm, giao xe tại nhà",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="mt-5 flex items-center gap-3 bg-[#0f2344] rounded-xl p-4 text-white">
              <Phone size={20} className="flex-shrink-0" />
              <div>
                <p className="text-sm">Hotline tư vấn trả góp</p>
                <a href="tel:0976633054" className="font-bold text-yellow-300 text-lg">0976.633.054</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {quoteOpen && (
        <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      )}
    </div>
  );
}
