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
                <td>{job.status}</td>
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
