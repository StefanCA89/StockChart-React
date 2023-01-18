import Toggle from './Toggle.js'

export default function InputBar(props) {
    function updateInput(event) {
        const {name, value, id} = event.target
        props.setData(prevData => {
            return {...prevData, [name] : name === 'symbol' ? value : id}
        })
    }
    return (
        <div className="input-bar">
            <input type='text' className="input-box" name="symbol" onChange={updateInput} placeholder="Type Symbol here"></input>
            <button className='submit-btn' onClick={props.handleSubmit}>Submit</button>
            <fieldset className="radio-field">
                <input type='radio'
                    id="60min"
                    name="timeInterval"
                    onChange={updateInput}
                />
                <label htmlFor="60min">60min</label>

                <input type='radio'
                    id="30min"
                    name="timeInterval"
                    onChange={updateInput}
                />
                <label htmlFor="30min">30min</label>

                <input type='radio'
                    id="15min"
                    name="timeInterval"
                    onChange={updateInput}
                />
                <label htmlFor="15min">15min</label>

                <input type='radio'
                    id="5min"
                    name="timeInterval"
                    onChange={updateInput}
                />
                <label htmlFor="5min">5min</label>

                <input type='radio'
                    id="1min"
                    name="timeInterval"
                    onChange={updateInput}
                />
                <label htmlFor="1min">1min</label>
            </fieldset>
            <Toggle handleToggle={props.handleToggle}/>
        </div>
    )
}