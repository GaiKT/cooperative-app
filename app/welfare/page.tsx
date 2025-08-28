import ProtectedRoute from "@/components/protected-route"

export default function WelfarePage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ยื่นขอรับสวัสดิการ
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            ระบบสำหรับยื่นคำขอสวัสดิการต่างๆ ของสมาชิกสหกรณ์
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">สวัสดิการการศึกษา</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              ยื่นขอสวัสดิการสำหรับการศึกษาบุตร
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              ยื่นคำขอ
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">สวัสดิการการรักษาพยาบาล</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              ยื่นขอสวัสดิการค่ารักษาพยาบาล
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              ยื่นคำขอ
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">สวัสดิการฌาปนกิจ</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              ยื่นขอสวัสดิการฌาปนกิจสงเคราะห์
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              ยื่นคำขอ
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
