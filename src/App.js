import { useState } from "react";
import PlayersTable from "./playersTable/playersTable";
import GamesTable from "./gamesTable/gamesTable";

export default function App() {
    const [players, setPlayers] = useState([]);
    const [selectPlayer, setSelectPlayer] = useState(0);

    return (
        <>
            <PlayersTable 
                players={players} 
                setPlayers={setPlayers} 
                selectPlayer={selectPlayer}
                setSelectPlayer={setSelectPlayer}
            />
            <GamesTable 
                players={players} 
                setPlayers={setPlayers} 
                selectPlayer={selectPlayer}
            />
        </>
    )
};