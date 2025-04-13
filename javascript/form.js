// Hanya jalan kalau ada form (halaman index.html)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profileForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const photo = document.getElementById('photo').value;
            const description = document.getElementById('description').value;
            const themeColor = document.getElementById('themeColor').value;

            const newProfile = {
                name,
                photo,
                description,
                themeColor
            };

            // Ambil data lama dari localStorage
            const storedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];

            // Tambahkan data baru
            storedProfiles.push(newProfile);

            // Simpan kembali ke localStorage
            localStorage.setItem('profiles', JSON.stringify(storedProfiles));

            // Reset form
            form.reset();
            alert("Data berhasil disimpan!");
        });
    }
});
