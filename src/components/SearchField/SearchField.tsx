import './searchField.scss'

interface Props {
    downloadData: Function
}

const SearchField = (props: Props) => {

    const test = (value: string) => {
        console.log(value)
    }

    return (
        <div className="search-field-container">
            <input className='search-field' type="text" placeholder="Search..." onChange={(event) => {
                let input:string = event.currentTarget.value
                let url:string = input;
                if (input === '') {
                    url = 'https://swapi.dev/api/planets';
                } else {
                    url = 'https://swapi.dev/api/planets/?search=' + input;
                }

                props.downloadData(url, input)

            }} />
        </div>
    )
}

export default SearchField;