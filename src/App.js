import "./App.css";
import { useState } from "react";

function App() {
  let btns = [
    { text: ",", id: 1, background: "#b4e1fd" },
    { text: "(", id: 2, background: "#b4e1fd" },
    { text: ")", id: 3, background: "#b4e1fd" },
    { text: "C", id: 4, background: "#b4e1fd" },
    { text: "Ce", id: 5, background: "#b4e1fd" },
    { text: "1", id: 6, background: "#b9e3f1" },
    { text: "2", id: 7, background: "#b9e3f1" },
    { text: "3", id: 8, background: "#b9e3f1" },
    { text: "4", id: 9, background: "#b9e3f1" },
    { text: "5", id: 10, background: "#b9e3f1" },
    { text: "6", id: 11, background: "#bfe5e3" },
    { text: "7", id: 12, background: "#bfe5e3" },
    { text: "8", id: 13, background: "#bfe5e3" },
    { text: "9", id: 14, background: "#bfe5e3" },
    { text: "0", id: 15, background: "#bfe5e3" },
    { text: "+", id: 16, background: "#c2e7da" },
    { text: "-", id: 17, background: "#c2e7da" },
    { text: "×", id: 18, background: "#c2e7da" },
    { text: "÷", id: 19, background: "#c2e7da" },
    { text: "=", id: 20, background: "#00da8e" },
    { text: "x²", id: 21, background: "#c6e9d1" },
    { text: "√", id: 22, background: "#c6e9d1" },
    { text: " \u00B9\u2044\u2093", id: 23, background: "#c6e9d1" },
  ];

  const [inputValue, setInputValue] = useState("0");
  const [bracketScore, setBracketScore] = useState(0);
  const [prevText, setPrevText] = useState("Previous calculation");
  const [inputClass, setInputClass] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  function Header() {
    return <h1 className="title">Calculator App🧮 </h1>;
  }
  function ToogleButton(){
    return(
      <div className="toogle-container">
        <div className="toogle">Tu będzie przycisk</div>
      </div>
    )
  }

  function handleAnimations() {
    setInputClass("color-animation");
    setTimeout(() => {
      setInputClass("");
    }, 300);
  }

  function handleEqualness() {
    setButtonsDisabled(true);

    setTimeout(() => {
      setButtonsDisabled(false);
    }, 300);
  }

  function handleKeyDown(event) {
    if (event.key >= "0" && event.key <= "9") {
      if (
        inputValue === "0" ||
        inputValue === "Infinity" ||
        inputValue === "Error"
      ) {
        setInputValue(event.key);
      } else if (inputValue[inputValue.length - 1] !== ")") {
        setInputValue(inputValue + event.key);
      }
    }
    if (event.key === "+") {
      if (
        (Number(inputValue[inputValue.length - 1]) >= 0 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
        inputValue[inputValue.length - 1] === ")"
      ) {
        setInputValue(inputValue + "+");
      }
    }
    if (event.key === "-") {
      if (inputValue === "0" || inputValue === "Infinity") {
        setInputValue("-");
      } else if (
        (Number(inputValue[inputValue.length - 1]) >= 0 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
        inputValue[inputValue.length - 1] === "(" ||
        inputValue[inputValue.length - 1] === ")"
      ) {
        setInputValue(inputValue + "-");
      }
    }
    if (event.key === "*") {
      if (
        (Number(inputValue[inputValue.length - 1]) >= 0 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
        inputValue[inputValue.length - 1] === ")"
      ) {
        setInputValue(inputValue + "×");
      }
    }
    if (event.code === "Slash") {
      if (
        (Number(inputValue[inputValue.length - 1]) >= 0 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
        inputValue[inputValue.length - 1] === ")"
      ) {
        setInputValue(inputValue + "÷");
      }
    }
    if (event.key === ".") {
      if (
        Number(inputValue[inputValue.length - 1]) >= 0 &&
        Number(inputValue[inputValue.length - 1]) <= 9
      ) {
        setInputValue(inputValue + ".");
      }
    }
    if (event.key === "Enter") {
      const operators = ["+", "-", "×", "÷", "("];
      if (operators.includes(inputValue[inputValue.length - 1])) {
        setInputValue(inputValue);
      } else if (bracketScore === 0) {
        setPrevText(inputValue + "=");
        let newStr = inputValue.replaceAll("×", "*").replaceAll("÷", "/");
        let res = eval(newStr);
        setInputValue(res.toString());
      }
    }

    if (event.code === "Delete") {
      setInputValue("0");
      setPrevText("");
      setBracketScore(0);
    }
    if (event.code === "Backspace") {
      let arr = [...inputValue];
      let pop = arr.pop();
      if (pop === ")") {
        setBracketScore(bracketScore + 1);
      } else if (pop === "(") {
        setBracketScore(bracketScore - 1);
      } else {
        setBracketScore(bracketScore);
      }
      setInputValue(arr.join(""));
      if (arr.join("") === "") {
        setInputValue("0");
      }
    }
    if (event.key === "(") {
      const operators = ["+", "-", "×", "÷", "("];
      if (
        inputValue === "0" ||
        inputValue === "Infinity" ||
        inputValue === "Error"
      ) {
        setInputValue(event.key);
        setBracketScore(bracketScore + 1);
      }
      if (operators.includes(inputValue[inputValue.length - 1])) {
        setBracketScore(bracketScore + 1);
        setInputValue(inputValue + event.key);
      }
    }
    if (event.key === ")") {
      if (
        ((Number(inputValue[inputValue.length - 1]) >= 1 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
          inputValue[inputValue.length - 1] === ")") &&
        bracketScore !== 0
      ) {
        setBracketScore(bracketScore - 1);
        setInputValue(inputValue + event.key);
      }
    }
  }

  function handleButtons(el) {
    if (el.id === 1) {
      if (
        Number(inputValue[inputValue.length - 1]) >= 0 &&
        Number(inputValue[inputValue.length - 1]) <= 9
      ) {
        setInputValue(inputValue + ".");
      }
    }
    if (el.id === 2) {
      const operators = ["+", "-", "×", "÷", "("];
      if (
        inputValue === "0" ||
        inputValue === "Infinity" ||
        inputValue === "Error"
      ) {
        setInputValue(el.text);
        setBracketScore(bracketScore + 1);
      }
      if (operators.includes(inputValue[inputValue.length - 1])) {
        setBracketScore(bracketScore + 1);
        setInputValue(inputValue + el.text);
      }
    }
    if (el.id === 3) {
      if (
        ((Number(inputValue[inputValue.length - 1]) >= 1 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
          inputValue[inputValue.length - 1] === ")") &&
        bracketScore !== 0
      ) {
        setBracketScore(bracketScore - 1);
        setInputValue(inputValue + el.text);
      }
    }
    if (el.id === 4) {
      let arr = [...inputValue];
      let pop = arr.pop();
      if (pop === ")") {
        setBracketScore(bracketScore + 1);
      } else if (pop === "(") {
        setBracketScore(bracketScore - 1);
      } else {
        setBracketScore(bracketScore);
      }
      setInputValue(arr.join(""));
      if (arr.join("") === "") {
        setInputValue("0");
      }
    }
    if (el.id === 5) {
      setInputValue("0");
      setPrevText("");
      setBracketScore(0);
    }
    if (el.id >= 6 && el.id <= 15) {
      if (
        inputValue === "0" ||
        inputValue === "Infinity" ||
        inputValue === "Error"
      ) {
        setInputValue(el.text);
      } else if (inputValue[inputValue.length - 1] !== ")") {
        setInputValue(inputValue + el.text);
      }
    }
    if (el.id === 16) {
      if (
        (Number(inputValue[inputValue.length - 1]) >= 0 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
        inputValue[inputValue.length - 1] === ")"
      ) {
        setInputValue(inputValue + el.text);
      }
    }
    if (el.id === 17) {
      if (inputValue === "0" || inputValue === "Infinity") {
        setInputValue(el.text);
      } else if (
        (Number(inputValue[inputValue.length - 1]) >= 0 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
        inputValue[inputValue.length - 1] === "(" ||
        inputValue[inputValue.length - 1] === ")"
      ) {
        setInputValue(inputValue + el.text);
      }
    }
    if (el.id === 18) {
      if (
        (Number(inputValue[inputValue.length - 1]) >= 0 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
        inputValue[inputValue.length - 1] === ")"
      ) {
        setInputValue(inputValue + el.text);
      }
    }
    if (el.id === 19) {
      if (
        (Number(inputValue[inputValue.length - 1]) >= 0 &&
          Number(inputValue[inputValue.length - 1]) <= 9) ||
        inputValue[inputValue.length - 1] === ")"
      ) {
        setInputValue(inputValue + el.text);
      }
    }
    if (el.id === 20) {
      const operators = ["+", "-", "×", "÷", "("];

      if (operators.includes(inputValue[inputValue.length - 1])) {
        setInputValue(inputValue);
      } else if (bracketScore === 0) {
        setPrevText(inputValue + "=");
        let newStr = inputValue.replaceAll("×", "*").replaceAll("÷", "/");
        let res = eval(newStr);
        setInputValue(res.toString());
      }
    }
    if (el.id === 21) {
      const operators = ["+", "-", "×", "÷", "("];

      if (operators.includes(inputValue[inputValue.length - 1])) {
        setInputValue(inputValue);
      } else if (bracketScore === 0) {
        setPrevText("sqr(" + inputValue + ")");
        let newStr = inputValue.replaceAll("×", "*").replaceAll("÷", "/");
        let res = eval(newStr ** 2);
        setInputValue(res.toString());
      }
    }
    if (el.id === 22) {
      const operators = ["+", "-", "×", "÷", "("];
      if (operators.includes(inputValue[inputValue.length - 1])) {
        setInputValue(inputValue);
      } else if (bracketScore === 0) {
        setPrevText("√ (" + inputValue + ")" + "=");
        let newStr = inputValue.replaceAll("×", "*").replaceAll("÷", "/");
        let res = Math.sqrt(eval(newStr));
        if (isNaN(res) || !isFinite(res)) {
          setInputValue("0");
          setPrevText("Error");
        } else {
          setInputValue(res.toString());
        }
      }
    }
    if (el.id === 23) {
      const operators = ["+", "-", "×", "÷", "("];
      if (operators.includes(inputValue[inputValue.length - 1])) {
        setInputValue(inputValue);
      } else if (bracketScore === 0) {
        setPrevText("1/(" + inputValue + ")" + "=");
        let newStr = inputValue.replaceAll("×", "*").replaceAll("÷", "/");
        let res = eval(1 / newStr);
        setInputValue(res.toString());
      }
    }
  }

  return (
    <>
    <ToogleButton/>
      <Header />
      <div className="calculator-container">
        <p className="previous-calculation">{prevText}</p>
        <input
          type="text"
          className={inputClass}
          onKeyDown={handleKeyDown}
          value={inputValue}
          autoFocus
        />
        {btns.map((el) => (
          <button
            className="button"
            onClick={() => {
              handleButtons(el);
              handleAnimations(el);
              handleEqualness(el);
            }}
            style={{ backgroundColor: el.background }}
            key={el.id}
            disabled={buttonsDisabled}
          >
            {el.text}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
