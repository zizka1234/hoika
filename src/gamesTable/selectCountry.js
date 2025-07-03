export default function SelectCountry(props) {
    if (props.setCountry) {
        return (
            <select name='country' onChange={(e) => props.setCountry(e.target.value)}>
                <option></option>
                <option>GER</option>
                <option>ITA</option>
                <option>JAP</option>
                <option>ENG</option>
                <option>FRA</option>
                <option>SOV</option>
            </select>
        )
    } else if (props.setNewCountry) {
        return (
            <select name='country' value={props.newCountry} onChange={(e) => props.setNewCountry(e.target.value)}>
                <option></option>
                <option>GER</option>
                <option>ITA</option>
                <option>JAP</option>
                <option>ENG</option>
                <option>FRA</option>
                <option>SOV</option>
            </select>
        )
    }

}