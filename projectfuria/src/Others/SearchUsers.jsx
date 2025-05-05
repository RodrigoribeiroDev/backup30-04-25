import { useState } from 'react';
import '../Others/SearchUsers.css'

const SearchUsers = () => {

  const allUsers = [
    { id: '1', name: 'Rodrigo', photo: 'https://via.placeholder.com/40', online: true },
    { id: '2', name: 'Maria', photo: 'https://via.placeholder.com/40', online: false },
    { id: '3', name: 'João', photo: 'https://via.placeholder.com/40', online: true },
  ];

  const [inputId, setInputId] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);


  const handleAddUser = () => {
    const found = allUsers.find(user => user.id === inputId);
    if (found && !selectedUsers.some(u => u.id === found.id)) {
      setSelectedUsers([...selectedUsers, found]);
    }
    setInputId('');
  };

  return (
    <div className="containerSearchUsers">

      <div className="search-container">
        <input
          type="text"
          value={inputId}
          placeholder="Busque um usuário pelo ID"
          onChange={(e) => setInputId(e.target.value)}
        />
        <button className='btn-search' onClick={handleAddUser}>+</button>
      </div>

      <div className="user-list-container">
        <h3 className='users-h3'>Users</h3>
        <div className="users-list">
          {selectedUsers.map((usr) => (
            <div key={usr.id} className={usr.online ? 'user online' : 'user offline'}>
              <img
                src={usr.photo || 'https://via.placeholder.com/40'}
                alt={usr.name}
                className="user-avatar"
              />
              <div className="user-name">{usr.name}</div>
              <div className={usr.online ? 'online-dot' : 'offline-dot'}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
