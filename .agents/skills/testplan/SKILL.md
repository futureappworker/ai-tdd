---
name: testplan
description: 在 TDD 正式開始前，把需求範圍轉成一份可獨立閱讀的測試計劃。使用時機：使用者要測試計劃、testplan，或要求在寫測試之前先定義各系統介面的案例、Fixture 與 TDD 順序。
---

# SOP

## Phase 1: 讀取輸入與樣板

1. Read 讀取使用者輸入並取得需求範圍、規格來源與指定的輸出路徑。
2. Read [測試計劃輸出位置規範](rules/測試計劃輸出位置規範.md)並取得目標路徑與寫入邊界。
3. Read [Test Plan Template 骨架](templates/testplan.md)並取得測試計劃的固定輸出結構。
4. Read [Test Plan Template 範例](templates/testplan.example.md)並取得完整 Artifact 的填寫方式。
5. Think 依已載入規範決定目標測試計劃路徑。

## Phase 2: 推導測試計劃內容

1. Read [測試計劃品質規範](rules/測試計劃品質規範.md)並取得介面、Fixture、原子案例、oracle 與 TDD 順序要求。
2. Think 依已載入規範決定系統介面、呼叫契約、共用 Arrange Fixtures、原子案例與 TDD 順序。

## Phase 3: 撰寫測試計劃

1. Write 依已載入樣板與已載入規範將測試計劃寫入目標檔案。

## Phase 4: 檢查測試計劃

1. Read 依已載入規範與已載入樣板檢查目標測試計劃，並列出不符合項目。

## Phase 5: 修正測試計劃

1. Write 修正目標測試計劃中全部不符合已載入規範與樣板結構的項目。
