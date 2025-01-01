import React, { useState, useEffect } from 'react';
import './StudentCrud.css';

function StudentCrud() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    _id: null,
    nom: '',
    prenom: '',
    filiere: '',
    niveau: '',
    email: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/etudiants');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Erreur lors du chargement des étudiants:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStudent.nom && currentStudent.prenom && currentStudent.filiere && currentStudent.niveau && currentStudent.email) {
      try {
        const url = isEditing 
          ? `http://localhost:5000/api/etudiants/${currentStudent._id}`
          : 'http://localhost:5000/api/etudiants';
        
        const response = await fetch(url, {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentStudent)
        });
        
        if (response.ok) {
          await fetchStudents();
          setShowForm(false);
          setIsEditing(false);
          setCurrentStudent({
            _id: null,
            nom: '',
            prenom: '',
            filiere: '',
            niveau: '',
            email: ''
          });
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue');
      }
    }
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setCurrentStudent(student);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/etudiants/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await fetchStudents();
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'étudiant');
      }
    }
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentStudent({
      _id: null,
      nom: '',
      prenom: '',
      filiere: '',
      niveau: '',
      email: ''
    });
    setShowForm(true);
  };

  return (
    <div className="student-crud">
      <h1>Gestion des Étudiants</h1>
      
      <button className="add-button" onClick={handleAddNew}>
        ➕ Ajouter un Étudiant
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="add-form">
            <h2>{isEditing ? 'Modifier l\'étudiant' : 'Ajouter un Étudiant'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nom"
                value={currentStudent.nom}
                onChange={(e) => setCurrentStudent({...currentStudent, nom: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Prénom"
                value={currentStudent.prenom}
                onChange={(e) => setCurrentStudent({...currentStudent, prenom: e.target.value})}
                required
              />
              <select
                value={currentStudent.filiere}
                onChange={(e) => setCurrentStudent({...currentStudent, filiere: e.target.value})}
                required
              >
                <option value="">Sélectionner une filière</option>
                <option value="Génie Informatique">Génie Informatique</option>
                <option value="Génie Civil">Génie Civil</option>
                <option value="Génie Industriel">Génie Industriel</option>
                <option value="Génie Mécanique">Génie Mécanique</option>
              </select>
              <select
                value={currentStudent.niveau}
                onChange={(e) => setCurrentStudent({...currentStudent, niveau: e.target.value})}
                required
              >
                <option value="">Sélectionner un niveau</option>
                <option value="1ère année">1ère année</option>
                <option value="2ème année">2ème année</option>
                <option value="3ème année">3ème année</option>
                <option value="4ème année">4ème année</option>
                <option value="5ème année">5ème année</option>
              </select>
              <input
                type="email"
                placeholder="Email"
                value={currentStudent.email}
                onChange={(e) => setCurrentStudent({...currentStudent, email: e.target.value})}
                required
              />
              <div className="form-buttons">
                <button type="submit" className="confirm-button">
                  {isEditing ? 'Modifier' : 'Ajouter'}
                </button>
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Filière</th>
              <th>Niveau</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-message">
                  Aucun étudiant n'a été ajouté
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student._id}</td>
                  <td>{student.nom}</td>
                  <td>{student.prenom}</td>
                  <td>{student.filiere}</td>
                  <td>{student.niveau}</td>
                  <td>{student.email}</td>
                  <td className="actions">
                    <button 
                      className="action-button edit" 
                      title="Modifier"
                      onClick={() => handleEdit(student)}
                    >✏️</button>
                    <button 
                      className="action-button delete" 
                      title="Supprimer"
                      onClick={() => handleDelete(student._id)}
                    >🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentCrud;