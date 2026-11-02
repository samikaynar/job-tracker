import express from "express";
q

const app = express();

app.use(express.json());

app.get("/health", (req,res) => {
    res.json({ok:true});
});

app.get("/db-test" , async (req,res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
})


app.get("/books", async (req,res) => {

    const result = await pool.query("SELECT * FROM applications ORDER BY created_at DESC");
    res.json(result.rows);

})


app.post("/add", async (req,res) => {
    const jobs= req.
})



app.listen(3000, () => {
    console.log("server is running!");
})