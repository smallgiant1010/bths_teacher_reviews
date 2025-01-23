import withAuth from "../components/withAuth"

const AddCommentSection = (props) => {
    return <button>Add Comment: {props.loggedIn}</button>
}

const EnhancedCommentSection = withAuth(AddCommentSection);

const TeacherDetails = () => { 
    return (<p>
        teacher details
        <EnhancedCommentSection />
        comments
        </p>
    )
}

export default TeacherDetails