import { useEffect , useState} from 'react'
import './App.css'
import JobForm from '../components/JobForm';

function App() {
    const [jobs,setJobs] = useState([]);

    const addNewJob = (job) => {
        setJobs([job,...jobs]);

    }

    const deleteJob = async (id) =>{
        try{
            const res = await fetch(`http://localhost:3000/applications/${id}`,{
            method:"DELETE",
            })
            if(!res.ok) return;
            setJobs(jobs.filter((job) => job.id !== id));
        }
        catch(err){
            console.error("deleting failed",err);
        }
    }
   

    useEffect(()=> {

        const loadJob = async () =>{
            try{
                const res = await fetch("http://localhost:3000/applications");
                const data = await res.json();
                setJobs(data);
            }
            catch(err){
                console.error("connection with db had some problems")
            }
        };
        loadJob();

    },[])

    const updateStatus = async  (id,newStatus) =>{

        if(!id || !newStatus) return;
        const oldJobs = jobs;

        setJobs(jobs.map((job)=>{
            if(job.id === id){
                return {...job,status:newStatus};
            }
            else{
                return job
            }
        }))

        try{

            const res = await fetch(`http://localhost:3000/applications/${id}`,{
                method:"PATCH",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({status:newStatus}),
            });
            if (!res.ok){
                setJobs(oldJobs);
            }
        }
        catch(err){
            console.error("db connection error");
            setJobs(oldJobs);
        }



    }




    return (
    <>
     <JobForm addJob={addNewJob}></JobForm>
     <table>
        <thead>
            <tr>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Link</th>
                <th>Status</th>
                <th>Applied date</th>
                <th>Notes</th>
                <th>delete</th>
            </tr>
        </thead>
        <tbody>
            {jobs.map(( job ) => (
            <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.job_title}</td>
                <td>{job.link}</td>
                <td>
                    <select value={job.status} onChange={(e) => updateStatus(job.id,e.target.value)}>
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </td>
                <td>{job.applied_on}</td>
                <td>{job.notes}</td>
                <td><button onClick={() => deleteJob(job.id)}>delete</button></td>
            </tr>))}

        </tbody>
        
     </table>
    
    
    </>
    )
}

export default App
