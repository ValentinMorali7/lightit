import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationProvider } from './providers/NotificationProvider';
import PatientPage from './components/patients/PatientPage/PatientPage';
import './App.css';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <div className="app">
          <PatientPage />
        </div>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;