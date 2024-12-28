import { useEffect, useState } from "react"
import "./Home.css"

const Home = () => {
    const [teachers, get_all_teachers] = useState(null)
    useEffect(() => {
        const fetchTeachers = async () => {
            const response = await fetch("/api/teachers/")
            const content = await response.json();

            if (response.ok) {
                get_all_teachers(content)
            }
        }
       
        fetchTeachers()
    }, [])

    const set = new Set()
    teachers.forEach(teacher => { set.add(teacher.category) })
    const categories = Array.from(set)

    return (
        <div className="home">
            <div className="searchbar">
                <input type="text" placeholder="Search.."></input>
            </div>

            {categories.map(cat => (
                <div key={cat}>
                    <h2 id={cat}>{cat}</h2>
                    {teachers && teachers
                    .filter(teacher => teacher.category == cat)
                    .map(teacher => (
                        <div key={teacher.name} className="teacherProfile"><p className="teacherName">{teacher.name}</p><br/><p className="teacherPosition">{teacher.role}</p></div>
                    ))}
                </div>
            ))}

        </div>
    )
}

export default Home