import SelectCountry from './selectCountry';

export default function NavBar(props) {
    return (
        <nav>
            <section id="add_game">
                <button type="button" onClick={props.toggleAddGForm} className={props.isAddGFVisible ? "big_btn btnActive" : "big_btn"}>Добавить игру</button>
                <section id="addGameForm" className={props.isAddGFVisible ? "form visible" : "form hidden"}>
                    <label htmlFor='date'>Дата иргы: <input type='date' id='date' onChange={(e) => props.setDate(e.target.value)} /></label><br />
                    <label htmlFor='mod'>Мод: <input type='text' id='mod' onChange={(e) => props.setMod(e.target.value)} /></label><br />
                    <label htmlFor='mode'>Режим(опционально): <input type='text' id='mode' onChange={(e) => props.setMode(e.target.value)} /></label><br />
                    Страна: <SelectCountry setCountry={props.setCountry}/><br />
                    <label htmlFor="win">Победа: <input type="radio" name="winLose" id="win" onChange={(e) => props.setWinLos(e.target.value === "true")} defaultValue={"true"} /></label>
                    <label htmlFor="los">Поражение: <input type="radio" name="winLose" id="los" onChange={(e) => props.setWinLos(e.target.value === "true")} defaultValue={"false"} /></label><br />
                    <button type='button' className='small_btn' onClick={props.addGame}>доп</button>
                </section>
            </section>
            <section id="mod_game"><button type="button" onClick={props.toggleModGBtn} className={props.isModGVisible ? "big_btn btnActive" : "big_btn"}>Модифицировать игру</button></section>
            <section id="del_game"><button type="button" onClick={props.toggleDelGBtn} className={props.isDelGVisible ? "big_btn btnActive" : "big_btn"}>Удалить игру</button></section>
        </nav>
    )
}