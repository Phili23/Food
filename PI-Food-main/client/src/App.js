import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LadingPage from './components/LadingPage/index.jsx'
import Home from './components/Home/index.jsx';
import PostRecipes from './components/PostRecipes';
import Detail from './components/Detail';


function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={LadingPage}/> 
        <Route path='/home' component={Home}/>
      <Route path='/create' component={PostRecipes}/> 
     {/*     <Route path='/delete' component={DeleteDog}/>  */}
        
     <Route path='/home:id' component={Detail}/> 
      </div>
    
      </BrowserRouter>
  );
}

export default App;