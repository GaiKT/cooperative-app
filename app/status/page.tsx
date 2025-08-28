import ProtectedRoute from "@/components/protected-route"

export default function StatusPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ตรวจสอบสถานะคำขอ
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            ตรวจสอบสถานะการพิจารณาคำขอสวัสดิการของคุณ
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">คำขอล่าสุด</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div>
                  <h3 className="font-medium">สวัสดิการการศึกษา</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ยื่นเมื่อ: 25 สิงหาคม 2025</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  กำลังพิจารณา
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div>
                  <h3 className="font-medium">สวัสดิการการรักษาพยาบาล</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ยื่นเมื่อ: 20 สิงหาคม 2025</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  อนุมัติแล้ว
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
