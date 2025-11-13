import {Link} from 'react-router-dom'

export default function LandingPage(){
    return (
        <>
            <h1>Book a table</h1>
            <Link to='booking-form'>
                <button>Book Now !!!</button>
            </Link>
        </>
    )
}