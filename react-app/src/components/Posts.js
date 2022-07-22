import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import Header from "../Header";

const Posts = (props) => {
    const [ogPosts, setOgPosts] = useState([]);
    const [ogUsers, setOgUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState([]);

    const pageSize = 10;
    const [pages, setPages] = useState([])
    const [selectedPage, setSelectedPage] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                setOgPosts(res.data)
            })

        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                setOgUsers(res.data)
            })
    }, []);

    useEffect(() => {
        if (ogPosts && ogPosts.length) {
            makePages(ogPosts)
        }
    }, [ogPosts]);

    const makePages = (list) => {
        let size = list.length / pageSize;
        let arr = []
        for (let index = 0; index < size; index++) {
            arr.push(index)
        }
        changePage(0, list)
        setPages(arr)
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const matches = ogPosts.filter(post => post.title.includes(value));
        makePages(matches)
        setPosts(matches)
    }

    const changePage = (page, list = ogPosts) => {
        setSelectedPage(page)
        setPosts(list.slice(page * pageSize, page * pageSize + pageSize))
    }

    const onFilter = ({ id, name }) => {
        setSelectedUser(name)
        let matches = []
        if (id === 0) {
            matches = ogPosts
        } else {
            matches = ogPosts.filter(post => +post.userId === +id);
        }
        makePages(matches)
    }

    return (
        <div>
            <div className="container-lg" >

                <Header {...props} title={"Posts"} />
                <div className="row">
                    <div className="col-9">

                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="inputGroup-sizing-lg">SEARCH</span>
                            <input type="text" value={searchText} placeholder="Search by Title" onChange={handleInputChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                    </div>
                    <div className="col">
                        <div class="btn-group w-100">
                            <button type="button" class="btn btn-outline-secondary btn-lg">{selectedUser || "Filter by user"}</button>
                            <button type="button" class="btn btn-outline-secondary btn-lg dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" onClick={() => onFilter({ id: 0, name: '' })}>All</a></li>
                                {ogUsers && ogUsers.map(us => (
                                    <li><a class="dropdown-item" onClick={() => onFilter(us)}>{us.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <table className="table table-bordered table-hover">
                    <tbody>
                        {posts.map(post => <Post {...props} key={post.id} post={post} />)}
                    </tbody>
                </table>
                <footer>
                    <div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                                {selectedPage !== 0 &&
                                    <li className="page-item">
                                        <a className="page-link" aria-label="Previous" onClick={() => changePage(selectedPage - 1)}>
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                }
                                {pages &&
                                    pages.map((page, idx) => (
                                        <li key={idx} className={`page-item ${page === selectedPage ? 'active' : ''}`}><a className="page-link" onClick={() => changePage(page)}>{page + 1}</a></li>
                                    ))
                                }
                                {selectedPage !== pages.length - 1 &&
                                    <li className="page-item">
                                        <a className="page-link" aria-label="Next" onClick={() => changePage(selectedPage + 1)}>
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </div>
                </footer>
            </div>


        </div>
    )
}

export default Posts
