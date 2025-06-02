"use client";

import { Button } from "@/components/ui/button";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const messageSchema = z.object({
  message: z.string().min(1, "Please enter a message"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

type ChatInputProps = {
  onSubmit: (message: string) => void;
  isLoading: boolean;
};

export default function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmitForm = (data: MessageFormValues) => {
    if (!isLoading) {
      onSubmit(data.message);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10"
    >
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Ask about my skills, projects, etc..."
          className="w-full bg-transparent text-white placeholder:text-white/50 outline-none text-sm p-2"
          disabled={isLoading}
          {...register("message")}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <span className="text-xs text-red-500 absolute -bottom-4 left-2">
            {errors.message.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        variant="primary"
        size="sm"
        disabled={isLoading}
        className={`p-2 ${!isValid || isLoading ? "opacity-50" : "opacity-100"}`}
      >
        <IoSend className="text-accent h-5 w-5" />
      </Button>
    </form>
  );
}
