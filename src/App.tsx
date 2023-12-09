import './styles/app.scss';
import useMockAdapter from "./api/useMockAdapter";
import Clocks from "./components/container/Clocks/Clocks";

function App() {
    useMockAdapter();

    return (
        <Clocks />
    );
}

export default App;
