"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: "page" | "project" | "skill" | "experience";
}

const SEARCH_INDEX: SearchResult[] = [
  { title: "Home", description: "Portfolio homepage with introduction", url: "/", type: "page" },
  { title: "Projects", description: "View all my projects and work", url: "/projects", type: "page" },
  { title: "Work Experience", description: "My professional experience and skills", url: "/work", type: "page" },
  { title: "Services", description: "Services I offer", url: "/services", type: "page" },
  { title: "Contact", description: "Get in touch with me", url: "/contact", type: "page" },
  { title: "React Expertise", description: "7+ years building React applications", url: "/work", type: "skill" },
  { title: "Next.js Projects", description: "Modern full-stack applications", url: "/projects", type: "project" },
  { title: "NTT Experience", description: "Principal Front End Engineer role", url: "/work", type: "experience" },
  { title: "Healthcare Patient Management", description: "Full-stack healthcare app", url: "/projects", type: "project" },
  { title: "TypeScript Development", description: "Type-safe application development", url: "/work", type: "skill" },
];

export default function AISearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const searchResults = SEARCH_INDEX.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);

    setResults(searchResults);
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "page": return "text-blue-400 bg-blue-400/10";
      case "project": return "text-purple-400 bg-purple-400/10";
      case "skill": return "text-green-400 bg-green-400/10";
      case "experience": return "text-yellow-400 bg-yellow-400/10";
      default: return "text-accent bg-accent/10";
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-accent/20 hover:border-accent/40 rounded-lg transition-all group"
      >
        <Search className="h-4 w-4 text-accent" />
        <span className="text-sm text-white/60 group-hover:text-white/90">Search...</span>
        <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs bg-white/10 rounded border border-white/20">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-primary/95 backdrop-blur-xl border border-accent/20 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-accent/20">
                <Search className="h-5 w-5 text-accent" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search portfolio..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>
              </div>

              {query && results.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-white/60">No results found for &quot;{query}&quot;</p>
                  <p className="text-sm text-white/40 mt-2">Try searching for projects, skills, or experience</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-2">
                    <div className="flex items-center gap-2 px-3 py-2 mb-2">
                      <Sparkles className="h-4 w-4 text-accent" />
                      <span className="text-xs text-accent font-semibold">AI-Powered Results</span>
                    </div>
                    {results.map((result, index) => (
                      <motion.button
                        key={result.url + result.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(result)}
                        className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                          index === selectedIndex
                            ? "bg-accent/20 border border-accent/40"
                            : "hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium">{result.title}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(result.type)}`}>
                              {result.type}
                            </span>
                          </div>
                          <p className="text-sm text-white/60">{result.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 border-t border-accent/20 bg-white/5 flex items-center justify-between text-xs text-white/40">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Enter</kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Esc</kbd>
                    Close
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI Search
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
