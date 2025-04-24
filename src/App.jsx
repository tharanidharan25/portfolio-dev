import Layout from './components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { updateWindowWidth } from './redux/slices/appSlice';
import { updateCurrentTab } from './redux/slices/navSlice';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();
  const navBarTabContent = document.getElementById("navBarTabContent");
  const isMobile = useSelector(state => state.app.isMobile);

  window.onresize = () => {
    if (window.innerWidth < 1024) {
      dispatch(updateCurrentTab(null))
      if (isMobile) {
        navBarTabContent.close()
      }
    }
    dispatch(updateWindowWidth(window.innerWidth));
  }

  useEffect(() => {
    if (window.innerWidth < 1024) {
      dispatch(updateCurrentTab(null))
    } else {
      dispatch(updateCurrentTab('files'))
    }
  }, [])

  return (
    <>
      <Layout />
    </>
  )
}

export default App
