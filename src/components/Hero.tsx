"use client";

import { Activity, ArrowRight, Stethoscope } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-slate-50/50 transition-colors duration-300">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10" />

      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm text-blue-800 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              AI-Powered Healthcare Analysis
            </motion.div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-tight">
              Smart health insights using <span className="gradient-text">Medical AI</span>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-[700px] text-lg text-slate-600 md:text-xl leading-relaxed">
              Describe your symptoms and get instant, structured health insights powered by advanced RAG technology and verified medical knowledge bases.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="#analyze" className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95">
                Check Symptoms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#learn-more" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300">
                How It Works
              </Link>
            </motion.div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-full text-blue-600">
                  <Stethoscope className="h-4 w-4" />
                </div>
                <span>Medical Knowledge Base</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-100 rounded-full text-green-600">
                  <Activity className="h-4 w-4" />
                </div>
                <span>Secure & Private</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-xl lg:max-w-none relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-white to-blue-50 border border-white shadow-2xl shadow-blue-100/50 overflow-hidden p-8 flex items-center justify-center">

              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-full h-full glass-card rounded-2xl p-6 flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-3 w-20 bg-slate-100 rounded mt-2"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex gap-2 mb-3">
                      <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                      <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                      <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded mb-2"></div>
                    <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                      <div className="w-10 h-10 rounded-full bg-blue-100 mb-3 flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full opacity-50"></div>
                      </div>
                      <div className="h-3 w-20 bg-blue-200 rounded"></div>
                    </div>
                    <div className="bg-green-50/50 rounded-xl p-4 border border-green-100">
                      <div className="w-10 h-10 rounded-full bg-green-100 mb-3 flex items-center justify-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full opacity-50"></div>
                      </div>
                      <div className="h-3 w-20 bg-green-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
