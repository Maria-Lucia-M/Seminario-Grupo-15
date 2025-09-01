import express from "express";
const app = express();
app.use('/', (req, res) => {
    res.send("Holaa!!!");
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map