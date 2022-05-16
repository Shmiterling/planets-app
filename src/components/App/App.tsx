import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

import preloader from '../img/preloader.gif';
import Planets from '../Planets/Planets'
import SearchField from '../SearchField/SearchField';

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

interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[]
}

interface Pagination {
  number: number;
  url: string;
}

function App(): JSX.Element {

  const [pageOnView, setPageOnView] = useState<number>(1)
  const [planets, setPlanets] = useState<Planet[]>([])
  const [pagination, setPagination] = useState<Pagination[]>([])
  const [preloaderFlag, setPreloaderFlag] = useState<boolean>(false)


  useEffect(() => {
    downloadData('https://swapi.dev/api/planets')
  }, [])

  const downloadData = (url: string) => {
    setPreloaderFlag(true)

    axios.get<Data>(url)
      .then((response) => {
        setPlanets(response.data.results)

        let pages: Pagination[] = []

        if (!url.includes('page')) {

          if(url === 'https://swapi.dev/api/planets') {
            setPageOnView(1);
          }

          for (
            let i: number = 1;
            i <= Math.ceil(response.data.count / response.data.results.length);
            i++
          ) {
            if (url.includes('search')) {
              pages.push({ number: i, url: url + '&page=' + i })
              setPageOnView(1)
            } else {
              pages.push({ number: i, url: url + '?page=' + i })
            }
          }

          setPagination(pages)
        }

        setPreloaderFlag(false)
      })
  }


  return (
    <div className='app'>
      <h1>List of Star Wars Universe Planets</h1>

      <SearchField downloadData={downloadData} />

      {preloaderFlag && <img src={preloader}></img>}

      {preloaderFlag || <div className='list-of-planets'>
        {planets.map((planet: Planet) => {

          return <Planets key={planet.name} planet={planet} />

        })}
      </div>}

      <div className='buttons'>
        <ul className='buttons-list'>
          {pagination.map((page) => {
            return (
              <li className={(pageOnView === page.number ? 'button active' : 'button')}
                onClick={() => { downloadData(page.url); setPageOnView(page.number);}}
                key={page.number}>
                {page.number}
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}

export default App;
