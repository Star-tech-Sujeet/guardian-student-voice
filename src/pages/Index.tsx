import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportSubmission } from '@/components/ReportSubmission';
import { AdminDashboard } from '@/components/AdminDashboard';
import { AdminLogin } from '@/components/AdminLogin';

const Index = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="min-h-screen">
      <Tabs defaultValue="report" className="w-full">
        <TabsList className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm shadow-[var(--shadow-soft)]">
          <TabsTrigger value="report">Submit Report</TabsTrigger>
          <TabsTrigger value="admin">Admin Portal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="report" className="mt-0">
          <ReportSubmission />
        </TabsContent>
        
        <TabsContent value="admin" className="mt-0">
          {isAdminLoggedIn ? (
            <div>
              <div className="fixed top-4 right-4 z-50">
                <button
                  onClick={handleAdminLogout}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm hover:bg-destructive/90"
                >
                  Logout
                </button>
              </div>
              <AdminDashboard />
            </div>
          ) : (
            <AdminLogin onLogin={handleAdminLogin} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
