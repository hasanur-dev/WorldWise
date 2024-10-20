import Spinner from './Spinner'

import Message from './Message'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext'
const CountryList = () => {
    const { isLoading, cities } = useCities()

    console.log(cities)
    if (isLoading) return <Spinner />
    if (!cities.length)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        )
    const countries = cities.reduce((arr, city) => {
        if (arr.map((c) => c.country).includes(city.country)) return arr
        return [...arr, { emoji: city.emoji, country: city.country }]
    }, [])

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.country} />
            ))}
        </ul>
    )
}

export default CountryList
