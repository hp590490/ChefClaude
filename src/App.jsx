import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
function App() {
  console.log(import.meta.env.VITE_OPENAI_API_KEY);
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
