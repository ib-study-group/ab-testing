import { usePostHog } from "posthog-js/react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog?.capture("click event", { property: "Button has been clicked" });
  };

  const flag = posthog?.getFeatureFlag("ws-experiment");
  posthog?.feature_flags.override({ "ws-experiment": "green-button" });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button flag={flag} onClick={handleClick} />
        <input type="text" placeholder="Type Here" />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

type ButtonProps = {
  flag: string | undefined | boolean;
  onClick: () => void;
};

const Button = ({ onClick, flag }: ButtonProps) => {
  switch (flag) {
    case "control":
      return (
        <button type="button" onClick={onClick}>
          Click Here
        </button>
      );
    case "red-button":
      return (
        <button
          type="button"
          onClick={onClick}
          style={{
            backgroundColor: "red",
          }}
        >
          Click Here
        </button>
      );
    case "green-button":
      return (
        <button
          type="button"
          onClick={onClick}
          style={{
            backgroundColor: "green",
          }}
        >
          Click Here
        </button>
      );

    default:
      return (
        <button type="button" onClick={onClick}>
          Click Here
        </button>
      );
  }
};

export default App;
