import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../Context/MyContext';
import '../Profile/EditProfile.css';
import {Link} from 'react-router-dom'
import { FaAngleDoubleRight } from "react-icons/fa";

export default function EditProfile() {
  const { setUser } = useContext(MyContext);
  const [formData, setFormData] = useState({
    id: '',
    displayName: '',
    email: '',
    phone: '',
    notifyWhatsapp: false,
    password: '',
    avatar: null,
    cep: '',
    city: '',
    state: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData(prev => ({ ...prev, id: randomId }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : files ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleCepLookup = async () => {
    if (formData.cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          city: data.localidade,
          state: data.uf
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.displayName || !formData.email || !formData.password) {
      setMessage('Por favor, preencha todos os campos obrigatórios.');
      setMessageType('error');
      return;
    }

    setUser({
      ...formData,
      online: true, 
    });

    setMessage('Alterações salvas com sucesso!');
    setMessageType('success');

    setFormData({
      id: '',
      displayName: '',
      email: '',
      phone: '',
      notifyWhatsapp: false,
      password: '',
      avatar: null,
      cep: '',
      city: '',
      state: ''
    });
  };

  return (
    <div>
         <Link to="/home"
         className='link-home'>
          <FaAngleDoubleRight size={12}/> Página inicial</Link>

    <form onSubmit={handleSubmit} className="user-profile-form">
      <h2>Editar Perfil</h2>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div>
        <label>ID do Usuário</label>
        <input value={formData.id} disabled readOnly />
      </div>

      <div>
        <label>Nome de exibição no chat</label>
        <input
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Telefone</label>
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="notifyWhatsapp"
            checked={formData.notifyWhatsapp}
            onChange={handleChange}
          />{' '}
          Marque para receber notificações no seu WhatsApp
        </label>
      </div>

      <div>
        <label>CEP</label>
        <input
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          onBlur={handleCepLookup}
          maxLength="8"
        />
        {formData.city && formData.state && (
          <p>{formData.city} - {formData.state}</p>
        )}
      </div>

      <div>
        <label>Senha para salvar as alterações</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Salvar Alterações</button>
    </form>
    </div>
  );
}
