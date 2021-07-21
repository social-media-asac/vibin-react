// import logo from './logo.svg';
// import './App.css';
import Main from '../src/component/main/main'
import LoginProvider from './context/authContext';
function App() {
  return (

<LoginProvider>
     <Main/>

    </LoginProvider>
  );
}

export default App;
