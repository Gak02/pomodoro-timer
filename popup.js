// 開始ボタン押下時の処理
document.getElementById("start").addEventListener("click", () => {
    const pomodoroInput = document.getElementById("pomodoro");
    const breakInput = document.getElementById("break");
    const pomodoro = parseInt(pomodoroInput.value) || 25;
    const breakTime = parseInt(breakInput.value) || 5;
    
    chrome.runtime.sendMessage({
      action: "startTimer",
      pomodoroDuration: pomodoro * 60, // 秒に変換
      breakDuration: breakTime * 60
    }, response => {
      console.log(response.status);
    });
  });
  
  // 停止ボタン押下時の処理
  document.getElementById("stop").addEventListener("click", () => {
    chrome.runtime.sendMessage({
      action: "stopTimer"
    }, response => {
      console.log(response.status);
    });
  });
  