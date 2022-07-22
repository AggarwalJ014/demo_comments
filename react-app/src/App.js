import Login from "./components/Login";
import Posts from "./components/Posts";
import DetailedPost from "./components/Comments";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" render= {(props)=> (localStorage.getItem("isLoggedIN"))?
          <Posts {...props}/> : <Redirect to='/login' />} />
          <Route path="/login"  render={(props)=> <Login {...props} />} />
          <Route path="/posts"  render={(props)=>(localStorage.getItem("isLoggedIN"))?<Posts {...props} /> : <Login {...props} />} />
          <Route path="/post/:id"  render={(props)=>(localStorage.getItem("isLoggedIN"))?<DetailedPost {...props} /> : <Login {...props} />} />

        </Switch>
      </Router>
    </div>
  )
}

export default App;
