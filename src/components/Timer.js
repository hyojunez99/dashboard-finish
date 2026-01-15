import { useEffect, useState } from "react";

const Timer = () => {
  const presets = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  // mode를 먼저 선언
  const [mode, setMode] = useState("focus");

  // mode의 기본 시간으로 초기 설정
  const [time, setTime] = useState(presets[mode]);
  const [isRunning, setIsRunning] = useState(false);

  // 모드 변경 함수
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTime(presets[newMode]);
    setIsRunning(false);
  };

  // Start/Stop 토글
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Reset: 현재 mode의 기본값으로 되돌림
  const handleReset = () => {
    setTime(presets[mode]);
    setIsRunning(false);
  };

  // 1초마다 감소하는 타이머 로직
  useEffect(() => {
    let intervalID;

    if (isRunning && time > 0) {
      intervalID = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      setIsRunning(false); // 0초되면 자동정지
    }

    return () => clearInterval(intervalID);
  }, [isRunning, time]);

  // 화면 표시 위한 계산
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const format = (num) => String(num).padStart(2, "0");

  return (
    <div id="timer">
      <div className="time">
        <h2>타이머</h2>
        {/* 모드 버튼 */}
        <div className="category">
          <button
            onClick={() => handleModeChange("focus")}
            className={mode === "focus" ? "active" : ""}
          >
            집중
          </button>
          <button
            onClick={() => handleModeChange("shortBreak")}
            className={mode === "shortBreak" ? "active" : ""}
          >
            휴식
          </button>
          <button
            onClick={() => handleModeChange("longBreak")}
            className={mode === "longBreak" ? "active" : ""}
          >
            긴 휴식
          </button>
        </div>

        {/* 시간 표시 */}
        <p>
          {format(minutes)} : {format(seconds)}
        </p>

        {/* Start / Stop / Reset */}
        <div className="btn">
          <button
            onClick={handleStartStop}
            className={isRunning ? "active" : ""}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
