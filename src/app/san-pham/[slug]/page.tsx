import { notFound } from "next/navigation";
import { ALL_CARS } from "@/lib/data";
import CarDetailClient from "./CarDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = ALL_CARS.find((c) => c.slug === slug);
  if (!car) notFound();
  return <CarDetailClient car={car} />;
}
