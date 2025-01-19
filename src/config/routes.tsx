// src/config/routes.tsx

import {AuthLayout, MainLayout} from "@/layouts";
import {ProtectedRoute} from "@/shared/components";
import LoginPage from "@/pages/(auth)/LoginPage.tsx";
import SignUpPage from "@/pages/(auth)/SignUpPage.tsx";

export const routes = [
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'signup', element: <SignUpPage /> }
        ]
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {path: 'dashboard', element: <div>Dashboard</div>},
            {path: 'inventory', element: <div>inventory</div>},
            // ... 기타 보호된 라우트들
        ]
    }
];