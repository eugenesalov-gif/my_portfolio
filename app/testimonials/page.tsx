"use client";

import PageLayout from "@/components/layout/PageLayout";
import BackButton from "@/components/ui/BackButton";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Kay Schneider",
    title: "President at ShowHeroes Group",
    quote:
      "Eugene is one of the most diligent and productive designers I know.",
  },
  {
    name: "Ken Lim",
    title: "Global Director Platforms & Data Solutions at ShowHeroes Group",
    quote:
      "He consistently brought his best to every project, demonstrating a keen eye for detail.",
  },
  {
    name: "Maike Selle",
    title: "Senior Product Manager",
    quote:
      "His work has earned special recognition from users and colleagues alike.",
  },
  {
    name: "Shahla Velieva",
    title: "Product Manager",
    quote:
      "He kept the users in mind at every step, making sure the product delivered real business value.",
  },
  {
    name: "Sreelakshmy V G",
    title: "Product Manager at ShowHeroes",
    quote:
      "He always replied quickly when I had questions, and did it politely and with professionalism.",
  },
  {
    name: "Dmitrii Kovalevskii",
    title: "Senior Frontend Engineer",
    quote:
      "Eugene consistently delivered exceptional designs, even when requirements were ambiguous.",
  },
  {
    name: "Jorge Algaba Aranda",
    title: "Senior Video Player Engineer",
    quote:
      "His designs were always logical and easy to work with — and made development smoother.",
  },
  {
    name: "Nurbek Torbayev",
    title: "Backend PHP Developer",
    quote:
      "Yauheni is an outstanding Product Designer with a rare mix of creativity and attention to detail.",
  },
  {
    name: "Arseniy Markov",
    title: "Senior Frontend Engineer",
    quote: "Any team would be lucky to have him driving design forward.",
  },
];

export default function TestimonialsPage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-8"
      >
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <BackButton />
          </div>
          <h1 className="text-[32px] font-semibold leading-10 tracking-[-1.2px] text-text-primary">
            Testimonials
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
              className="bg-[#F2F2F2] rounded-2xl p-5 flex flex-col gap-3"
            >
              <p className="text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-[14px] font-semibold text-text-primary">{t.name}</p>
                <p className="text-[13px] font-normal text-text-secondary">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
}
