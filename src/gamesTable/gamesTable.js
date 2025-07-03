import { useState } from 'react';
import NavBar from './navBar';
import GameList from './gameList';
import Game from '../classes/game';

export default function GamesTable({ players, setPlayers, selectPlayer}) {
    const [isAddGFVisible, setIsAddGFVisible] = useState(false);
    const toggleAddGForm = () => setIsAddGFVisible(prev => !prev);
    const [isModGVisible, setSsModGVisible] = useState(false);
    const toggleModGBtn = () => setSsModGVisible(prev => !prev);
    const [isDelGVisible, setSsDelGVisible] = useState(false);
    const toggleDelGBtn = () => setSsDelGVisible(prev => !prev);
    
    const [date, setDate] = useState("");
    const [mod, setMod] = useState("");
    const [mode, setMode] = useState("");
    const [country, setCountry] = useState("");
    const [winLos, setWinLos] = useState("");

    const addGame = () => {
        if (!players[selectPlayer]) {
            window.alert("Игрок не выбран!");
            return;
        }

        const newPlayers = [...players];
        const player = { ...newPlayers[selectPlayer] };
        const newGames = [...player.games];

        const nextId = newGames.length > 0 ? Math.max(...newGames.map(g => g.id)) + 1 : 1;
        const newGame = new Game(nextId, date, mod, mode, country, winLos);
        newGames.push(newGame);

        const newWin = player.win + (newGame.winLos ? 1 : 0);
        const newLos = player.los + (newGame.winLos ? 0 : 1);
        const newRating = player.rating + (newGame.winLos ? 20 : -20);
        const newGamesCount = newGames.length;
        const newWR = (newWin / newGamesCount) * 100;

        newPlayers[selectPlayer] = {
            ...player,
            games: newGames,
            gamesCount: newGamesCount,
            win: newWin,
            los: newLos,
            rating: newRating,
            wr: newWR
        }
        setPlayers(newPlayers);
        toggleAddGForm();
    };

    return (
    <section id='player_games'>
        <h1>📅 История матчей {players[selectPlayer] ? players[selectPlayer].name : "- игрок не выбран"}</h1>
        <NavBar 
            players={players}
            setPlayers={setPlayers}
            selectPlayer={selectPlayer}
            setDate={setDate}
            setMod={setMod}
            setMode={setMode}
            setCountry={setCountry}
            setWinLos={setWinLos}
            winLos={winLos}
            addGame={addGame}
            isAddGFVisible={isAddGFVisible}
            toggleAddGForm={toggleAddGForm}
            isModGVisible={isModGVisible}
            toggleModGBtn={toggleModGBtn}
            isDelGVisible={isDelGVisible}
            toggleDelGBtn={toggleDelGBtn}
        />
        <GameList 
            players={players}
            setPlayers={setPlayers}
            selectPlayer={selectPlayer}
            setDate={setDate}
            setMod={setMod}
            setMode={setMode}
            setWinLos={setWinLos}
            isModGVisible={isModGVisible}
            isDelGVisible={isDelGVisible}
        />
    </section>
    )
};