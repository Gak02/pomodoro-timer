// タイマー設定（秒単位）のデフォルト値
let pomodoroDuration = 25 * 60; // 25分
let breakDuration = 5 * 60;     // 5分
let timerEnd = null;
let timerType = "pomodoro"; // "pomodoro" または "break"
let timerInterval = null;

// バッジテキストの更新（残り時間を分のみ表示）
function updateBadge() {
  if (!timerEnd) return;
  const remaining = Math.max(0, Math.floor((timerEnd - Date.now()) / 1000));
  const minutes = Math.ceil(remaining / 60); // 秒数を切り上げして分のみ表示
  chrome.action.setBadgeText({ text: minutes.toString() });

  // タイマーが終了した場合
  if (remaining <= 0) {
    clearInterval(timerInterval);

    if (timerType === "pomodoro") {
      // 作業セッション終了時 → 「お疲れ様でした！」「休憩しましょう！」
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "お疲れ様でした！",
        message: "休憩しましょう！"
      });
      timerType = "break";
      timerEnd = Date.now() + breakDuration * 1000;
    } else {
      // 休憩セッション終了時 → 「さあ！頑張りましょう！」
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "さあ！頑張りましょう！",
        message: ""
      });
      timerType = "pomodoro";
      timerEnd = Date.now() + pomodoroDuration * 1000;
    }
    // 次のタイマー更新開始
    timerInterval = setInterval(updateBadge, 1000);
  }
}

// popup からのメッセージ受信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    // popup から設定値（秒単位）を受信
    pomodoroDuration = message.pomodoroDuration;
    breakDuration = message.breakDuration;
    timerType = "pomodoro";
    timerEnd = Date.now() + pomodoroDuration * 1000;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateBadge, 1000);
    sendResponse({ status: "started" });
  } else if (message.action === "stopTimer") {
    clearInterval(timerInterval);
    timerEnd = null;
    chrome.action.setBadgeText({ text: "" });
    sendResponse({ status: "stopped" });
  }
});