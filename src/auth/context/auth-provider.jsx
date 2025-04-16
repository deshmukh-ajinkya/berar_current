import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

import { setSession } from './utils';
import { AuthContext } from './auth-context';
// ----------------------------------------------------------------------
export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(() => {
    const accessToken = sessionStorage.getItem('jwt_access_token');
    const storedUser = sessionStorage.getItem('user');
    if (accessToken && storedUser) {
      setSession(accessToken);
      const user = JSON.parse(storedUser);
      setState({ user: { ...user, accessToken }, loading: false });
    } else {
      setState({ user: null, loading: false });
    }
  }, [setState]);
  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            role: state.user?.role ?? 'admin',
          }
        : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
