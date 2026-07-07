/*
 * iSmartPay portfolio demo bootstrap.
 *
 * This script makes the embedded build run as a self-contained, OFFLINE demo:
 *   1. Seeds a *fake* authenticated session in localStorage (no real token).
 *   2. Intercepts every request to the real backend (*.ismartghana.com) and
 *      returns sanitized sample data, so the real API is never contacted and
 *      no real account is ever exposed.
 *
 * All personal data below is fabricated for demonstration purposes only.
 */
(function () {
  'use strict';

  // --- 1. Fake, structurally-valid JWT (client-side decode only; not signed) ---
  var b64url = function (obj) {
    return btoa(JSON.stringify(obj))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
  var farFuture = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3650; // ~10 years
  var demoSub = '00000000-0000-4000-8000-000000000000';
  var demoJwt =
    b64url({ alg: 'HS256', typ: 'JWT' }) +
    '.' +
    b64url({
      sub: demoSub,
      email: 'demo@ismartpay.app',
      type: 'individual',
      role: 'user',
      verification_level: { level: 1, transactionLimit: 10000 },
      permissions: [],
      jti: 'demo',
      iss: 'auth-service',
      aud: 'api-gateway',
      sessionId: 'demo-session',
      iat: Math.floor(Date.now() / 1000),
      exp: farFuture,
    }) +
    '.demo_signature_not_valid';

  var demoUser = {
    id: demoSub,
    first_name: 'Ama',
    other_name: null,
    last_name: 'Mensah',
    phone: '233200000000',
    email: 'demo@ismartpay.app',
    is_email_verified: true,
    is_phone_verified: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
    customer_code: 'CUS000000',
    status: 'active',
    usertype: 'individual',
    userType: 'individual',
    user_type: 'individual',
    permissions: [],
    preferences: {
      currency: 'GHS',
      language: 'en',
      notification_preference: 'email',
      theme: 'Auto',
      timezone: 'Africa/Accra',
    },
    code: '00',
    message: 'Personal info retrieved',
    data: null,
  };

  var permissions = [
    'dashboard', 'collections', 'settlements', 'disbursements', 'utilities',
    'sms', 'payroll', 'reports', 'settings', 'invoicing', 'business_profile',
    'security', 'team_management', 'api_settings', 'payment_methods', 'checkout',
  ];

  try {
    var seed = {
      isAuthenticated: 'true',
      authToken: demoJwt,
      refreshToken: demoJwt,
      tokenExpiry: String(farFuture * 1000),
      userData: JSON.stringify(
        Object.assign({}, demoUser, { current_token: demoJwt })
      ),
      userPermissions: JSON.stringify(permissions),
      userType: 'individual',
      verificationLevel: '1',
      businessVerificationStatus: JSON.stringify({
        level: 1, tier: 'Tier 1', status: 'unverified',
        transactionLimit: 10000, verificationLevel: 1,
      }),
      i18nextLng: 'en',
      hasSeenHelpTooltip: 'true',
      ismartpay_tour_preferences: JSON.stringify({
        enabled: false, completedTours: [], dismissedTours: [],
      }),
    };
    Object.keys(seed).forEach(function (k) {
      localStorage.setItem(k, seed[k]);
    });
  } catch (e) { /* ignore */ }

  // --- 2. Sanitized sample responses (fabricated data) ---
  var ok = function (data, message) {
    return {
      code: '00',
      message: message || 'Success',
      data: data,
      timestamp: new Date().toISOString(),
    };
  };

  var dashboardMetrics = ok(
    {
      wallet_balance: 18450.75,
      available_balance: 18450.75,
      pending_balance: 320.0,
      wallet_currency: 'GHS',
      total_disbursement: '12840',
      total_collection: '31275.5',
      net_cash_flow: 18435.5,
      monthly_data: [
        { month: 'February', inflow: '4200', outflow: '1800' },
        { month: 'March', inflow: '6120', outflow: '2450' },
        { month: 'April', inflow: '7380', outflow: '3110' },
        { month: 'May', inflow: '8950', outflow: '2640' },
        { month: 'June', inflow: '9625.5', outflow: '2840' },
      ],
      transactions: [
        { reference: 'TNX-90014521', description: 'Received GHS 1,250.00 from Kwame Asante', service_type: 'collection', amount: '1250', status: 'SUCCESS', date: '2026-06-28T14:13:01.928Z', source: 'dashboard' },
        { reference: 'TNX-90014498', description: 'Payroll run — 12 staff', service_type: 'disbursement', amount: '4820', status: 'SUCCESS', date: '2026-06-27T09:02:11.000Z', source: 'dashboard' },
        { reference: 'TNX-90014455', description: 'Received GHS 640.00 from Esi Danso', service_type: 'collection', amount: '640', status: 'SUCCESS', date: '2026-06-25T16:41:20.000Z', source: 'dashboard' },
        { reference: 'AIR1779014001', description: 'MTN Airtime purchase', service_type: 'airtime', amount: '50', status: 'SUCCESS', date: '2026-06-24T11:33:41.766Z', source: 'dashboard' },
        { reference: 'TNX-90014390', description: 'Sent GHS 900.00 to Kofi Boateng', service_type: 'disbursement', amount: '900', status: 'SUCCESS', date: '2026-06-22T10:14:28.049Z', source: 'dashboard' },
        { reference: 'ECG1779010021', description: 'ECG electricity bill', service_type: 'electricity', amount: '210', status: 'SUCCESS', date: '2026-06-20T08:14:16.127Z', source: 'dashboard' },
        { reference: 'TNX-90014301', description: 'Received GHS 2,100.00 from Yaa Owusu', service_type: 'collection', amount: '2100', status: 'SUCCESS', date: '2026-06-18T17:18:22.196Z', source: 'dashboard' },
        { reference: 'TNX-90014277', description: 'Wallet top-up', service_type: 'collection', amount: '5000', status: 'SUCCESS', date: '2026-06-15T10:25:29.039Z', source: 'dashboard' },
      ],
    },
    'Dashboard metrics retrieved'
  );

  var mkCollection = function (id, ref, amount, status, narration, name, number, provider, date) {
    return {
      id: id, customer_reference_id: ref, channel: 'MOBILE_MONEY', amount: String(amount),
      currency: 'GHS', status: status, narration: narration, created_at: date,
      destination_name: name, destination_number: number, destination_email: 'demo@ismartpay.app',
      provider_name: provider, service: provider, description: narration,
    };
  };
  var collections = ok({
    data: [
      mkCollection('c1', 'TNX-90014521', 1250, 'SUCCESS', 'Received GHS1,250.00 from Kwame Asante', 'Kwame Asante', '233200000022', 'iSmartPay', '2026-06-28T14:13:01.928Z'),
      mkCollection('c2', 'TNX-90014455', 640, 'success', 'Wallet top-up', 'Esi Danso', '233200000055', 'MTN Mobile Money', '2026-06-25T16:41:20.000Z'),
      mkCollection('c3', 'TNX-90014301', 2100, 'success', 'Invoice payment', 'Yaa Owusu', '233200000044', 'Telecel Cash', '2026-06-18T17:18:22.000Z'),
      mkCollection('c4', 'TNX-90014277', 5000, 'SUCCESS', 'Wallet top-up', 'Ama Mensah', '233200000000', 'MTN Mobile Money', '2026-06-15T10:25:29.000Z'),
      mkCollection('c5', 'TNX-90014120', 480, 'failed', 'Payment attempt', 'Kofi Boateng', '233200000033', 'Telecel Cash', '2026-06-11T09:06:17.000Z'),
    ],
    summary: { totalAmount: 9470, totalTransactions: 5 },
    pagination: { page: 1, limit: 20, total: 5, totalPages: 1, hasMore: false },
  }, 'Report retrieved successfully');

  var mkDisb = function (ref, channel, amount, status, narration, name, number, date) {
    return {
      reference: ref, channel: channel, amount: String(amount), currency: 'GHS', status: status,
      narration: narration, created_at: date, provider_name: 'iSmartPay',
      destination_name: name, destination_number: number, service: 'disbursement', description: narration,
    };
  };
  var disbursements = ok({
    data: [
      mkDisb('DSB-90014498', 'WALLET', 4820, 'SUCCESS', 'Payroll run — 12 staff', 'Payroll Batch #48', '—', '2026-06-27T09:02:11.000Z'),
      mkDisb('DSB-90014390', 'MOBILE_MONEY', 900, 'SUCCESS', 'Vendor payment', 'Kofi Boateng', '233200000033', '2026-06-22T10:14:28.000Z'),
      mkDisb('DSB-90014210', 'BANK', 3200, 'SUCCESS', 'Supplier settlement', 'Accra Supplies Ltd', '013-xxxx-88', '2026-06-16T13:40:00.000Z'),
      mkDisb('DSB-90014105', 'MOBILE_MONEY', 350, 'PENDING', 'Refund', 'Yaa Owusu', '233200000044', '2026-06-12T15:36:12.000Z'),
    ],
    summary: { totalAmount: 12840, totalTransactions: 4 },
    pagination: { page: 1, limit: 20, total: 4, totalPages: 1, hasMore: false },
  }, 'Report retrieved successfully');

  var generalTransactions = ok({
    data: [
      { reference: 'TNX-90014521', amount: '1250', currency: 'GHS', channel: 'iSmartPay', provider: 'iSmartPay', status: 'SUCCESS', created_at: '2026-06-28T14:13:01.928Z', service: 'collection', destination_name: 'Kwame Asante', destination_number: '233200000022' },
      { reference: 'DSB-90014498', amount: '4820', currency: 'GHS', channel: 'WALLET', provider: 'iSmartPay', status: 'SUCCESS', created_at: '2026-06-27T09:02:11.000Z', service: 'disbursement', destination_name: 'Payroll Batch #48', destination_number: '—' },
      { reference: 'TNX-90014455', amount: '640', currency: 'GHS', channel: 'MOBILE_MONEY', provider: 'MTN', status: 'success', created_at: '2026-06-25T16:41:20.000Z', service: 'collection', destination_name: 'Esi Danso', destination_number: '233200000055' },
      { reference: 'AIR1779014001', amount: '50', currency: 'GHS', channel: 'iSmartPay', provider: 'MTN', status: 'SUCCESS', created_at: '2026-06-24T11:33:41.766Z', service: 'airtime', destination_name: '233200000000', destination_number: '233200000000' },
      { reference: 'DSB-90014390', amount: '900', currency: 'GHS', channel: 'MOBILE_MONEY', provider: 'TELECEL', status: 'SUCCESS', created_at: '2026-06-22T10:14:28.000Z', service: 'disbursement', destination_name: 'Kofi Boateng', destination_number: '233200000033' },
      { reference: 'ECG1779010021', amount: '210', currency: 'GHS', channel: 'iSmartPay', provider: 'ECG', status: 'SUCCESS', created_at: '2026-06-20T08:14:16.127Z', service: 'electricity', destination_name: 'ECG Meter 0455112', destination_number: '0455112' },
      { reference: 'TNX-90014301', amount: '2100', currency: 'GHS', channel: 'WALLET', provider: 'iSmartPay', status: 'SUCCESS', created_at: '2026-06-18T17:18:22.000Z', service: 'collection', destination_name: 'Yaa Owusu', destination_number: '233200000044' },
      { reference: 'TNX-90014120', amount: '480', currency: 'GHS', channel: 'MOBILE_MONEY', provider: 'TELECEL', status: 'failed', created_at: '2026-06-11T09:06:17.000Z', service: 'collection', destination_name: 'Kofi Boateng', destination_number: '233200000033' },
    ],
    summary: { totalAmount: 10250, totalTransactions: 8 },
    pagination: { page: 1, limit: 20, total: 8, totalPages: 1, hasMore: false },
  }, 'Report retrieved successfully');

  var utilities = ok({
    data: [
      { amount: '210', destination_name: 'ECG Meter 0455112', destination_number: '0455112', created_at: '2026-06-20T08:14:16.127Z', status: 'SUCCESS', reference: 'ECG1779010021', service: 'electricity', provider: 'ECG' },
      { amount: '50', destination_name: '233200000000', destination_number: '233200000000', created_at: '2026-06-24T11:33:41.766Z', status: 'SUCCESS', reference: 'AIR1779014001', service: 'airtime', provider: 'MTN' },
      { amount: '120', destination_name: 'DSTV 7024119', destination_number: '7024119', created_at: '2026-06-10T19:02:00.000Z', status: 'SUCCESS', reference: 'DTV1779002210', service: 'cable tv subscription', provider: 'DSTV' },
    ],
    summary: { totalAmount: 380, totalTransactions: 3 },
    pagination: { page: 1, limit: 20, total: 3, totalPages: 1, hasMore: false },
  }, 'Report retrieved successfully');

  var services = ok([
    { id: 's1', name: 'disbursement', description: 'Handles disbursement of funds to recipients', created_at: '2025-10-16T12:40:55.028Z' },
    { id: 's2', name: 'collection', description: 'Manages collection of payments from customers', created_at: '2025-10-16T12:40:55.028Z' },
    { id: 's3', name: 'settlement', description: 'Handles user settlement payouts via MoMo or bank', created_at: '2025-11-06T03:20:10.193Z' },
    { id: 's4', name: 'airtime', description: 'Airtime top-up service for mobile networks', created_at: '2025-11-06T11:17:03.845Z' },
    { id: 's5', name: 'data bundle', description: 'Internet data bundle purchase service', created_at: '2025-11-06T11:17:03.845Z' },
    { id: 's6', name: 'electricity', description: 'Electricity bill payment service', created_at: '2025-11-06T11:17:03.845Z' },
    { id: 's7', name: 'water', description: 'Water utility bill payment service', created_at: '2025-11-06T11:17:03.845Z' },
    { id: 's8', name: 'cable tv subscription', description: 'Cable TV or decoder subscription payment service', created_at: '2025-11-06T11:17:03.845Z' },
    { id: 's9', name: 'broadband', description: 'Broadband internet service', created_at: '2025-11-18T12:43:26.749Z' },
  ], 'Services retrieved successfully');

  var security = ok({
    id: 'sec-demo', customer_id: demoSub, pin: null, two_fa_enabled: false,
    two_fa_secret: null, created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z', user_id: null,
  }, 'Account security retrieved');

  var emptyReport = ok({
    data: [], summary: { totalAmount: 0, totalTransactions: 0 },
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0, hasMore: false },
  }, 'Report retrieved successfully');

  // Keyed by URL path suffix (query string stripped before matching).
  var ROUTES = [
    ['/get-dashboard-metrics', dashboardMetrics],
    ['/publicauth/get-all-services', services],
    ['/auth/profile/security', security],
    ['/auth/profile/settlement-account', ok([], 'Fetched accounts successfully')],
    ['/get-disbursements', disbursements],
    ['/get-collections', collections],
    ['/get-general-transactions', generalTransactions],
    ['/get-utilities', utilities],
    ['/get-settlements', emptyReport],
    ['/get-payroll', emptyReport],
    ['/get-invoices', emptyReport],
    ['/auth/profile', ok(demoUser, 'Personal info retrieved')],
  ];

  var matchRoute = function (path) {
    for (var i = 0; i < ROUTES.length; i++) {
      if (path.indexOf(ROUTES[i][0]) !== -1) return ROUTES[i][1];
    }
    return null;
  };

  var jsonResponse = function (payload) {
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  // --- 3. Intercept fetch to the real backend ---
  var origFetch = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (url.indexOf('ismartghana.com') !== -1) {
      var path = url.split('?')[0];
      var hit = matchRoute(path);
      if (hit) return Promise.resolve(jsonResponse(hit));
      // Benign default so the UI never errors in demo mode.
      return Promise.resolve(jsonResponse(ok([], 'OK (demo mode)')));
    }
    // Everything else (locales, assets) goes through untouched.
    return origFetch ? origFetch(input, init) : Promise.reject(new Error('fetch unavailable'));
  };
})();
