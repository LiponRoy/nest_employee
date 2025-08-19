// components/UserTable.tsx

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobApplication } from "@/constant/Constant";

export default function AppliedJobsTable({ applyedJobs }: { applyedJobs: JobApplication[] }) {
  console.log("applyedJobs tt", applyedJobs);

  return (
    <div className="w-full overflow-x-auto">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>A list of Applied Jobs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applyedJobs?.map((job: JobApplication) => (
              <TableRow key={job._id}>
                <TableCell>{job.job?.title}</TableCell>
                <TableCell>{job?.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {applyedJobs?.map((job: JobApplication) => (
          <div
            key={job._id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <p className="text-sm font-medium">
              <span className="font-semibold">Job Title:</span> {job.job?.title}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Status:</span> {job?.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
