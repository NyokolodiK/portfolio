"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const contactFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  surname: z.string().nonempty("Surname is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().nonempty("Message is required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+27) 123 456 7890",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "knyokolodi@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "The Village Security Estate, Centurion, South Africa",
  },
];

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: ContactFormData) => {
      setIsSubmitting(true);

      try {
        const response = await axios.post("/api/email", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed to send message");
        }

        toast.success("Message sent successfully!");
        reset();
      } catch {
        toast.error(
          "Something went wrong. Please try again later or contact support."
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.6, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <Toaster position="top-right" />
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:h-[54%] order-2 xl:order-none">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 p-10 bg-[#27272c]"
            >
              <h3 className="text-4xl text-accent">Get in touch</h3>
              <p className="text-white/60">
                Fill out the form below to get in touch
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    placeholder="Name"
                    {...register("name")}
                    className="w-full"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Surname"
                    {...register("surname")}
                    className="w-full"
                  />
                  {errors.surname && (
                    <p className="text-red-500 text-sm">
                      {errors.surname.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                    className="w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Phone"
                    type="tel"
                    {...register("phone")}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Textarea
                  placeholder="Type your message here"
                  {...register("message")}
                  className="h-[200px] w-full"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="default"
                className="max-w-40"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map(({ icon, title, description }, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent flex items-center justify-center">
                    <div className="text-[28px]">{icon}</div>
                  </div>
                  <div>
                    <h5 className="font-semibold">{title}</h5>
                    <p className="text-white/60">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
