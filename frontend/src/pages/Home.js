import { useState, memo } from "react"
import "../css/Home.css"
import withAuth from "../components/withAuth"
import { useTeachersContext } from "../hooks/useTeachersContext"
import { Title, Link } from "react-head"

const AddCommentSection = (props) => {
    return <button>Add Comment: {props.loggedIn}</button>
};

const EnhancedCommentSection = withAuth(AddCommentSection)

const Home = () => {
    const { teachers } = useTeachersContext()
    const [searchValue, setSearchValue] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTeacher, setSelectedTeacher] = useState(null)

    const categories = teachers ? Array.from(new Set(teachers.map(teacher => teacher.category))) : []

    return (
        <>
            <Title>Dashboard</Title>
            <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className="home">
                {selectedTeacher ? (
                    
                    <div className="teacher-details">
                        <button className="back-button" onClick={() => setSelectedTeacher(null)}>← &nbsp;Back</button>
                        <img src={selectedTeacher.img_url} alt="Teacher profile" />
                        <div className="teacher-info">
                            <h2>{selectedTeacher.name}</h2>
                            <p className="role">{selectedTeacher.role}</p>

                            <div className="rating">Difficulty</div>
                                <div class="stars">
                                {Array.from({ length: 10 }, (_, index) => (
                                    <i
                                        key={index}
                                        className={
                                            index + 1 <= Math.floor(selectedTeacher.difficulty)
                                                ? "fa fa-star"
                                                : index < selectedTeacher.difficulty
                                                ? "fa fa-star-half-o"
                                                : "fa fa-star-o"
                                        }
                                    ></i>
                                ))}
                                </div>
                            <div className="rating">Workload</div>
                                <div class="stars">
                                {Array.from({ length: 10 }, (_, index) => (
                                    <i
                                        key={index}
                                        className={
                                            index + 1 <= Math.floor(selectedTeacher.workload)
                                                ? "fa fa-star"
                                                : index < selectedTeacher.workload
                                                ? "fa fa-star-half-o"
                                                : "fa fa-star-o"
                                        }
                                    ></i>
                                ))}
                                </div>
                        </div>
                        <EnhancedCommentSection />
                        <div className="comments">
                            <p>Comments section</p>
                        </div>
                    </div>

                ) : (
                    <>
                        <div id="searchbar-container">
                            <button className="undo-search-button" onClick={ () => {
                                    setSearchValue("")
                                    setSearchTerm("")
                                }
                            }>
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
                                <button className="search-button" onClick={() => setSearchTerm(searchValue)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges"></path>
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
                                                <img src={teacher.img_url} alt={`Image of ${teacher.img_url}`}/>
                                                <p className="teacherName">{teacher.name}</p>
                                                <p className="teacherPosition">{teacher.role}</p>

                                                <p className="rating">Difficulty: {teacher.difficulty}/10</p>
                                                <p className="rating">Workload: {teacher.workload}/10</p>

                                                <button className="view-details-button" onClick={() => setSelectedTeacher(teacher)}>
                                                    View Details
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default memo(Home)
