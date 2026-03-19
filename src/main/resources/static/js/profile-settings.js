const user = requireAuth();
if (user) {
    document.getElementById("userName").textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userFirstName").textContent = user.firstName;
    document.getElementById("userLastName").textContent = user.lastName;
    document.getElementById("userRole").textContent = user.role === "USER" ? "User" : user.role;
    initProfileDropdown();
    initLogout();
}

function editField(fieldName, elementId) {
    const valueSpan = document.getElementById(elementId);
    const row = valueSpan.parentElement;
    
    valueSpan.style.display = 'none';
    row.querySelector('.edit-btn').style.display = 'none';
    
    const container = document.createElement('div');
    container.className = 'edit-container';
    container.innerHTML = `
        <input type="${fieldName === 'email' ? 'email' : 'text'}" value="${valueSpan.textContent}" class="edit-input">
        <button class="save-btn">✓</button>
        <button class="cancel-btn">✕</button>
    `;
    row.appendChild(container);
    
    const input = container.querySelector('.edit-input');
    const saveBtn = container.querySelector('.save-btn');
    
    input.focus();
    input.select();
    
    const restore = () => {
        container.remove();
        valueSpan.style.display = '';
        row.querySelector('.edit-btn').style.display = '';
    };
    
    const save = async () => {
        const newValue = input.value.trim();
        if (!newValue || newValue === valueSpan.textContent) return restore();
        
        const currentUser = getCurrentUser();
        if (!currentUser) return;
        
        saveBtn.disabled = true;
        saveBtn.textContent = '';
        
        try {
            const response = await fetch(`/users/${currentUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [fieldName]: newValue })
            });
            
            if (!response.ok) throw new Error();
            
            const updated = await response.json();
            localStorage.setItem('user', JSON.stringify(updated));
            valueSpan.textContent = newValue;
            
            if (fieldName.includes('Name')) {
                document.getElementById("userName").textContent = `${updated.firstName} ${updated.lastName}`;
            }
            
            restore();
            showNotification('Profile updated!', 'success');
        } catch {
            saveBtn.disabled = false;
            saveBtn.textContent = '✓';
            showNotification('Update failed', 'error');
        }
    };
    
    saveBtn.onclick = save;
    container.querySelector('.cancel-btn').onclick = restore;
    input.onkeydown = (e) => {
        if (e.key === 'Enter') save();
        if (e.key === 'Escape') restore();
    };
}

function showNotification(message, type) {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => notif.classList.add('show'), 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}
