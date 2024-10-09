/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const {
    StaleWhileRevalidate,
    NetworkFirst,
    NetworkOnly
} = workbox.strategies;

const { BackgroundSyncPlugin } = workbox.backgroundSync;

const cacheFirstUrls = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js',
    'http://www.w3.org/2000/svg'
];

const cacheNetworkFirstUrls = [
    '/index',
    '/home',
    '/role',
    '/status',
    '/charge',
    '/user',
    '/client',
    '/project',
    '/task',
];

const apiBaseUrl = 'http://localhost:3340/backend/dev/api/v1';
const bgSyncPlugin = new BackgroundSyncPlugin('post-offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

const registerStaleWhileRevalidateRoute = (urlPattern) => {
    registerRoute(new RegExp(urlPattern), new StaleWhileRevalidate());
};

const registerNetworkOnlyRoute = (urlPattern, method = 'POST') => {
    registerRoute(new RegExp(urlPattern), new NetworkOnly({ plugins: [bgSyncPlugin] }), method);
};

// Cache First Strategy
registerRoute(
    ({url}) => cacheFirstUrls.includes(url.href),
    new StaleWhileRevalidate()
);

// Network First Strategy
registerRoute(
    ({url}) => cacheNetworkFirstUrls.includes(url.pathname),
    new NetworkFirst()
);

// API Routes
const apiEndpoints = [
    { endpoint: '/get-role-all', strategy: 'StaleWhileRevalidate' },
    { endpoint: '/post-withouttoken-role', strategy: 'NetworkOnly', method: 'POST' },
    { endpoint: '/put-role', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/delete-role', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/get-status-all', strategy: 'StaleWhileRevalidate' },
    { endpoint: '/post-status', strategy: 'NetworkOnly', method: 'POST' },
    { endpoint: '/put-status', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/delete-status', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/get-charge-all', strategy: 'StaleWhileRevalidate' },
    { endpoint: '/post-charge', strategy: 'NetworkOnly', method: 'POST' },
    { endpoint: '/put-charge', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/delete-charge', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/get-user-all', strategy: 'StaleWhileRevalidate' },
    { endpoint: '/post-user', strategy: 'NetworkOnly', method: 'POST' },
    { endpoint: '/put-user', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/delete-user', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/get-client-all', strategy: 'StaleWhileRevalidate' },
    { endpoint: '/post-client', strategy: 'NetworkOnly', method: 'POST' },
    { endpoint: '/put-client', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/delete-client', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/get-project-all', strategy: 'StaleWhileRevalidate' },
    { endpoint: '/post-project', strategy: 'NetworkOnly', method: 'POST' },
    { endpoint: '/put-project', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/delete-project', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/get-task-all', strategy: 'StaleWhileRevalidate' },
    { endpoint: '/post-task', strategy: 'NetworkOnly', method: 'POST' },
    { endpoint: '/put-task', strategy: 'NetworkOnly', method: 'PUT' },
    { endpoint: '/delete-task', strategy: 'NetworkOnly', method: 'PUT' },
];

apiEndpoints.forEach(({ endpoint, strategy, method }) => {
    const urlPattern = `${apiBaseUrl}${endpoint}`;
    if (strategy === 'StaleWhileRevalidate') {
        registerStaleWhileRevalidateRoute(urlPattern);
    } else if (strategy === 'NetworkOnly') {
        registerNetworkOnlyRoute(urlPattern, method);
    }
});