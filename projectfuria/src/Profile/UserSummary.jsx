import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context/MyContext';
import '../Profile/UserSummary.css';

export default function UserSummary() {
  const { user } = useContext(MyContext);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (user.photo instanceof File) {
      const url = URL.createObjectURL(user.photo);
      setImageURL(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [user.photo]);

  return (
    <section className="user-summary">
      <h3>Seu Perfil</h3>

      {imageURL && <img src={imageURL} alt="Avatar" />}

      <p><strong>Nome:</strong> Usuário {user.name}</p>
      <p><strong>ID:</strong> 13234325{user.id}</p>

      {user.city && user.state && (
        <p><strong>Localização:</strong> {user.city} - {user.state}</p>
      )}
    </section>
  );
}
