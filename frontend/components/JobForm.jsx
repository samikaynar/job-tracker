import { useEffect, useState } from "react";



function JobForm({addJob}){
    const [form,setForm] = useState({company: "" , job_title:"",link:"",notes:""});

    const handleChange = (e) => {
        
        setForm({...form , [e.target.name]:e.target.value} )

    };

    const saveChange = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:3000/applications",{
                method:"POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(form),
            });
            
            if(!res.ok) return;
            const newJob = await res.json();
            addJob(newJob);
            setForm({company: "" , job_title:"",link:"",notes:""});
        }
        catch(err){
            console.error("job couldn't be saved ",err)
        }
        

    }


    return (
        <form onSubmit={saveChange}>
            <input type="text" name="company" onChange={handleChange} value={form.company}/>
            <input type="text" name="job_title" onChange={handleChange} value={form.job_title} />
            <input type="text" name="link" onChange={handleChange} value={form.link} />
            <input type="text" name="notes" onChange={handleChange} value={form.notes}  />
            <button type="submit">save</button>
        </form>
        
    );

}

export default JobForm