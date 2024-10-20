import { createContext, useContext, useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        const fetchCities = async function () {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json()
                setCities(data)
            } catch (error) {
                alert('There was an error trying to fetch data')
            } finally {
                setIsLoading(false)
            }
        }
        fetchCities()
    }, [])
    const getCity = async function (id) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            setCurrentCity(data)
        } catch (error) {
            alert('There was an error trying to fetch data')
        } finally {
            setIsLoading(false)
        }
    }
    const createCity = async function (newCity) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            const data = await res.json()
            console.log(data)
            setCities((cities) => [...cities, data])
        } catch (error) {
            alert('There was an error adding city.')
        } finally {
            setIsLoading(false)
        }
    }
    const deleteCity = async function (id) {
        try {
            setIsLoading(true)
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            })

            setCities((cities) => cities.filter((city) => city.id !== id))
        } catch (error) {
            alert('There was an error deleting city.')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined)
        throw new Error('CitiesContext was used outside the CitiesProvider')
    return context
}

export { CitiesProvider, useCities }
