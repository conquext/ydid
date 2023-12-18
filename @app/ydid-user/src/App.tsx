import { Fragment, useState } from 'react';
import SplitPane from 'react-split-pane';
import './App.css';
import reactLogo from './assets/react.svg';
import LeftScreen from './screens/LeftScreen';
import RightScreen from './screens/RightScreen';
import viteLogo from '/vite.svg';

import { ChakraBaseProvider, HStack, extendBaseTheme } from '@chakra-ui/react';

const theme = extendBaseTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
      },
    },
  },
});

const newLayout = 2 + 2 === 4;

function App() {
  const [count, setCount] = useState(0);

  if (newLayout) {
    return (
      <ChakraBaseProvider theme={theme}>
        <Fragment>
          <TopNav />

          <SplitPane split="vertical" minSize={50} defaultSize="50%">
            <div style={{ backgroundColor: '#e0e0e0', padding: '20px' }}>
              {/* Content for the left pane */}
              <LeftScreen></LeftScreen>
            </div>
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
              {/* Content for the right pane */}
              <RightScreen></RightScreen>
            </div>
          </SplitPane>

          <HStack></HStack>
        </Fragment>
      </ChakraBaseProvider>
    );
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Your, yDiD Instance</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

const TopNav = () => {
  return (
    <HStack alignItems={'center'} justifyContent={'center'}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>yDiD, Your Decentralized identity Manager</h1>
      <div className="card"></div>
    </HStack>
  );
};

export default App;
