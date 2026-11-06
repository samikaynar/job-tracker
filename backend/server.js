import express from "express";
import { pool } from "./db.js";
   import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req,res) => {
    res.json({ok:true});
});

app.get("/applications", async (req,res) => {
    try{
        const result = await pool.query("SELECT * FROM applications ORDER BY created_at DESC");
        res.json(result.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"server error"});
    }
    

})

app.post("/applications", async (req,res) =>{
    const {company,job_title,link,notes} = req.body || {};
    if(!company || !job_title){
        return res.status(400).json({error:"company and job_title are required"})
    }

    try{
        const result = await pool.query("INSERT INTO applications (company,job_title,link,notes) VALUES ($1, $2, $3, $4) RETURNING *",[company,job_title,link,notes]);

        res.status(201).json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"server error"});

    }


})

app.delete("/applications/:id", async (req,res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({error:"bad request"});

    }

    try{
        const result = await pool.query(
            "DELETE FROM applications WHERE id =$1 RETURNING *",[id]);
        if (result.rowCount === 0 ){
            return res.status(404).json({error:"the job is not exist"});
        }
        res.status(200).json({message:"deleted successfully",deleted:result.rows[0]});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "server error" });
    }

});

app.listen(3000, () => {
    console.log("server is running!");
})