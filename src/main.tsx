
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handler
const handleGlobalError = (event: ErrorEvent) => {
  console.error('Unhandled error:', event.error);
  // You could send error reports to a monitoring service here
};

// Unhandled promise rejection handler
const handlePromiseRejection = (event: PromiseRejectionEvent) => {
  console.error('Unhandled promise rejection:', event.reason);
  // You could send error reports to a monitoring service here
};

// Add global error listeners
window.addEventListener('error', handleGlobalError);
window.addEventListener('unhandledrejection', handlePromiseRejection);

// Initialize the app with error boundary
try {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
} catch (error) {
  console.error('Failed to render application:', error);
  // Display a fallback UI if the app fails to load
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: system-ui, sans-serif;">
        <h1 style="color: #0F3460; margin-bottom: 1rem;">Something went wrong</h1>
        <p style="color: #666; text-align: center; max-width: 400px;">We're having trouble loading the application. Please try refreshing the page.</p>
        <button 
          style="margin-top: 2rem; background: #0F3460; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.25rem; cursor: pointer;"
          onclick="window.location.reload()"
        >
          Refresh Page
        </button>
      </div>
    `;
  }
}
