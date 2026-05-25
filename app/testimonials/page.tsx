"use client";

import Image from "next/image";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import BackButton from "@/components/ui/BackButton";

const testimonials = [
  {
    name: "Kay Schneider",
    title: "President at ShowHeroes Group",
    imageSrc: "/images/team/team-member-4.png",
    profileUrl: "https://www.linkedin.com/in/kayschneider/",
    quote:
      "Yauheni has been the senior UX/UI Designer in my product team. He worked with all product owners taking the lead on UX/UI concepts. He has been a very capable subject lead constantly motivated to create the best solutions while establishing a great CI standard. Yauheni is a great team player and has been constantly building up his skillset e.g. on AI based solutions. We were more than happy to have him in our team.",
  },
  {
    name: "Ken Lim",
    title: "Global Director Platforms & Data Solutions at ShowHeroes Group",
    imageSrc: "/images/team/create-team-member-ken.png",
    profileUrl: "https://www.linkedin.com/in/limliken/",
    quote:
      "Eugene is one of the most diligent and productive designers I know. Over the years he built up and maintained our design systems, and established a design process with product teams. As is typical of his forward-thinking nature, he successfully researched and prototyped designs for AI enhanced products.",
  },
  {
    name: "Maike Selle",
    title: "Senior Product Manager",
    imageSrc: "/images/team/create-team-member-maike.png",
    profileUrl: "https://www.linkedin.com/in/maike-selle-showheroes/",
    quote:
      "I had the pleasure of working closely with Eugene over the past 2.5 years, during which he played a key role in shaping the UX/UI of ShowHeroes' tools. He consistently brought his best to every project, demonstrating a keen eye for detail and creating clean, user-centric interfaces that effectively visualise both commercial and contextual data. His work has earned special recognition from users and colleagues alike. Beyond the impressive results he consistently delivered, I personally appreciated how he handled feedback and his natural ability to bring people together with a positive attitude. This had a significant impact on the success and efficiency of our collaboration. Dear Eugene, keep up the great work - and you'll continue to build amazing products!",
  },
  {
    name: "Shahla Velieva",
    title: "Product Manager",
    imageSrc: "/images/team/team-member-3.png",
    profileUrl: "https://www.linkedin.com/in/shahlavelieva/",
    quote:
      "I worked with Yauheni on the same team and his attention to detail and focus on user experience really stood out. He kept the users in mind at every step, making sure the product delivered real business value. He collaborated closely on user research, asked the right questions to uncover pain points and always communicated openly with the team. Any team would benefit from his skills and mindset!",
  },
  {
    name: "Sreelakshmy V G",
    title: "Product Manager at ShowHeroes",
    imageSrc: "/images/testimonials/testimonial-sreelakshmy.png",
    profileUrl: "https://www.linkedin.com/in/sreelakshmyvg/",
    quote:
      "As a product manager, working with Yauheni across multiple features was a masterclass in user-centered design. He pairs sharp UX craft with deep user empathy and clear business sense. User flow discovery sessions stayed focused, decisions were crisp, and outcomes tied to key KPIs. New user flow recommendations reflected current UX trends, and I was always fascinated by how much research he does for even a smaller design decision. Yauheni used to voluntarily present a lot of new design ideas based on his own competitor analysis and industry trends and really cared about even the minor design changes we shipped to production. Strongly recommend this Product designer for roles where outcomes matter in high-impact, cross-functional teams.",
  },
  {
    name: "Dmitrii Kovalevskii",
    title: "Senior Frontend Engineer",
    imageSrc: "/images/testimonials/testimonial-dmitrii.png",
    profileUrl: "https://www.linkedin.com/in/dmitrii-kovalevskii/",
    quote:
      "I highly recommend my former colleague Yauheni as a strong product designer. We worked together for 4 years and went through many project tasks and discussions. He always replied quickly when I had questions, and did it politely and with the professionalism you expect from a senior designer. He has a broad vision of the product and thinks not only about single screens, but about the whole system. He also created the design system that our team used across the projects. Each year I could clearly see his growth. He is always learning and aware about innovations in design. He always does proper research before making decisions and pay a lot of attention to how the client and users will perceive the product. I hope I can work with colleagues like him again. He is professional, friendly, and a truly kind person!",
  },
  {
    name: "Jorge Algaba Aranda",
    title: "Senior Video Player Engineer",
    imageSrc: "/images/testimonials/testimonial-jorge.png",
    profileUrl: "https://www.linkedin.com/in/jorgealgaba/",
    quote:
      "I had the pleasure of working with Eugene when he was the product designer on our team. He consistently delivered exceptional designs, even when requirements were ambiguous. Eugene has a strong product vision, communicates it clearly, and iterates quickly to refine ideas into impactful solutions. Working with him was easy, and his designs always made our work better.",
  },
  {
    name: "Nurbek Torbayev",
    title: "Backend PHP Developer",
    imageSrc: "/images/testimonials/testimonial-nurbek.png",
    profileUrl: "https://www.linkedin.com/in/nurbek-torbayev/",
    quote:
      "I worked with Yauheni on two projects and really liked his approach as a product designer. As a backend developer, I care more about how things work than how they look - and his designs were always logical and easy to work with. He thought through the flow, paid attention to details, and focused on real user needs. That made development smoother and saved us time. Just a solid teammate.",
  },
  {
    name: "Arseniy Markov",
    title: "Senior Frontend Engineer",
    imageSrc: "/images/testimonials/testimonial-arseniy.png",
    profileUrl: "https://www.linkedin.com/in/arseniy-markov/",
    quote:
      "Yauheni is an outstanding Product Designer with a rare mix of creativity, attention to detail, and user-first thinking. He has a great eye for design, always creating interfaces that not only look beautiful but also feel intuitive and easy to use. What I appreciated most was how he worked with the team - always open to feedback, collaborative, and ready to turn ideas into clear design solutions. He made our products better and our work process smoother. On top of that, he's simply great to work with - positive, approachable, and inspiring. Any team would be lucky to have him driving design forward.",
  },
];

export default function TestimonialsPage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex max-w-[900px] flex-col gap-8"
      >
        <div className="sticky top-3 z-20 mt-1 w-fit min-[810px]:top-6 min-[1200px]:hidden">
          <BackButton />
        </div>
        <div className="flex items-start gap-4">
          <h1 className="text-[32px] font-semibold leading-10 tracking-[-1.2px] text-text-primary">
            Testimonials
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
              className="flex items-start gap-5"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image src={t.imageSrc} alt={t.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex flex-col gap-4 pt-1">
                <p className="text-[19px] font-medium leading-[1.45] tracking-[-0.6px] text-text-primary">
                  {t.quote}
                </p>
                <div className="flex flex-col gap-1">
                  <a
                    href={t.profileUrl}
                    className="w-fit text-[19px] font-medium leading-[1.2] tracking-[-0.6px] text-text-primary underline underline-offset-2 decoration-from-font transition-opacity hover:opacity-70"
                  >
                    {t.name}
                  </a>
                  <p className="text-[16px] font-normal leading-[1.25] text-text-secondary">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
}
