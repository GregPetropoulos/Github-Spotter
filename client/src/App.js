import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import Navbar from './components/layouts/Navbar';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          {/* <Routes> */}
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
              Content
            </main>
            <Footer />
          </div>

          {/* </Routes> */}
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
