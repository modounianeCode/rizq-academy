import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Tools from './pages/Tools'
import ZakatCalculator from './pages/ZakatCalculator'
import MudarabahCalculator from './pages/MudarabahCalculator'
import MurabahaCalculator from './pages/MurabahaCalculator'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cours" element={<Courses />} />
          <Route path="/cours/:slug" element={<CourseDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/outils" element={<Tools />} />
          <Route path="/outils/zakat" element={<ZakatCalculator />} />
          <Route path="/outils/mudarabah" element={<MudarabahCalculator />} />
          <Route path="/outils/murabaha" element={<MurabahaCalculator />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}