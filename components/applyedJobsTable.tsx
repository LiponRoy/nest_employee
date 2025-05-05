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



export default function applyedJobsTable({ applyedJobs }: any) {
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
                {applyedJobs?.map((job) => (
                    <TableRow key={job._id}>
                        <TableCell>{job.job?.title}</TableCell>
                        <TableCell>{job?.status}</TableCell>
                        {/* <TableCell>{job.role}</TableCell> */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
