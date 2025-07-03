import { useState } from 'react';
import NavBar from './navBar';
import PlayersList from '../playersTable/playersList';
import Player from '../classes/player';

export default function PlayersTable({players, setPlayers, selectPlayer, setSelectPlayer}) {
    const [name, setName] = useState("");
    const [isAddPFVisible, setIsAddPFVisible] = useState(false);
    const toggleAddPForm = () => setIsAddPFVisible(prev => !prev);
    const [isModPVisible, setIsModPVisible] = useState(false);
    const toggleModPBtn = () => {setIsModPVisible(prev => !prev)};
    const [isDelPVisible, setIsDelPVisible] = useState(false);
    const togleDelPBtn = () => setIsDelPVisible(prev => !prev);
    
    const addPlayer = () => {
        if (name.trim === "") return;
        setPlayers([...players, new Player(players.length + 1, name, 0, 1000, 0, 0, 0, [])]);
        setName("");
        toggleAddPForm();
    }

    
    return (<section id='players_table'>
        <NavBar 
            addPlayer={addPlayer} 
            setName={setName} 
            name={name}
            isAddPFVisible={isAddPFVisible}
            toggleAddPForm={toggleAddPForm}
            isModPVisible={isModPVisible}
            showModPBtn={toggleModPBtn}
            isDelPVisible={isDelPVisible}
            showDelPBtn={togleDelPBtn}
        />
        <PlayersList 
            players={players}
            setPlayers={setPlayers}
            isModPVisible={isModPVisible}
            isDelPvisible={isDelPVisible}
            selectPlayer={selectPlayer}
            setSelectPlayer={setSelectPlayer}
        />
    </section>)
};