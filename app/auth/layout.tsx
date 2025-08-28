import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Cooperative App",
  description: "Sign in or sign up to access the cooperative management system",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Auth content */}
        <main className="relative z-10">
          {children}
        </main>
    </div>
  );
}
