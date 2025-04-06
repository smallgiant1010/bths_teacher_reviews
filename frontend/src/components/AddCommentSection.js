import { useState } from "react";

const AddCommentSection = (props) => {
    const [difficultyRating, setDifficultyRating] = useState(0);
    const [workloadRating, setWorkloadRating] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleStarClick = (ratingType, value) => {
        if (ratingType === "difficulty") {
            setDifficultyRating(value);
        } else if (ratingType === "workload") {
            setWorkloadRating(value);
        }
    };

    const handlePostReview = async () => {
        if (!props.loggedIn) {
            setError("You must be logged in to post a review!");
            return;
        }

        // Ensure both ratings and the comment are provided
        if (difficultyRating === 0 || workloadRating === 0 || comment.trim() === "") {
            setError("Difficulty, workload, and a comment are required to submit a review.");
            return;
        }

        const currentYear = new Date().getFullYear(); // Current year
        const previousYear = currentYear - 1; // Previous year

        const reviewData = {
            userid: props.userId, // Current logged-in user's ID
            courseName: props.selectedTeacher.name,
            years: `${previousYear}-${currentYear}`,
            teacherName: props.selectedTeacher.name,
            experience: comment.trim(),
            difficulty: difficultyRating,
            workload: workloadRating,
        };

        try {
            const response = await fetch(`http://localhost:5000/teachers/${props.selectedTeacher._id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                setDifficultyRating(0);
                setWorkloadRating(0);
                setComment("");
                setError("");
                setSuccessMessage("Review submitted successfully!");
            } else {
                const err = await response.json();
                throw new Error(err.error || "Failed to submit review");
            }
        } catch (err) {
            setError("An error occurred while submitting the review.");
        }
    };

    const renderStars = (ratingType, currentValue) => {
        return Array.from({ length: 10 }, (_, index) => (
            <i
                key={index}
                className={`fa ${index + 1 <= currentValue ? "fa-star" : "fa-star-o"}`}
                style={{ color: "orange", cursor: "pointer" }}
                onClick={() => handleStarClick(ratingType, index + 1)}
            ></i>
        ));
    };

    return (
        <div className="add-comment-section">
            <h3>Rate & Review</h3>
            <div className="rating-group">
                <label>Difficulty:</label>
                <div className="stars">{renderStars("difficulty", difficultyRating)}</div>
            </div>
            <div className="rating-group">
                <label>Workload:</label>
                <div className="stars">{renderStars("workload", workloadRating)}</div>
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                rows="4"
                cols="50"
            />
            <button onClick={handlePostReview}>Post Review</button>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default AddCommentSection;