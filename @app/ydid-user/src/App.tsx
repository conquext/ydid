import SplitPane from 'react-split-pane';
import './App.css';
import LeftScreen from './screens/LeftScreen';
import RightScreen from './screens/RightScreen';
import viteLogo from '/vite.svg';

import {
  Box,
  ChakraBaseProvider,
  HStack,
  extendBaseTheme,
} from '@chakra-ui/react';
import { AppProvider } from './context/AppContext';
import { NormalizeStyles } from './styles/base';

const theme = extendBaseTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
      },
    },
  },
});

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <NormalizeStyles />

      <AppProvider>
        <Box minH={'100vh'}>
          <Box w="100%" mb="1rem">
            <TopNav />
          </Box>

          <SplitPane split="vertical" minSize={50} defaultSize="50%">
            {/* <Box p="20px" bg="#e0e0e0" h="100%"> */}
            <Box p="20px" bg="#ffddca" h="100%">
              <LeftScreen></LeftScreen>
            </Box>
            <Box p="20px" bg="#f0f0f0" h="100%">
              <RightScreen></RightScreen>
            </Box>
          </SplitPane>

          <HStack></HStack>
        </Box>
      </AppProvider>
    </ChakraBaseProvider>
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
      <Box
        as="p"
        fontSize={{ sm: '0.75rem', md: '1rem', lg: '0.85rem' }}
        fontWeight={{ sm: '700rem', md: '600rem', lg: '500rem' }}
      >
        yDiD, Your Decentralized identity Manager
      </Box>
      <div className="card"></div>
    </HStack>
  );
};

export default App;
