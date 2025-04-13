const profileContainer = document.getElementById('profileContainer');
const emptyMessage = document.getElementById('emptyMessage');
const cardViewBtn = document.getElementById('cardViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

let currentView = 'card';

function getProfiles() {
    return JSON.parse(localStorage.getItem('profiles')) || [];
}

function renderProfiles() {
    const profiles = getProfiles();

    if (profiles.length === 0) {
        emptyMessage.style.display = 'block';
        profileContainer.innerHTML = '';
        return;
    }

    emptyMessage.style.display = 'none';

    if (currentView === 'card') {
        renderCardView(profiles);
    } else {
        renderListView(profiles);
    }
}

function renderCardView(profiles) {
    profileContainer.className = 'card-view';
    profileContainer.innerHTML = '';

    profiles.forEach((profile, index) => {
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.style.backgroundColor = profile.themeColor;

        card.innerHTML = `
            <img src="${profile.photo}" alt="${profile.name}">
            <h3>${profile.name}</h3>
            <p>${profile.description}</p>
            <button class="delete-btn" data-index="${index}">Hapus</button>
        `;

        profileContainer.appendChild(card);
    });

    addDeleteEvents();
}

function renderListView(profiles) {
    profileContainer.className = 'list-view';
    profileContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th>Warna Tema</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                ${profiles.map((profile, index) => `
                    <tr>
                        <td><img src="${profile.photo}" alt="${profile.name}" width="80"></td>
                        <td>${profile.name}</td>
                        <td>${profile.description}</td>
                        <td>
                            <div style="width: 30px; height: 30px; background-color: ${profile.themeColor}; border-radius: 4px;"></div>
                        </td>
                        <td><button class="delete-btn" data-index="${index}">Hapus</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    addDeleteEvents();
}

function addDeleteEvents() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            const profiles = getProfiles();

            if (confirm('Yakin ingin menghapus profile ini?')) {
                profiles.splice(index, 1);
                localStorage.setItem('profiles', JSON.stringify(profiles));
                renderProfiles();
            }
        });
    });
}

// Event toggle tampilan
cardViewBtn.addEventListener('click', () => {
    currentView = 'card';
    renderProfiles();
});

listViewBtn.addEventListener('click', () => {
    currentView = 'list';
    renderProfiles();
});

// Render awal
renderProfiles();
