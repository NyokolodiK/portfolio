"use client";

import { calculateYearsSince } from "@/lib/utils";
import CountUp from "react-countup";

const stats = [
  {
    name: "Years of experience",
    value: calculateYearsSince(2013, 4),
  },
  {
    name: "Projects completed",
    value: 50,
  },
  {
    name: "Techonlogies used",
    value: 10,
  },
  {
    name: "Code commits",
    value: 1000,
  },
];

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((stat, index) => (
            <div
              className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
              key={index}
            >
              <CountUp
                end={stat.value}
                duration={5}
                delay={2}
                className="text-4xl xl:text-6xl font-extrabold"
              />
              <span className="text-4xl xl:text-6xl font-extrabold"></span>
              <p
                className={`${
                  stat.name.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {stat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
