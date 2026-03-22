"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Aritra,\n\nYou received a new message from your portfolio:\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n\n---\nSent via portfolio contact form.`
    );

    // Use window.open so user stays on page
    const mailtoLink = `mailto:mukherjeearitra1233@gmail.com?subject=${subject}&body=${body}`;
    const a = document.createElement("a");
    a.href = mailtoLink;
    a.click();

    setTimeout(() => {
      setState("sent");
    }, 600);
  };

  const handleReset = () => {
    setState("idle");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative w-full py-28 px-6 z-10 overflow-hidden" id="contact">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-700/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-4">Get in Touch</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">Let&apos;s Talk</h2>
          <p className="text-neutral-400 text-base max-w-sm mx-auto">
            Have an idea, opportunity, or just want to say hi? Drop me a message and I&apos;ll get back to you.
          </p>
        </motion.div>

        {state === "sent" ? (
          /* Success state */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 flex flex-col items-center gap-4"
          >
            <CheckCircle className="w-16 h-16 text-green-400" />
            <h3 className="text-2xl font-black">Mail client opened!</h3>
            <p className="text-neutral-400 text-sm max-w-xs">
              Your default mail app should have opened with the message pre-filled. Hit send there to reach me.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 rounded-full glass border border-white/15 text-sm text-white hover:bg-white/10 transition-colors hoverable"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          /* Form */
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-600 block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full glass border border-white/10 rounded-xl px-4 py-3.5 bg-transparent text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-600 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full glass border border-white/10 rounded-xl px-4 py-3.5 bg-transparent text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-600 block mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project, idea, or just say hi..."
                className="w-full glass border border-white/10 rounded-xl px-4 py-3.5 bg-transparent text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-accent/50 transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={state === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-base hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-60 hoverable"
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Opening mail client...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
              <p className="text-center text-[11px] text-neutral-700 mt-3">
                This opens your default email app with the message pre-filled.
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
