// import logo from './logo.svg';
// import './App.css';
import Main from '../src/component/main/main'
import LoginProvider from './context/authContext';
import {AuthContextProvider} from './context/authContext2';
function App() {
  return (

<LoginProvider>
  <AuthContextProvider> 

     <Main/>
  </AuthContextProvider>

    </LoginProvider>
  );
}

export default App;
