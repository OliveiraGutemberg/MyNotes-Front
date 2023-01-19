import { useState, useEffect, useReducer } from "react";
import { useHref, useNavigate } from "react-router-dom";
import { FiPlus, FiSearch } from 'react-icons/fi';
import { api } from "../../services/api";

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header';
import { ButtonText } from '../../components/BottonText';
import { Input } from '../../components/Input';
import { Note } from '../../components/Note';
import { Section } from '../../components/Section';

export function Home() {
    //const [ tags, setTags ] = useState([]);
    const [ tagsSelected, setTagsSelected ] = useState([]);
    const [ searche, setSearch ] = useState("");
    const [ notes, setNotes ] = useState([]);

    async function reducer(state, action){
        const { data } = await api.get("/tags");
        
        //setTags(response.data);
        if(action.type == "tags") {
            state = data 
            console.log(state)
        }
        // switch (action.type){
        //     case "tags":
        //      return {tags: data}  
        // }
        
 
    }

    const [ state, dispatch ] = useReducer(reducer, {
        tags: [],
        tagsSelected: [],
        searche: "",
        notes:[]
    });

    const { tags } = state

    const navigate = useNavigate();

    function handleTagSelected(tagName){
        if(tagName === "all"){
            return setTagsSelected([])
        }
        const alreadySelected = tagsSelected.includes(tagName);

        if(alreadySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName)
            setTagsSelected(filteredTags);
        } else{
            setTagsSelected(prevState => [...prevState, tagName]);
        }

    }

    function handleDetails(id){
        navigate(`/details/:${id}`);
    }

    useEffect(() => {
        dispatch({type: "tags"})
    }, [])

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${searche}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();
    }, [tagsSelected, searche])

    return (
        <Container>
            <Brand>
                <h1>MyNotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos" 
                        onClick={() => handleTagSelected("all")}
                        isActive={tagsSelected.length === 0}
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name} 
                                onClick={() => handleTagSelected(tag.name)}
                                isActive={tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))               
                }
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo titulo" 
                    icon={FiSearch}
                    onChange={e => setSearch(e.target.value)}
                    />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note 
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>

        </Container>
    );
};