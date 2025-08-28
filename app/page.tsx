'use client'
import ProtectedRoute from "@/components/protected-route";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Home() {

  return (
    <ProtectedRoute>
      <div className="flex items-center w-full justify-start py-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-3">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            สวัสดิการเพื่อการสงเคราะห์สมาชิก
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            สหกรณ์ออมทรัพทย์สื่อสารทหาร จำกัด
          </p>
          <div className="w-full border rounded-md p-3 mt-10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">รายการสวัสดิการ</TableHead>
                  <TableHead className="text-right font-bold">รายละเอียด</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>สวัสดิการสงเคราะถึงแก่กรรม</TableCell>
                  <TableCell className="text-right">สมาชิก, ครอบครัวสมาชิก 10,000 บาท, บิดา-มารดาคู่สมรส 5,000 บาท</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>สวัสดิการรักษาพยาบาล</TableCell>
                  <TableCell className="text-right">คืนละ 500 บาท  ไม่เกินคราวละ 5,000 บาท รวมตลอดทั้งปีไม่เกิน 10,000 บาท</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>สวัสดิการมงคลสมรส</TableCell>
                  <TableCell className="text-right">2,000 บาท</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>สวัสดิการรับขวัญทายาทใหม</TableCell>
                  <TableCell className="text-right">2,000 บาท</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>สวัสดิการประสบภัยพิบัติ</TableCell>
                  <TableCell className="text-right">2,000 บาท</TableCell>
                </TableRow>
              </TableBody>
          </Table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
