import { useAppContext } from '../context/AppContext';

export default function useSessionData() {
  const { state, dispatch } = useAppContext();

  const setData = (data: Record<string, any>) => {
    // Simulate a logout action
    dispatch({ type: 'UPDATE_DATA', payload: { didSession: data } });
  };

  return {
    data: state.didSession,
    setData,
  };
}
