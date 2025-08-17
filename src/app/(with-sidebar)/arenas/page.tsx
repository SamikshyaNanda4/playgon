"use client"
import { motion } from "framer-motion";
import {
  Code,
  GitBranch,
  List,
  Play,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { div } from "framer-motion/client";
import { AnimatedTag } from '@/my-components/animated-tags';
import { TagItem } from '@/types/sports';

const Page = () => {

  return (
    <div>
      <div className=" p-4 h-screen overflow-y-auto ">
        <motion.section
          className="py-10"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
        >
          <div className="container">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
              <h1 className="mb-2 text-4xl font-semibold text-pretty lg:text-5xl">
                Find the Arena of your choice
              </h1>

              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-3">


                {[
                  { sportsType: "cricket", icon: <Code className="size-4" />, img: "https://www.gwsportsapp.in/media/ground-images/gallery/MC4yNjg0MzkwMCAxNTk3OTA4MDY4.jpeg" },
                  { sportsType: "football", icon: <Play className="size-4" />, img: "https://enrollacademy.com/wp-content/uploads/2022/09/indoor-soccer.jpg" },
                  { sportsType: "tennis", icon: <GitBranch className="size-4" />, img: "https://knowledgegk.com/wp-content/uploads/2024/02/Box-Cricket.jpg" },
                  { sportsType: "basketball", icon: <List className="size-4" />, img: "https://i.pinimg.com/originals/f0/68/17/f06817a3672704b4e429821ea0b0e929.jpg" },
                  { sportsType: "cricket", icon: <WandSparkles className="size-4" />, img: "https://tse2.mm.bing.net/th/id/OIP.fSnfQSkhFdCE3vLdMy1gVAHaEK?pid=Api&P=0&h=220" },
                  { sportsType: "football", icon: <Sparkles className="size-4" />, img: "https://i.pinimg.com/736x/eb/e2/6a/ebe26a3a75c71ffd7867c8a911376c5f.jpg" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                  >
                    <div className="relative"> {/* This makes the tag stay in place */}
                      {/* Animated top-right tag */}
                      <AnimatedTag item={item} index={i} />

                      <Card
                        className="shadow-2xl shadow-black/50 cursor-pointer border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(16px)',
                          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))'
                        }}
                      >
                        <CardHeader className="pb-1">{item.icon}</CardHeader>
                        <CardContent className="text-left">
                          <h2 className="mb-1 text-lg font-semibold">Card Title</h2>
                          <p className="leading-snug text-muted-foreground">
                            Lorem ipsum dolor sit amet consectetur.
                          </p>
                        </CardContent>
                        <CardFooter className="justify-end pr-6 pb-0">
                          <img
                            className="h-40 w-full rounded-tl-md object-cover object-center"
                            src={item.img}
                            alt="placeholder"
                          />
                        </CardFooter>
                      </Card>
                    </div>
                  </motion.div>

                ))}

              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Page;
