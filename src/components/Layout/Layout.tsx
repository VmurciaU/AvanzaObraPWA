import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';

interface NavbarProps {
  children: React.ReactNode;
}
  

const Layout: React.FC<NavbarProps> = ({children}) => {
    // Create a client
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex h-screen overflow-y-hidden bg-white">
        
                <Sidebar />

                <div className="flex flex-col flex-1 h-full overflow-hidden">
                    <Navbar />

                    {/* Main content */}
                    <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
                        {children}
                    </main>

                    <Footer />
                </div>
            </div>
        </QueryClientProvider>
    );
}
    

export default Layout;
