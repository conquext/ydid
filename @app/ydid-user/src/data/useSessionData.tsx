import { useAppContext } from '../context/AppContext';

export default function useSessionData() {
  const { state } = useAppContext();

  //   const handleLogin = () => {
  //     // Simulate a login action
  //     const user = { id: 1, username: 'example', email: 'example@example.com' };
  //     dispatch({ type: 'LOGIN', user });
  //   };

  //   const handleLogout = () => {
  //     // Simulate a logout action
  //     dispatch({ type: 'LOGOUT' });
  //   };

  return {
    data: state.didSession,
  };
}
