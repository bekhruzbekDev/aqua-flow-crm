import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppLayout } from '@/app/layout/AppLayout';
import DashboardPage from '@/pages/Dashboard';
import ClientListPage from '@/pages/ClientList';
import OrdersPage from '@/pages/Orders';
import LeadsPage from '@/pages/Leads';
import EmployeesPage from '@/pages/Employees';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/clients" element={<ClientListPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;