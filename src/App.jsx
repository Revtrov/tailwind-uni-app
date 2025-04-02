import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import Layout from './pages/Layout';
import Home from './pages/Home';
import SingleDegree from './pages/degrees/SingleDegree';
import AllDegrees from './pages/degrees/AllDegrees';
import CreateDegree from './pages/degrees/CreateDegree';

import SingleCohort from './pages/cohorts/SingleCohort'
import AllCohorts from './pages/cohorts/AllCohorts';
import CreateCohort from './pages/cohorts/CreateCohort';
import StudentsInCohort from'./pages/cohorts/StudentsInCohort';

import SingleStudent from './pages/students/SingleStudent'
import StudentsInModule from './pages/students/StudentsInModule';
import CreateStudent from './pages/students/CreateStudent';

import AllModules from './pages/modules/AllModules';
import CreateModule from './pages/modules/CreateModule';
import ModulesDeliveredTo from './pages/modules/ModulesDeliveredTo';
import SingleModule from './pages/modules/SingleModule';
import SetStudentGrade from './pages/modules/SetStudentGrade';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/degrees/all" element={<AllDegrees />} />
          <Route path="/degrees/:code" element={<SingleDegree />} />
          <Route path="/degrees/create" element={<CreateDegree />} />

          <Route path="/cohorts/all" element={<AllCohorts />} />
          <Route path="/cohorts/:id" element={<SingleCohort />} />
          <Route path="/cohorts/:id/students" element={<StudentsInCohort />} />
          <Route path="/cohorts/create" element={<CreateCohort />} />

          <Route path="/students/:id" element={<SingleStudent />} />
          <Route path="/students/create" element={<CreateStudent />} />
          

          <Route path="/modules/all" element={<AllModules />} />
          <Route path="/modules/:code" element={<SingleModule />} />
          <Route path="/modules" element={<ModulesDeliveredTo />} />
          <Route path="/modules/create" element={<CreateModule />} />
          <Route path="/modules/:code/students" element={<StudentsInModule />} />
          <Route path="/modules/:code/grades" element={<SetStudentGrade />} />

          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
