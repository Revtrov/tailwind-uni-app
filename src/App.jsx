import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect,useState } from 'react';
import Layout from './pages/Layout';
import Home from './pages/Home';
import DegreeInfo from './pages/degrees/Degree';
import AllDegrees from './pages/degrees/AllDegrees';
import CreateDegree from './pages/degrees/CreateDegree';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/degrees/all" element={<AllDegrees />} />
          <Route path="/degrees/:code" element={<DegreeInfo />} />
          <Route path="/degrees/create" element={<CreateDegree />} />
          {/* <Route path="/cohorts/all" element={<AllCohorts />} />
          <Route path="/cohorts/:year" element={<Cohort />} />
          <Route path="/cohorts/create" element={<CreateCohort />} />
          <Route path="/modules/all" element={<AllModules />} />
          <Route path="/modules/:code" element={<Module />} />
          <Route path="/modules/:delivered_to" element={<Module />} />
          <Route path="/modules/create" element={<CreateModule />} />
          <Route path="/students/:id" element={<Student />} />
          <Route path="/students/create" element={<CreateStudent />} />
          <Route path="/students/:id/module/:code" element={<SetStudentModuleGrade />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
