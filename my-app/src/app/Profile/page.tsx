import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (location.state && location.state.userData) {
            setUserData(location.state.userData);
        }
    }, [location]);

    return (
        <div>
            <h1>Perfil do Usuário</h1>
            {userData && (
                <div>
                    <p>Nome: {userData.nome}</p>
                    <p>E-mail: {userData.email}</p>
                    {/* Adicione outras informações do usuário conforme necessário */}
                </div>
            )}
        </div>
    );
};

export default Profile;
