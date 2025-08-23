'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

interface HealthData {
  message: string;
  data: {
    users: number;
    cooperatives: number;
    memberships: number;
  };
  timestamp: string;
}

export default function Home() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setHealthData(data);
        }
      })
      .catch(err => setError('Failed to connect to API'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">Cooperative App</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A Next.js application with PostgreSQL backend for managing cooperatives
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Database Status</h2>
          {loading && <p>Checking database connection...</p>}
          {error && (
            <div className="text-red-600 dark:text-red-400">
              <p>❌ Database Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          {healthData && (
            <div className="text-green-600 dark:text-green-400">
              <p>✅ {healthData.message}</p>
              <div className="mt-3 text-sm">
                <p>Users: {healthData.data.users}</p>
                <p>Cooperatives: {healthData.data.cooperatives}</p>
                <p>Memberships: {healthData.data.memberships}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/api/health"
            target="_blank"
            rel="noopener noreferrer"
          >
            🏥 API Health Check
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/api/users"
            target="_blank"
            rel="noopener noreferrer"
          >
            👥 View Users API
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
