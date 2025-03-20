import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout';
import Home from './pages/Home';
import SingleDegree from './pages/degrees/SingleDegree';
import AllDegrees from './pages/degrees/AllDegrees';
import CreateDegree from './pages/degrees/CreateDegree';

import SingleCohort from './pages/cohorts/SingleCohort'

import SingleStudent from './pages/students/SingleStudent'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/degrees/all" element={<AllDegrees />} />
          <Route path="/degrees/:code" element={<SingleDegree />} />
          <Route path="/degrees/create" element={<CreateDegree />} />

          <Route path="/cohorts/:id" element={<SingleCohort />} />

          <Route path="/students/:id" element={<SingleStudent />} />
          {/* <Route path="/cohorts/all" element={<AllCohorts />} />
          <Route path="/cohorts/create" element={<CreateCohort />} />
          <Route path="/modules/all" element={<AllModules />} />
          <Route path="/modules/:code" element={<Module />} />
          <Route path="/modules/:delivered_to" element={<Module />} />
          <Route path="/modules/create" element={<CreateModule />} />
          
          <Route path="/students/create" element={<CreateStudent />} />
          <Route path="/students/:id/module/:code" element={<SetStudentModuleGrade />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
