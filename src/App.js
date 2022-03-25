import { TournamentProvider } from "./context/TournamentContext";
import RouterConfig from "./router/RouterConfig";

function App() {
  return (
    <div>
      <TournamentProvider>
        <RouterConfig />
      </TournamentProvider>
    </div>
  );
}

export default App;
