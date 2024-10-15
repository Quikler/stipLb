import {Lb2} from "./src/components/Lb2.jsx";
import {Lb3} from "./src/components/Lb3.jsx";
import {Lb4} from "./src/components/Lb4.jsx";
import {Lb6} from "./src/components/Lb6.jsx";
import {Lb5} from "./src/components/Lb5.jsx";
import {Lb7} from "./src/components/Lb7.jsx";
import {Lb8} from "./src/components/Lb8.jsx";
import {Lb9} from "./src/components/Lb9.jsx";

const AppRoutes = [
    {
        index: true,
        element: <Lb2 />
    },
    {
        index: '/stipLb',
        element: <Lb2 />
    },
    {
        path: '/stipLb/Lb2',
        element: <Lb2 />
    },
    {
        path: '/stipLb/Lb3',
        element: <Lb3 />
    },
    {
        path: '/stipLb/Lb4',
        element: <Lb4  />
    },
    {
        path: '/stipLb/Lb5',
        element: <Lb5 />
    },
    {
        path: '/stipLb/Lb6',
        element: <Lb6 />
    },
    {
        path: '/stipLb/Lb7',
        element: <Lb7 />
    },
    {
        path: '/stipLb/Lb8',
        element: <Lb8 />
    },
    {
        path: '/stipLb/Lb9',
        element: <Lb9 />
    },
];

export default AppRoutes;