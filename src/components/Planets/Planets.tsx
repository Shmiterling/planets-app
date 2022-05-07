import { useState } from 'react';
import './planets.scss'

interface Props {
    planet: Planet;
}

interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    climate: string;
    diameter: string;
    edited: string;
    films: string[];
    gravity: string;
    population: string;
    residents: string[]
    surface_water: string;
    terrain: string;
    url: string
  };

 
const Planets = (props:Props) => {

    let planet = props.planet

    const[infoDisplay, setInfoDisplay] = useState<boolean>(false)

    return (
        <div className='planet' key={planet.name}>
            <div className='planet-name' onClick={() => {setInfoDisplay(!infoDisplay)}}>{planet.name}</div>
            {infoDisplay && <div className='information'>
                <p>Gravity: {planet.gravity}</p>
                <p>Climate: {planet.climate}</p>
                <p>Diameter: {planet.diameter}</p>
                <p>Population: {planet.population}</p>
                <p>Rotation period: {planet.rotation_period}</p>
                <p>Surface: {planet.surface_water}</p>
            </div>}
        </div>
    )
}

export default Planets