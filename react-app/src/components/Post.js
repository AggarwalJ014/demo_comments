import Header from "../Header";


const Post = ({ post, history }) => {

    const handleClick = () => {
        history.push(`/post/${post.id}`)
    }


    return (
            <tr className="row m-0" style={{ cursor: 'pointer' }} onClick={handleClick} ><td className="col-md-12">{post.title}</td></tr>
    )
}

export default Post
