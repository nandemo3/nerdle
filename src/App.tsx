import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { checkEquation } from "./common/functions";

import Home from "./views/pages/Home";

function App() {
  const CORRECT_ANSWER = process.env.REACT_APP_CORRECT_ANSWER;

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!CORRECT_ANSWER) {
      alert(
        "Environment variable doesn't exist. Please set environment variables."
      );
    } else if (!checkEquation(CORRECT_ANSWER)) {
      alert(
        "Environment variable isn't correct equation. Please set correct one."
      );
    } else {
      setShow(true);
    }
  }, [CORRECT_ANSWER]);

  return (
    <RecoilRoot>{show && <Home correctAnswer={CORRECT_ANSWER!} />}</RecoilRoot>
  );
}

export default App;
