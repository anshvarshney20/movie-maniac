import { PaperProvider } from 'react-native-paper';
import Route from './src/Routes/Route';

export default function App() {
  return (
    <PaperProvider>
    <Route/>
    </PaperProvider>
  );
}

