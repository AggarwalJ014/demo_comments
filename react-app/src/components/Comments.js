import axios from "axios";
import { useEffect, useState } from "react"
import Header from "../Header";

const DetailedPost = (props) => {
    const [comments, setComments] = useState([]);
    const [errors, setError] = useState('');

    useEffect(() => {
        const id = props.match.params.id;
        const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
        axios.get(url)
            .then(res => {
                setComments(res.data);
            }).catch((err) => {
                setError(err.message);
            })
    }, []);

    return (
        <div className="container-sm ">
            <Header {...props} title={"Comments"} />
            {errors ? <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">ERROR !!</strong>
                </div>
                <div class="toast-body">
                    {errors}
                </div>
            </div> :
                <>
                    {comments && comments.length > 0 ? comments.map(comment => (
                        <div key={comment.id} className="card">
                            <div className="card-header">
                                {comment.id}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{comment.email}</h5>
                                <p className="card-text">{comment.body}</p>
                            </div>
                        </div>
                    )) :
                    <div className="toast d-block text-center bg-danger m-auto pt-4" role="alert">
                    <div className="toast-header">
                        <strong className="me-auto">NO COMMENTS YET !!</strong>
                    </div>
                    <div className="toast-body">
                        {errors}
                    </div>
                </div> }
                </>
            }
        </div>

    )
}

export default DetailedPost
