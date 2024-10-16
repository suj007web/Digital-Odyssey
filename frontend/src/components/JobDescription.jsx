import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);

    const params = useParams();
    const jobId = params.id;
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const isInitiallyApplied = singleJob?.application?.some(application => application.applicant === user?._id || false);
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/application/apply/${jobId}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                setIsApplied(true);
                const updatedApplications = [...singleJob.application, { applicant: user?._id }];
                dispatch(setSingleJob({ ...singleJob, application: updatedApplications }));
                toast.success(res.data.message);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.data.response.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/job/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.application.some(application => application.applicant === user?._id));
                } else {
                    console.error("Failed to fetch job:", res.data.message);
                }
            } catch (error) {
                console.error("An error occurred while fetching job:", error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    if (!singleJob) {
        return <div>Loading...</div>;
    }
    console.log(singleJob?.application);
    return (
        <div className="max-w-full sm:max-w-7xl py-10 min-h-[75vh] bg-black text-gray-200 p-5 shadow-lg">
            <div className="mx-auto sm:mx-20 px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    <div className="w-full sm:w-auto">
                        <h1 className="font-bold text-xl sm:text-2xl">{singleJob.title}</h1>
                        <div className="my-2 flex flex-wrap items-center gap-2 sm:gap-3">
                            <Badge className="bg-blue-900 bg-opacity-20 text-blue-500 font-bold px-3 py-1 rounded-full shadow-sm shadow-blue-500/50">
                                {singleJob.position} Positions
                            </Badge>
                            <Badge className="bg-green-900 bg-opacity-20 text-green-500 font-bold px-3 py-1 rounded-full shadow-sm shadow-green-500/50">
                                {singleJob.jobType}
                            </Badge>
                            <Badge className="bg-purple-900 bg-opacity-20 text-purple-500 font-bold px-3 py-1 rounded-full shadow-sm shadow-purple-500/50">
                                {singleJob.salary} LPA
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg text-white ${isApplied ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                        {isApplied ? 'Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className="border-b-2 border-gray-600 font-medium my-4 py-4">Job Description</h1>
                <div className="my-4 space-y-2 sm:space-y-4">
                    <h1 className="font-bold">Role: <span className="pl-4 font-normal text-gray-300">{singleJob.title}</span></h1>
                    <h1 className="font-bold">Location: <span className="pl-4 font-normal text-gray-300">{singleJob.location}</span></h1>
                    <h1 className="font-bold">Description: <span className="pl-4 font-normal text-gray-300">{singleJob.description}</span></h1>
                    <h1 className="font-bold">Experience: <span className="pl-4 font-normal text-gray-300">{singleJob.experience} yrs</span></h1>
                    <h1 className="font-bold">Salary: <span className="pl-4 font-normal text-gray-300">{singleJob.salary} LPA</span></h1>
                    <h1 className="font-bold">Total Applicants: <span className="pl-4 font-normal text-gray-300">{singleJob?.application?.length}</span></h1>
                    <h1 className="font-bold">Date Posted: <span className="pl-4 font-normal text-gray-300">{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
