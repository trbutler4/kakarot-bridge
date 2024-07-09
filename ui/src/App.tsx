import { Bridge, Header } from "./components";

function App() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex justify-center items-center">
        <Bridge />
      </div>
    </div>
  );
}

export default App;
