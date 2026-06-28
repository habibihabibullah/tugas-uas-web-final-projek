// URL backend yang benar dengan https:// agar tidak error 404
const API = "https://tugas-uas-web-final-projek-production.up.railway.app/mahasiswa"; 

window.onload = function () {
    getData();
};

async function getData() {
    try {
        const res = await fetch(API);
        const data = await res.json();
        const tbody = document.getElementById("data");
        let html = "";

        if (!Array.isArray(data) || data.length === 0) {
            html = "<tr><td colspan='4'>DATA KOSONG</td></tr>";
        } else {
            data.forEach((mhs) => {
                html += `
                    <tr>
                        <td>${mhs.nama}</td>
                        <td>${mhs.nim}</td>
                        <td>${mhs.jurusan}</td>
                        <td>    
                            <button onclick="hapus(${mhs.id})">Hapus</button>
                            <button onclick="edit(${mhs.id}, '${mhs.nama}', '${mhs.nim}', '${mhs.jurusan}')">Edit</button>
                        </td>
                    </tr>
                `;
            });
        }
        tbody.innerHTML = html;
    } catch (err) {
        console.log("ERROR GET:", err);
    }
}

async function tambah() {
    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const jurusan = document.getElementById("jurusan").value;

    if (!nama || !nim || !jurusan) {
        alert("Isi semua data!");
        return;
    }

    try {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nama, nim, jurusan })
        });
        
        // Reset input setelah berhasil
        document.getElementById("nama").value = "";
        document.getElementById("nim").value = "";
        document.getElementById("jurusan").value = "";

        getData();
    } catch (err) {
        console.log("ERROR POST:", err);
    }
}

async function hapus(id) {
    try {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        getData();
    } catch (err) {
        console.log("ERROR DELETE:", err);
    }
}

function edit(id, nama, nim, jurusan) {
    const newNama = prompt("Edit Nama:", nama);
    const newNim = prompt("Edit NIM:", nim);
    const newJurusan = prompt("Edit Jurusan:", jurusan);

    if (!newNama || !newNim || !newJurusan) return;

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: newNama, nim: newNim, jurusan: newJurusan })
    }).then(() => getData());
}