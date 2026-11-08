import { useEffect , useState} from 'react'
import './App.css'
import JobForm from '../components/JobForm';

function App() {
    const [jobs,setJobs] = useState([]);

    const addNewJob = (job) => {
        setJobs([job,...jobs]);

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
                

            </tr>))}

        </tbody>
        
     </table>
    
    
    </>
    )
}

export default App
