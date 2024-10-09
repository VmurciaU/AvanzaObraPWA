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

const cacheFirst = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js',
    'http://www.w3.org/2000/svg'
];


registerRoute(
    ({url}) => {
        if ( cacheFirst.includes(url.href) ) return true;
        return false;
    },
    new StaleWhileRevalidate()
);

registerRoute(
    ({url}) => {
        if ( cacheNetworkFirst.includes(url.pathname) ) return true;
        return false;
    },
    new NetworkFirst()
);

const cacheNetworkFirst = [
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


registerRoute(
    ({url}) => {
        if ( cacheNetworkFirst.includes(url.pathname) ) return true;
        return false;
    },
    new NetworkFirst()
);


// post offline data
const bgSyncPlugin = new BackgroundSyncPlugin('post-offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

//Roles
// Get
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/get-role-all'),
    new NetworkFirst()
);


// post
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/post-withouttoken-role'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'POST'
);

// put
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/put-role'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// put delete
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/delete-role'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// Status
// Get
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/get-status-all'),
    new NetworkFirst()
);


// post
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/post-status'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'POST'
);

// put
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/put-status'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// put delete
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/delete-status'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// Charge
// Get
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/get-charge-all'),
    new NetworkFirst()
);


// post
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/post-charge'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'POST'
);

// put
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/put-charge'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// put delete
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/delete-charge'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// User
// Get
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/get-user-all'),
    new NetworkFirst()
);

// post
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/post-user'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'POST'
);

// put
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/put-user'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// put delete
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/delete-user'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

//client
// Get
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/get-client-all'),
    new NetworkFirst()
);


// post
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/post-client'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'POST'
);

// put
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/put-client'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// put delete
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/delete-client'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);


//project
// Get
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/get-project-all'),
    new NetworkFirst()
);


// post
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/post-project'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'POST'
);

// put
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/put-project'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// put delete
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/delete-project'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

//task
// Get
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/get-task-all'),
    new NetworkFirst()
);


// post
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/post-task'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'POST'
);

// put
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/put-task'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);

// put delete
registerRoute(
    new RegExp('http://localhost:3340/backend/dev/api/v1/delete-task'),
    new NetworkOnly({
       plugins: [bgSyncPlugin],
    }),
    'PUT'
);
