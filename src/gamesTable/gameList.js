import { useState } from "react";
import SelectCountry from "./selectCountry";

export default function GameList(props) {
    return (
        <section id="game_list">
            {props.players[props.selectPlayer] 
            ? (props.players[props.selectPlayer].games.length !== 0 
                ? props.players[props.selectPlayer].games.map((game, index) => {
                    return <section key={game.id ?? index} className="game_info">
                        <GameInfo 
                            game={game}
                            gameIndex={index}
                            players={props.players}
                            setPlayers={props.setPlayers}
                            selectPlayer={props.selectPlayer}
                            setdate={props.setdate}
                            setMod={props.setMod}
                            setMode={props.setMode}
                            setWinLos={props.setWinLos}
                            isModGVisible={props.isModGVisible}
                            isDelGVisible={props.isDelGVisible}
                        /> 
                    </section>
                })
                : <h2>Еще не играл</h2>) 
            : ""}
        </section>
    )
}

function GameInfo(props) {
    const [isModGFVisible, setIsModGFVisible] = useState(false);
    const toggleModGF = () => setIsModGFVisible(prev => !prev); 

    const [newDate, setNewDate] = useState(props.game.date);
    const [newMod, setNewMod] = useState(props.game.mod);
    const [newMode, setNewMode] = useState(props.game.mode);
    const [newCountry, setNewCountry] = useState(props.game.country);
    const [newWinLos, setNewWinLos] = useState(props.game.winLos);

    function handleChangeGame() {
        const newPlayers = [...props.players];
        const newPlayer = {...newPlayers[props.selectPlayer]};
        const newGames = [...newPlayer.games];
        const newGame = {...newGames[props.gameIndex]};

        newGame.date !== newDate && (newGame.date = newDate);
        newGame.mod !== newMod && (newGame.mod = newMod);
        newGame.mode !== newMode && (newGame.mode = newMode);
        newGame.country !== newCountry && (newGame.country = newCountry);

        let newWin = newPlayer.win;
        let newLos = newPlayer.los;
        let newRating = newPlayer.rating;
        let newGamesCount = newPlayer.gamesCount;
        let newWR = newPlayer.wr;
        if (newGame.winLos !== newWinLos) {
            newGame.winLos = newWinLos
            newWin = newPlayer.win + (newGame.winLos ? 1 : -1);
            newLos = newPlayer.los + (newGame.winLos ? -1 : 1);
            newRating = newPlayer.rating + (newGame.winLos ? 40 : -40);
            newGamesCount = newGames.length;
            newWR = (newWin / newGamesCount) * 100;
            
        }

        newGames[props.gameIndex] = newGame;
        newPlayer.games = newGames;
        newPlayers[props.selectPlayer] = {
            ...newPlayer,
            games: newGames,
            win: newWin,
            los: newLos,
            rating: newRating,
            wr: newWR
        }
        
        props.setPlayers(newPlayers);
        toggleModGF();
    }

    function handleDelGame() {
        if (window.confirm("Are you sure you want to delete the game?")) {
            props.setPlayers(
                props.players.map((player, inx) => {
                    if (inx !== props.selectPlayer) return player;

                    const updatedGames = player.games.toSpliced(props.gameIndex, 1);
                    const deletedGame = player.games[props.gameIndex];

                    const newWin = deletedGame.winLos ? player.win - 1 : player.win;
                    const newLos = !deletedGame.winLos ? player.los - 1 : player.los;
                    const newRating = deletedGame.winLos ? player.rating - 20 : player.rating + 20;
                    const newGamesCount = player.gamesCount - 1;
                    const newWR = newGamesCount > 0 ? (newWin / newGamesCount) * 100 : 0;

                    return {
                        ...player,
                        games: updatedGames,
                        gamesCount: newGamesCount,
                        win: newWin,
                        los: newLos,
                        rating: newRating,
                        wr: newWR
                    };
                })
            );
        }
    }

    return (
        <section className="game_info_cont">
            <section className="left">
                <h3>
                    <span className={isModGFVisible && props.isModGVisible ? "hidden" : "visible"}>{props.game.date} — {props.game.mod} {props.game.mode}</span>
                    <span className={isModGFVisible && props.isModGVisible ? "visible" : "hidden"}>
                        <input type="date" name='date' value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                        &nbsp;—&nbsp;
                        <input type="text" name='mod' value={newMod} onChange={(e) => setNewMod(e.target.value)} placeholder="mod"/> 
                        <input type="text" name='mode' value={newMode} onChange={(e) => setNewMode(e.target.value)} placeholder="mode" />
                    </span>
                    <button type="button" onClick={handleChangeGame} className={isModGFVisible && props.isModGVisible ? "small_btn visible" : "hidden" }>mod</button>
                    <button type="button" onClick={toggleModGF} className={props.isModGVisible ? "small_btn visible" : "hidden"}>✏️</button>
                    <button type="button" onClick={handleDelGame} className={props.isDelGVisible ? "small_btn visible" : "hidden"}>❌</button>
                </h3>
                <p className={isModGFVisible && props.isModGVisible ? "hidden" : "visible"}>На: {props.game.country}</p>
                <p className={isModGFVisible && props.isModGVisible ? "visible" : "hidden"}><SelectCountry newCountry={newCountry} setNewCountry={setNewCountry}/></p>
            </section>
            <section className="right">
                <h3 className={isModGFVisible && props.isModGVisible ? "hidden" : "visible"}>{props.game.winLos ? "🏆 Победа" : "💀 Поражение"}</h3>
                <h3 className={isModGFVisible && props.isModGVisible ? "radio_block" : "hidden"}>
                    <label htmlFor={props.game.id+"changeWin"}>Победа: <input type="radio" name={props.game.id+"changeWinLose"} id={props.game.id+"changeWin"} value={"true"} onChange={(e) => setNewWinLos(e.target.value === "true")} checked={newWinLos}/></label><br />
                    <label htmlFor={props.game.id+"changeLos"}>Поражение: <input type="radio" name={props.game.id+"changeWinLose"} id={props.game.id+"changeLos"} value={"false"} onChange={(e) => setNewWinLos(e.target.value === "true")} checked={!newWinLos}/></label>
                </h3>
            </section>
        </section>
    );
};