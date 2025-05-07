import React from "react";
import ReactPolling from "react-polling";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <ReactPolling
        url={"https://jsonplaceholder.typicode.com/posts"}
        interval={3000} // in milliseconds(ms)
        retryCount={3} // this is optional
        onSuccess={(resp) => {
          console.log({ resp });
          return true;
        }}
        onFailure={() => console.log("handle failure")} // this is optional
        render={({ startPolling, stopPolling, isPolling }) => {
          if (isPolling) {
            return (
              <div>
                <p>Hello I am polling</p>
                <button onClick={stopPolling}>Stop Polling</button>
              </div>
            );
          } else {
            return (
              <>
                <p>Hello I stopped polling</p>
                <button onClick={startPolling}>Start Polling</button>
              </>
            );
          }
        }}
      />
    </div>
  );
}
