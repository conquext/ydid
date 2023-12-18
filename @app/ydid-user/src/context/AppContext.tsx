import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';

type R = Record<string, any>;

// Step 1: Define the types
interface AppState {
  data: string | null;
  didSession: R;
}

type AppAction = { type: 'UPDATE_DATA'; payload: string };

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

// Step 1: Create the Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Step 2: Create the Reducer
const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

// Step 3: Create the Context Provider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const initialState: AppState = {
    data: null,
    didSession: {
      connected: false,
      did: '',
      connections: [] as string[],
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Step 4: Create a custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
