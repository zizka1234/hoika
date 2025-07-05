import { useState } from 'react';

export default function PlayersList(props) {
    return (
        <section id='table_cont'>
            <section id='table'>
                <section id='th'>
                    <section className='th'>#</section>
                    <section className='th'>Игрок</section>
                    <section className='th'>Игры</section>
                    <section className='th'>Рэйтинг</section>
                    <section className='th'>Луз</section>
                    <section className='th'>Винрэйт</section>
                </section>
                {props.players.map(player => {
                    return <AddRow 
                        key={player.id} 
                        player={player} 
                        players={props.players}
                        setPlayers={props.setPlayers}
                        isModPVisible={props.isModPVisible}
                        isDelPvisible={props.isDelPvisible}
                        selectPlayer={props.selectPlayer}
                        setSelectPlayer={props.setSelectPlayer}/>
                })}
            </section>
        </section>
    )
}

function AddRow(props) {
    const [isModPFVisible, setIsModPFVisible] = useState(false);
    const toggleModPF = () => setIsModPFVisible(prev => !prev);
    const [newName, setNewName] = useState(props.player.name);
    
    function handleChangeName(newName) {
        const newPlayers = [...props.players];
        const player = newPlayers[props.selectPlayer];
        player.name = newName;
        newPlayers[props.selectPlayer] = player;
        props.setPlayers(newPlayers);
        toggleModPF();
    }

    function handleClickDelP(player) {
        if (window.confirm("Are you sure you want to delete the player?")) {
            const index = props.players.findIndex(p => p.id === player.id);
            if (index === -1) {
                window.alert("Not found!");
                return
            }
            const newPlayers = props.players.toSpliced(index, 1);
            newPlayers.forEach(p => p.id = newPlayers.indexOf(p) + 1);
            props.setPlayers(newPlayers);
        }
    }

    function handleClickSelectP(player) {
        props.setSelectPlayer(props.players.indexOf(player));
    }

    return (
        <section className='rows' onClick={() => handleClickSelectP(props.player)} id={props.player.id}>
            <section className='td'>{props.player.id}</section>
            <section className='td'>
                <span className={isModPFVisible ? 'hidden' : 'visible'}>{props.player.name}</span>
                <span className={isModPFVisible ? 'visible' : 'hidden'}>
                    <input id='changeName' type='text' value={newName} onChange={(e) => setNewName(e.target.value)}/>
                    <button type='button' onClick={() => handleChangeName(newName)} className='small_btn'>мод</button>
                </span>
                <button type='button' onClick={toggleModPF} className={props.isModPVisible ? 'small_btn visible' : 'small_btn hidden'}>✏️</button>
                <button type='button' onClick={() => handleClickDelP(props.player)} className={props.isDelPvisible ? 'small_btn visible' : 'small_btn hidden'}>❌</button>
            </section>
            <section className='td'>{props.player.gamesCount}</section>
            <section className='td'>{props.player.rating}</section>
            <section className='td'>{props.player.win} - {props.player.los}</section>
            <section className='td'>{props.player.wr}%</section>
        </section>
    )
};