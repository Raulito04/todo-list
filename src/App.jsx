
import { useState, useEffect } from 'react';
import { db } from './firebase/firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // aqui obtengo las tareas
  const fetchTareas = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'tareas'));
    const tareasArr = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(tareasArr);
    setLoading(false);
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  // Aqui agrego las tareas
  const handleAddTarea = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    await addDoc(collection(db, 'tareas'), {
      texto: task,
      completada: false,
      creada: new Date()
    });
    setTask('');
    fetchTareas();
  };

  // Este es para completar las tareas
  const handleCompletar = async (id, completada) => {
    const tareaRef = doc(db, 'tareas', id);
    await updateDoc(tareaRef, { completada: !completada });
    fetchTareas();
  };

  return (
    <div className="container">
      <h1 className="title">Lista de Tareas Firebase</h1>
      <form className="form" onSubmit={handleAddTarea}>
        <input
          type="text"
          className="input"
          placeholder="Agrega una tarea..."
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button className="btn" type="submit">Agregar</button>
      </form>
      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <div className="cards">
          {tasks.length === 0 ? (
            <p>No hay tareas registradas</p>
          ) : (
            tasks.map(t => (
              <div className={`card-task${t.completada ? ' completadas' : ''}`} key={t.id}>
                <p className="task-text">{t.texto}</p>
                <button
                  className={`btn-complete${t.completada ? ' hechas' : ''}`}
                  onClick={() => handleCompletar(t.id, t.completada)}
                >
                  {t.completada ? 'Completada' : 'Completar'}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
