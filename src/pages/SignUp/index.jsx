import { useState } from 'react';
import { FiLogIn, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import { Container, Form, Background } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignUp(){
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    function handleSignup(){
        if(!name || !email || !password){
            return alert("Preecha todos os campos!")
        }

        api.post("/users", { name, email, password})
        .then(() => {
            alert("Usuario cadastrado com sucesso")
            return navigate("/")
        })

        .catch(err => {
            if(err.response){
                alert(err.response.data.message);
            } else{
                alert("Não foi possível cadastrar")
            }
        })
    }

    return (
        <Container>

            <Background />

            <Form>
                <h1>MyNotes</h1>
                <p>Plicação para Salvar e gerenciar seus links úteis.</p>

                <h2>Crie sua conta</h2>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={event => setName(event.target.value)}
                />

                <Input
                    placeholder="Email"
                    type="text"
                    icon={FiMail}
                    onChange={event => setEmail(event.target.value)}
                />  

                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={event => setPassword(event.target.value)}
                />  

                <Button title="Cadastrar" onClick={handleSignup} />

                <Link to="/">
                    Voltar para o login
                </Link>

            </Form>

        </Container>
    )
}