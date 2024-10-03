// pages/EditUser.tsx
import React, { useEffect, useState } from 'react';
import UserForm from '../../components/forms/UserForm.tsx';
import { getUserById, updateUser } from '../../services/userService.ts';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar.tsx";

const EditarUsuario: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get user ID from URL params
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserById(Number(id));
            setInitialData({
                name: user.name,
                email: user.email,
                perfil: user.perfil,
                ativo: user.ativo ? 'true' : 'false',
            });
        };
        fetchUser();
    }, [id]);

    const handleFormSubmit = async (formData: any) => {
        try {
            await updateUser({ ...formData, id }); // Update the user with the given ID
            navigate('/usuario'); // Redirect to user list after update
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    return (
        <div>

            <Sidebar/>
                <div className="register-container">
                    <h2>Editar Usuario</h2>
                    {initialData && <UserForm onSubmit={handleFormSubmit} initialFormData={initialData}/>}
                </div>
            </div>
            );
            };

            export default EditarUsuario;
