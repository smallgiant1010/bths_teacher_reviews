import { useEffect, useState } from "react"
import "../css/Home.css"

const Home = () => {
    const [teachers, get_all_teachers] = useState(null)
    const [searchValue, setSearchValue] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch("/api/teachers/")
                const content = await response.json()
                if (response.ok) {
                    console.log("Fetched teachers: ", content)
                    get_all_teachers(content);
                } else {
                    console.error("Failed to fetch teachers")
                }
            } catch (error) {
                console.error("Error fetching teachers: ", error)
            }
        }
        fetchTeachers()
    }, [])

    const handleSearchClick = () => {
        setSearchTerm(searchValue)
    }

    const handleUndoSearch = () => {
        setSearchValue("")
        setSearchTerm("")
    }

    const set = new Set()
    if (teachers) {
        teachers.forEach(teacher => { set.add(teacher.category) })
    }
    const categories = Array.from(set)

    return (
        <div className="home">
            <div id="searchbar-container">
                <button className="undo-search-button" onClick={handleUndoSearch}>
                    Show All Teachers
                </button>
                <div className="search-bar">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search..." 
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearchClick}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {categories.map(cat => (
                <div key={cat} id={cat}>
                    <h2>{cat}</h2>
                    <div className="container">
                        {teachers && teachers
                            .filter(teacher => 
                                teacher.category === cat && 
                                (teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 teacher.role.toLowerCase().includes(searchTerm.toLowerCase())))
                            .map(teacher => (
                                <div key={teacher._id} className="teacherProfile">
                                    <img src={teacher.img_url} alt="image"/>
                                    <p className="teacherName">{teacher.name}</p>
                                    <p className="teacherPosition">{teacher.role}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home
