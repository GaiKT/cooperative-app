'use client'
import ProtectedRoute from "@/components/protected-route";

export default function Home() {

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              ยินดีต้อนรับสู่ระบบสหกรณ์
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              กรุณาเข้าสู่ระบบหรือสร้างบัญชีใหม่
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
