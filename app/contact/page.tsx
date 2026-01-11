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
import { Sparkles, Send, CheckCircle2 } from "lucide-react";

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

        toast.success("Message sent successfully!", {
          icon: "✨",
          style: {
            borderRadius: '10px',
            background: '#00ff99',
            color: '#1a1a1a',
          },
        });
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
        transition: { delay: 0.2, duration: 0.6, ease: "easeIn" },
      }}
      className="py-12 xl:py-24"
    >
      <div className="container mx-auto">
        <Toaster position="top-right" />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="text-accent font-semibold uppercase tracking-wider">Contact</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Let's Work Together
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Have a project in mind? Let's discuss how we can bring your ideas to life with cutting-edge technology.
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="xl:w-[60%] order-2 xl:order-none"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 p-8 bg-gradient-to-br from-[#27272c] to-[#1a1a1f] rounded-xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <Send className="h-5 w-5 text-accent" />
                <h3 className="text-2xl font-bold text-white">Send me a message</h3>
              </div>
              <p className="text-white/60 mb-4">
                Fill out the form below and I'll get back to you as soon as possible
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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="default"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="xl:w-[40%] order-1 xl:order-none mb-8 xl:mb-0"
          >
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                Contact Information
              </h3>
              <ul className="space-y-6">
                {info.map(({ icon, title, description }, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-accent/30 transition-all cursor-pointer group"
                  >
                    <div className="w-[52px] h-[52px] bg-gradient-to-br from-accent/20 to-accent/10 text-accent flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                      <div className="text-[24px]">{icon}</div>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-white mb-1">{title}</h5>
                      <p className="text-white/60 text-sm">{description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <p className="text-white/60 text-sm text-center">
                  Available Monday - Friday, 9:00 AM - 6:00 PM (SAST)
                </p>
                <p className="text-white/40 text-xs text-center mt-2">
                  Usually responds within 24 hours
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
