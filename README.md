# Pomodoro Timer Chrome Extension

シンプルで使いやすいポモドーロタイマーのChrome拡張機能です。

## 機能

- ツールバーにタイマーを表示
- カスタマイズ可能な作業時間と休憩時間
- 作業・休憩セッション終了時の通知機能
- シンプルで使いやすいインターフェース

## インストール方法

1. このリポジトリをクローンまたはダウンロード
2. Chrome ブラウザで `chrome://extensions` を開く
3. 右上の「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、ダウンロードしたフォルダを選択

## 使い方

1. Chrome ツールバーの拡張機能アイコンをクリック
2. 作業時間（デフォルト：25分）と休憩時間（デフォルト：5分）を設定
3. 「Start」ボタンをクリックしてタイマーを開始
4. タイマーは自動的に作業セッションと休憩セッションを切り替え
5. 「Stop」ボタンでタイマーを停止

## 技術仕様

- Manifest Version: 3
- 使用権限:
  - storage: 設定の保存
  - alarms: タイマー機能
  - notifications: 通知機能

## ライセンス

MIT License

## 開発者向け情報

### ファイル構成

- `manifest.json`: 拡張機能の設定ファイル
- `popup.html`: ポップアップUIのHTML
- `popup.js`: ポップアップのロジック
- `background.js`: バックグラウンドスクリプト（タイマー処理）
- `icons/`: アイコンファイル*
*アイコンファイルはご自身でご用意ください。

### 主な機能の実装

- バックグラウンドでのタイマー管理
- Chrome バッジによる残り時間の表示
- デスクトップ通知によるセッション切り替えの通知
