export default function NavBar(props) {
    return (
        <nav>
            <section id='add_player'>
                <button type='button' onClick={props.toggleAddPForm} className={props.isAddPFVisible ? "big_btn btnActive" : "big_btn"}>Добавить игрока</button>
                <section id='addPlayerForm' className={props.isAddPFVisible ? 'form visible' : 'form hidden'}>
                    <label htmlFor='nameP'>Ник: <input type='text' defaultValue={props.name} onChange={(e) => props.setName(e.target.value)} id='nameP'/></label><br />
                    <input type='button' onClick={props.addPlayer} className='small_btn' defaultValue='доп' />
                </section>
            </section>
            <section id='mod_player'><button type='button' onClick={props.showModPBtn} className={props.isModPVisible ? "big_btn btnActive" : "big_btn"}>Модифицировать игрока</button></section>
            <section id='del_player'><button type='button' onClick={props.showDelPBtn} className={props.isDelPVisible ? "big_btn btnActive" : "big_btn"}>Удалить игрока</button></section>
        </nav>
    )
}