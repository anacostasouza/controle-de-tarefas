import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/tasks", (req, res) => {
    res.json({
        msg: "Hello from the server!",
    });
});

export default app;