import React, { useState, useEffect } from 'react';
import { getStages, createStage, updateStage, deleteStage } from '../services/stageService';
import './StageCrud.css';

function PFAManagement() {
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadStages();
    }, []);

    const loadStages = async () => {
        try {
            const data = await getStages('PFA');
            setStages(data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading stages:', error);
            setError('Erreur lors du chargement des stages');
            setLoading(false);
        }
    };

    const handleAddStage = async (newStage) => {
        try {
            const stage = await createStage({ ...newStage, type: 'PFA' });
            setStages([...stages, stage]);
        } catch (error) {
            console.error('Error adding stage:', error);
            setError('Erreur lors de l\'ajout du stage');
        }
    };

    const handleUpdateStage = async (id, updatedStage) => {
        try {
            const stage = await updateStage(id, updatedStage);
            setStages(stages.map(s => s._id === id ? stage : s));
        } catch (error) {
            console.error('Error updating stage:', error);
            setError('Erreur lors de la mise à jour du stage');
        }
    };

    const handleDeleteStage = async (id) => {
        try {
            await deleteStage(id);
            setStages(stages.filter(s => s._id !== id));
        } catch (error) {
            console.error('Error deleting stage:', error);
            setError('Erreur lors de la suppression du stage');
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="stage-crud-container">
            <h2>Gestion des PFA</h2>
            <div className="stages-list">
                {stages.map(stage => (
                    <div key={stage._id} className="stage-card">
                        <h3>{stage.title}</h3>
                        <p><strong>Description:</strong> {stage.description}</p>
                        <p><strong>Entreprise:</strong> {stage.company?.name}</p>
                        <p><strong>Status:</strong> {stage.status}</p>
                        <p><strong>Date de début:</strong> {new Date(stage.startDate).toLocaleDateString()}</p>
                        <p><strong>Date de fin:</strong> {new Date(stage.endDate).toLocaleDateString()}</p>
                        <div className="stage-actions">
                            <button onClick={() => handleUpdateStage(stage._id, stage)}>Modifier</button>
                            <button onClick={() => handleDeleteStage(stage._id)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PFAManagement;
