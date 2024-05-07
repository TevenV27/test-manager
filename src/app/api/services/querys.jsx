import { useEffect, useState } from 'react';
import { db } from './firebase';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('proyectos').onSnapshot(snapshot => {
      const proyectoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProyectos(proyectoData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Lista de proyectos</h1>
      <ul>
        {proyectos.map(proyecto => (
          <li key={proyecto.id}>{proyecto.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Proyectos;
