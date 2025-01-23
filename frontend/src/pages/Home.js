import { useEffect, useState } from "react"
import "../css/Home.css"

const Home = () => {
    const [teachers, get_all_teachers] = useState(null)
    useEffect(() => {
        const fetchTeachers = async () => {
            try { 
                const response = await fetch("/api/teachers/") 
                const content = await response.json() 
                if (response.ok) {
                    console.log("Fetched teachers: ", content)
                    get_all_teachers(content)
                } else { 
                    console.error("Failed to fetch teachers")
                } 
            } catch (error) { 
                console.error("Error fetching teachers: ", error)
            }
        }
       
        fetchTeachers()
    }, [])

    const set = new Set()
    if (teachers) { 
        teachers.forEach(teacher => { set.add(teacher.category) })
    } 
    const categories = Array.from(set)

    return (
        <div className="home">
            <div>
                <input id="searchbar" type="text" placeholder="Search.."></input>
            </div>

            {categories.map(cat => (
                <div key={cat} id={cat}>
                    <h2>{cat}</h2>
                    <div className="container">
                    {teachers && teachers
                    .filter(teacher => teacher.category == cat)
                    .map(teacher => (
                        <div key={teacher._id} className="teacherProfile">
                            <img src={teacher.img_url} alt="image"/>
                            <p className="teacherName">{teacher.name}</p>
                            <p className="teacherPosition">{teacher.role}</p>
                        </div>
                    ))}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Home