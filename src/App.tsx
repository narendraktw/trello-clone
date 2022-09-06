import { AppProvider } from './context/AppProvider';
import Header from './components/Header';
import Board from './components/Board';
import './App.css';

function App() {
	return (
		<AppProvider>
			<Header />
			<Board />
		</AppProvider>
	);
}

export default App;
