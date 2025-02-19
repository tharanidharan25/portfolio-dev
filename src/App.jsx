import Layout from './components/Layout';
import { useDispatch } from 'react-redux';
import { updateWindowWidth } from './redux/slices/appSlice';

function App() {

  const dispatch = useDispatch();
  window.onresize = () => {
    dispatch(updateWindowWidth(window.innerWidth));
  }

  return (
    <>
      <Layout />
    </>
  )
}

export default App
