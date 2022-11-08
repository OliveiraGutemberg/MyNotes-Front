import { RiShutDownLine } from 'react-icons/ri'
import { useAuth } from "../../hooks/auth"
import { Container, Profile, Logout } from "./styles";
import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/blank-profile-picture-973460_1280.png"

export function Header(){
    const { signOut, user } = useAuth();

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    return (
        <Container>
            <Profile to="/profile">
                <img 
                    src={avatarURL}
                    alt={user.name}
                />

                <div>
                    <span>Bem-vindo(a)</span>
                    <strong>{user.name}</strong>
                </div> 
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>

        </Container>
    );
};