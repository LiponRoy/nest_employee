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



export default function applyedJobsTable({ applyedJobs }: { applyedJobs: JobApplication[] }) {
    console.log("applyedJobs tt", applyedJobs)
    return (
        <Table>
            <TableCaption>A list of Applyed Jobs.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Role</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {applyedJobs?.map((job:JobApplication) => (
                    <TableRow key={job._id}>
                        <TableCell>{job.job?._id}</TableCell>
                        <TableCell>{job.job?.title}</TableCell>
                        <TableCell>{job?.status}</TableCell>
                        {/* <TableCell>{job.role}</TableCell> */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
