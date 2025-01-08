"use client";

import CountUp from "react-countup";

const stats = [
  {
    name: "Years of experience",
    value: 10,
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
    <section>
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
              <p
                className={`${
                  stat.name.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                }`}
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
