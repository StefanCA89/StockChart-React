import { useContext } from "react"
import { ThemeContext } from "../App"

export default function ErrorMessage({setError, message}) {
    const darkTheme = useContext(ThemeContext)
    return (
        <div className='error-box-backdrop' style={{backgroundColor : darkTheme ? "#6c6c6cb3" : "#ffffffb3"}}>
            <div className='error-box-foreground'>
                {message}
            <button className="error-box-button" onClick={() => setError({found : false, message : ''})}>Ok</button>
            </div>
        </div>
    )
} 