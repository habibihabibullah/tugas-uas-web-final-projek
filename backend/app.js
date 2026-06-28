const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Tampil
app.get("/mahasiswa", (req, res) => {
    db.query("SELECT * FROM mahasiswa", (err, result) => res.json(result));
});

// Tambah
app.post("/mahasiswa", (req, res) => {
    const { nama, nim, jurusan } = req.body;
    db.query("INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)", [nama, nim, jurusan], () => res.json({ success: true }));
});

// Hapus
app.delete("/mahasiswa/:id", (req, res) => {
    db.query("DELETE FROM mahasiswa WHERE id = ?", [req.params.id], () => res.json({ success: true }));
});

// Edit
app.put("/mahasiswa/:id", (req, res) => {
    const { nama, nim, jurusan } = req.body;
    db.query("UPDATE mahasiswa SET nama=?, nim=?, jurusan=? WHERE id=?", [nama, nim, jurusan, req.params.id], () => res.json({ success: true }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0');