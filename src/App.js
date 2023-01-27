import { useEffect } from "react";
import Footer from "./component/Footer";
import Emaillogin from "./pages/Emaillogin.jsOld";
import ExchangeAccount from "./pages/ExchangeAccount";
import Forgot from "./pages/Forgot";
// import Kycverification1 from "./pages/Kycverification1";
// import Kycverification2 from "./pages/Kycverification2";
// import Kycverification3 from "./pages/Kycverification3";
// import Kycverification4 from "./pages/Kycverification4";
// import Kycverification5 from "./pages/Kycverification5";
import NewPassword from "./pages/NewPassword";
import Verification from "./pages/Verification";
import Trade from "./pages/Trade";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./component/Header";
import TopHeader from "./component/TopHeader";
// import NewLogin from "./pages/Emaillogin";
import MarketTrend from "./pages/MarketTrend";
import EmailVerification from "./pages/EmailVerification";
import PhoneVerification from "./pages/PhoneVerification";
import { links, routes } from "./routes.constants";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDarkTheme,
  loadSettingsAsync,
  setDarkTheme,
} from "./store/settingsSlice";
import {
  checkAuthentication,
  selectAuthorized,
  selectLoaded,
} from "./store/authSlice";
import {
  DynamicTrade,
  DynamicTokenLauncher,
  DynamicByteTraders,
  DynamicOrders,
  DynamicAccounts,
  DynamicWallets,
  DynamicSettings,
  DynamicForgotPassword,
  DynamicResetPassword,
  DynamicSignup,
  DynamicVerification,
  DynamicLogin,
  DynamicAccountOverview,
  DynamicWhitelisting,
  DynamicReferrals,
  DynamicApikeys,
  DynamicExchangeToken,
  DynamicVolume,
  DynamicOpenOrder,
  DynamicOrderHistory,
  DynamicInstaTrades,
  DynamicWalletOverview,
  DynamicDeposits,
  DynamicWithdrawals,
  DynamicAddressBook,
  DynamicBanks,
  DynamicSecurity,
  DynamicTradeHistory,
  DynamicAccountVerification,
  DynamicMarketTrend,
} from "./exports";
import { initFetchRates } from "./utils/v2/rates";
import { useTranslation } from "react-i18next";
import useDarkTheme from "./utils/hooks/useDarkTheme";
import { getProfileAsync } from "./store/userSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const _dt = useDarkTheme();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuthentication());
    dispatch(getProfileAsync());
    dispatch(loadSettingsAsync());
    initFetchRates();
  }, []);

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // renewAccessToken();
    } catch (error) {}
  }, [location]);

  return (
    <>
      <ToastContainer />
      <TopHeader />
      <Header />
      <Routes>
        {/* <Route path="/" element={<MarketTrend />} /> */}
        {/* <Route path="/" element={<NewLogin />} /> */}
        <Route path="/" element={<DynamicMarketTrend />} />
        {/* <Route path="/trade/:pair" element={<Trade />} /> */}
        <Route path="/trade/:pair" element={<DynamicTrade />} />
        {/* <Route path="/tokenLauncher" element={<TokenLauncher />} /> */}
        <Route path={routes.instantTrade} element={<DynamicTokenLauncher />} />
        {/* <Route path="/byteTraders" element={<ByteTraders />} /> */}
        <Route path={routes.byteTraders} element={<DynamicByteTraders />} />

        <Route path={routes.login} element={<DynamicLogin />} />
        <Route path={routes.verification} element={<DynamicVerification />} />
        <Route
          path={routes.forgotPassword}
          element={<DynamicForgotPassword />}
        />
        <Route path={routes.resetPassword} element={<DynamicResetPassword />} />
        <Route path={routes.signup} element={<DynamicSignup />} />

        {/* <Route path="/kycverification1" element={<Kycverification1 />} />
        <Route path="/kycverification2" element={<Kycverification2 />} />
        <Route path="/kycverification3" element={<Kycverification3 />} />
        <Route path="/kycverification4" element={<Kycverification4 />} />
        <Route path="/kycverification5" element={<Kycverification5 />} /> */}

        <Route path="/phoneVerification" element={<PhoneVerification />} />
        {/* <Route path="/emailVerification" element={<EmailVerification />} /> */}

        <Route
          path={routes.orders.index}
          element={
            <ProtectedRoute>
              <DynamicOrders />
            </ProtectedRoute>
          }
        >
          <Route index element={<DynamicOpenOrder />} />
          <Route path={routes.orders.open} element={<DynamicOpenOrder />} />
          <Route
            path={routes.orders.history}
            element={<DynamicOrderHistory />}
          />
          <Route
            path={routes.orders.tradeHistory}
            element={<DynamicTradeHistory />}
          />
          <Route
            path={routes.orders.instaTrade}
            element={<DynamicInstaTrades />}
          />
        </Route>

        <Route
          path={routes.account.index}
          element={
            <ProtectedRoute>
              <DynamicAccounts />
            </ProtectedRoute>
          }
        >
          <Route index element={<DynamicAccountOverview />} />
          <Route
            path={routes.account.verification}
            element={<DynamicAccountVerification />}
          />
          <Route path={routes.account.security} element={<DynamicSecurity />} />
          <Route
            path={routes.account.ipWhitelisting}
            element={<DynamicWhitelisting />}
          />
          <Route
            path={routes.account.myReferrals}
            element={<DynamicReferrals />}
          />
          <Route path={routes.account.apiKeys} element={<DynamicApikeys />} />
          <Route
            path={routes.account.exchangeToken}
            element={<DynamicExchangeToken />}
          />
          <Route
            path={routes.account.volumeDiscount}
            element={<DynamicVolume />}
          />
        </Route>

        <Route
          path={routes.wallet.index}
          element={
            <ProtectedRoute>
              <DynamicWallets />
            </ProtectedRoute>
          }
        >
          <Route index element={<DynamicWalletOverview />} />
          <Route path={routes.wallet.deposits} element={<DynamicDeposits />} />
          <Route
            path={routes.wallet.withdrawals}
            element={<DynamicWithdrawals />}
          />
          <Route
            path={routes.wallet.addressBook}
            element={<DynamicAddressBook />}
          />
          <Route path={routes.wallet.banks} element={<DynamicBanks />} />
        </Route>

        <Route path={routes.settings} element={<DynamicSettings />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

function ProtectedRoute({ children }) {
  const loaded = useSelector(selectLoaded);
  const authorized = useSelector(selectAuthorized);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return <Navigate to={links.login} replace />;
  }

  return children;
}
