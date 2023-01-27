export const routes = {
  login: "emailLogin",
  signup: "exchangeAccount",
  verification: "verification",
  forgotPassword: "forgot-password",
  resetPassword: "reset-password",

  trade: "trade",
  instantTrade: "instant-trade",
  byteTraders: "byte-traders",

  help: "/",
  settings: "settings",
  notification: "/",

  orders: {
    index: "orders",
    open: "open",
    history: "history",
    tradeHistory: "trade-history",
    instaTrade: "insta-trade",
  },
  wallet: {
    index: "wallet",
    deposits: "deposits",
    withdrawals: "withdrawals",
    addressBook: "address-book",
    banks: "banks",
  },
  account: {
    index: "account",
    verification: "verification",
    security: "security",
    ipWhitelisting: "ip-whitelisting",
    myReferrals: "my-referrals",
    apiKeys: "api-keys",
    exchangeToken: "exchange-token",
    volumeDiscount: "volume-discount",
  },
};

const r = routes;
export const links = {
  login: "/" + r.login,
  signup: "/" + r.signup,
  verification: "/" + r.verification,
  forgotPassword: "/" + r.forgotPassword,
  resetPassword: "/" + r.resetPassword,

  trade: (pair) => "/trade/" + pair,
  defaultTradeLink: "/trade/BTC-USDT",
  instantTrade: "/" + r.instantTrade,
  byteTraders: "/" + r.byteTraders,

  help: "/" + r.help,
  settings: "/" + r.settings,
  notification: "/" + r.notification,

  orders: "/" + r.orders.index,
  openOrders: "/" + r.orders.index + "/" + r.orders.open,
  ordersHistory: "/" + r.orders.index + "/" + r.orders.history,
  tradeHistory: "/" + r.orders.index + "/" + r.orders.tradeHistory,
  instaTrade: "/" + r.orders.index + "/" + r.orders.instaTrade,

  wallet: "/" + r.wallet.index,
  deposits: "/" + r.wallet.index + "/" + r.wallet.deposits,
  withdrawals: "/" + r.wallet.index + "/" + r.wallet.withdrawals,
  addressBook: "/" + r.wallet.index + "/" + r.wallet.addressBook,
  banks: "/" + r.wallet.index + "/" + r.wallet.banks,

  account: "/" + r.account.index,
  accountVerification: "/" + r.account.index + "/" + r.account.verification,
  accountSecurity: "/" + r.account.index + "/" + r.account.security,
  ipWhitelisting: "/" + r.account.index + "/" + r.account.ipWhitelisting,
  myReferrals: "/" + r.account.index + "/" + r.account.myReferrals,
  apiKeys: "/" + r.account.index + "/" + r.account.apiKeys,
  exchangeToken: "/" + r.account.index + "/" + r.account.exchangeToken,
  volumeDiscount: "/" + r.account.index + "/" + r.account.volumeDiscount,
};
