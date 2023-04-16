import { Navigate, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Conversation from './pages/Conversation';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="conversation" element={<Conversation />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};

export default AppRouter;
