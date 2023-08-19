import { Route, Routes } from "react-router-dom";

import { Layout } from "~components/Layout/Layout";
import { useAuth } from "~features/auth/hooks/useAuth";
import { SignIn, SignUp } from "~features/auth/screens";
import { Home, BookingMeeting } from "~features/app/screens";

import { RoutePath } from "~constants";

export function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {isLoggedIn ? (
        <Route element={<Layout />}>
          <Route
            path={RoutePath.BOOKING_MEETING}
            element={<BookingMeeting />}
          />
          <Route path='*' element={<Home />} />
        </Route>
      ) : (
        <>
          <Route path={RoutePath.SIGN_UP} element={<SignUp />} />
          <Route path='*' element={<SignIn />} />
        </>
      )}
    </Routes>
  );
}
