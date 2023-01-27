import React, { lazy, Suspense } from "react";

const MarketTrend = lazy(() => import("./pages/MarketTrend"));
export const DynamicMarketTrend = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MarketTrend />
  </Suspense>
);

const Login = lazy(() => import("./pages/Emaillogin.js"));
export const DynamicLogin = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Login />
  </Suspense>
);

const Verification = lazy(() => import("./pages/Verification"));
export const DynamicVerification = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Verification />
  </Suspense>
);

const ForgotPassword = lazy(() => import("./pages/Forgot"));
export const DynamicForgotPassword = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ForgotPassword />
  </Suspense>
);

const ResetPassword = lazy(() => import("./pages/NewPassword"));
export const DynamicResetPassword = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResetPassword />
  </Suspense>
);

const Signup = lazy(() => import("./pages/ExchangeAccount"));
export const DynamicSignup = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Signup />
  </Suspense>
);

const Trade = lazy(() => import("./pages/Trade"));
export const DynamicTrade = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Trade />
  </Suspense>
);

// const TokenLauncher = lazy(() => import("./pages/TokenLauncher"));
const TokenLauncher = lazy(() => import("./component/ieo/TokenLauncher"));
export const DynamicTokenLauncher = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <TokenLauncher />
  </Suspense>
);

const ByteTraders = lazy(() => import("./pages/ByteTraders"));
export const DynamicByteTraders = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ByteTraders />
  </Suspense>
);

const Orders = lazy(() => import("./pages/orders/Orders"));
export const DynamicOrders = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Orders />
  </Suspense>
);
const OpenOrder = lazy(() => import("./pages/orders/OpenOrder"));
export const DynamicOpenOrder = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <OpenOrder />
  </Suspense>
);
const OrderHistory = lazy(() => import("./pages/orders/OrderHistory"));
export const DynamicOrderHistory = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <OrderHistory />
  </Suspense>
);
const TradeHistory = lazy(() => import("./pages/orders/TradeHistory"));
export const DynamicTradeHistory = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <TradeHistory />
  </Suspense>
);
const InstaTrades = lazy(() => import("./pages/orders/InstaTrades"));
export const DynamicInstaTrades = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <InstaTrades />
  </Suspense>
);

const Accounts = lazy(() => import("./pages/account/Account"));
export const DynamicAccounts = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Accounts />
  </Suspense>
);
const AccountOverview = lazy(() => import("./pages/account/Overview"));
export const DynamicAccountOverview = () => (
  <Suspense fallback={<div></div>}>
    <AccountOverview />
  </Suspense>
);
const AccountVerification = lazy(() =>
  import("./pages/account/AccountVerification")
);
export const DynamicAccountVerification = () => (
  <Suspense fallback={<div></div>}>
    <AccountVerification />
  </Suspense>
);
const Security = lazy(() => import("./pages/account/Security"));
export const DynamicSecurity = () => (
  <Suspense fallback={<div></div>}>
    <Security />
  </Suspense>
);
const Apikeys = lazy(() => import("./pages/account/Apikeys"));
export const DynamicApikeys = () => (
  <Suspense fallback={<div></div>}>
    <Apikeys />
  </Suspense>
);
const ExchangeToken = lazy(() => import("./pages/account/ExchangeToken"));
export const DynamicExchangeToken = () => (
  <Suspense fallback={<div></div>}>
    <ExchangeToken />
  </Suspense>
);
const Referrals = lazy(() => import("./pages/account/Referrals"));
export const DynamicReferrals = () => (
  <Suspense fallback={<div></div>}>
    <Referrals />
  </Suspense>
);
const Volume = lazy(() => import("./pages/account/Volume"));
export const DynamicVolume = () => (
  <Suspense fallback={<div></div>}>
    <Volume />
  </Suspense>
);
const Whitelisting = lazy(() => import("./pages/account/Whitelisting"));
export const DynamicWhitelisting = () => (
  <Suspense fallback={<div></div>}>
    <Whitelisting />
  </Suspense>
);

const Wallets = lazy(() => import("./pages/wallet/Wallet"));
export const DynamicWallets = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Wallets />
  </Suspense>
);
const WalletOverview = lazy(() => import("./pages/wallet/Overview"));
export const DynamicWalletOverview = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <WalletOverview />
  </Suspense>
);
const Deposits = lazy(() => import("./pages/wallet/Deposits"));
export const DynamicDeposits = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Deposits />
  </Suspense>
);
const Withdrawals = lazy(() => import("./pages/wallet/Withdrawals"));
export const DynamicWithdrawals = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Withdrawals />
  </Suspense>
);
const Banks = lazy(() => import("./pages/wallet/Banks"));
export const DynamicBanks = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Banks />
  </Suspense>
);
const AddressBook = lazy(() => import("./pages/wallet/AddressBook"));
export const DynamicAddressBook = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AddressBook />
  </Suspense>
);

const Settings = lazy(() => import("./pages/Settings"));
export const DynamicSettings = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Settings />
  </Suspense>
);
