# ai-tdd

Node.js + TypeScript + [Vitest](https://vitest.dev/) 的測試先行練習專案，並內建 Cursor Agent Skill（[`.agents/skills/tdd/`](.agents/skills/tdd/SKILL.md)）。在聊天使用 `/tdd` 時，Agent 會依 Skill 的紅燈／綠燈流程推進。

## 專案內容

| 路徑 | 說明 |
| --- | --- |
| `.agents/skills/tdd/` | TDD Skill 與規範（接縫、品質、紅綠燈、重構、邊界模擬） |
| `src/` | 練習用實作與測試（Vitest） |

## 指令

```bash
npm test              # 執行全部測試
npm run test:watch    # 監看模式
npm run test:coverage # 覆蓋率
npm run typecheck     # TypeScript 檢查
```

測試檔位置：`src/**/*.test.ts`、`tests/**/*.test.ts`（見 `vitest.config.ts`）。

## TDD Skill 流程

Skill 位於 [`.agents/skills/tdd/SKILL.md`](.agents/skills/tdd/SKILL.md)。一次只推進**一條已確認的測試接縫**：先確認接縫，再寫一條會失敗的測試，用最小實作讓它通過，通過之後才決定要不要重構。已確認接縫還沒覆蓋完時，從撰寫失敗測試再跑一輪。

### 確認測試接縫

讀取需求與即將修改的程式，以及存在的 `GLOSSARY.md` 與修改範圍內的 ADR。依 [測試接縫規範](.agents/skills/tdd/rules/測試接縫規範.md) 列出每條候選接縫的公開介面、抓到的行為與漏掉的行為，並在使用者確認前停止。未確認的接縫不得寫測試。

### 撰寫失敗測試

依 [測試品質規範](.agents/skills/tdd/rules/測試品質規範.md) 選定本輪要覆蓋的一條已確認接縫，以及該測試要觀察的公開行為。接縫跨越系統邊界時，再讀 [邊界模擬規範](.agents/skills/tdd/rules/邊界模擬規範.md)，決定要替換的外部依賴。依 [紅燈綠燈循環規範](.agents/skills/tdd/rules/紅燈綠燈循環規範.md)，本輪只把這一條測試寫進對應的測試檔。

### 檢查並修正失敗測試

對照已載入規範檢查本輪測試檔與執行輸出，列出不符合項目後一次修正。

### 實作最小通過

修改本輪接縫的實作檔，使本輪測試通過。實作只覆蓋這條測試要求的行為。紅燈到綠燈之間不重整既有結構、不重新命名、不搬移職責。

### 檢查並修正實作

再執行本輪測試，對照規範列出不符合項目，並修正所在的實作檔或測試檔。

### 決定是否重構

依 [重構循環規範](.agents/skills/tdd/rules/重構循環規範.md) 列出本輪可做的結構改善，或跳過重構。重構只改本輪觸及的實作檔，不改公開行為、不新增測試。一次只做一類結構改善。完成後執行專案既有的測試指令，本輪測試與既有測試都必須通過。

### 決定下一輪

已確認接縫都有對應測試即結束。仍有未覆蓋接縫時，回到撰寫失敗測試。

## 規範

| 規範 | 把關內容 |
| --- | --- |
| [測試接縫規範](.agents/skills/tdd/rules/測試接縫規範.md) | 接縫是呼叫者觀察行為的公開介面；確認後才寫測試；名稱沿用 `GLOSSARY.md` 與修改範圍內的 ADR |
| [測試品質規範](.agents/skills/tdd/rules/測試品質規範.md) | 測試描述公開行為、禁止實作耦合與同義反覆、一次一個垂直切片，並認定系統邊界 |
| [邊界模擬規範](.agents/skills/tdd/rules/邊界模擬規範.md) | 只在系統邊界替換依賴；外部依賴由呼叫端注入；邊界介面按操作拆開 |
| [紅燈綠燈循環規範](.agents/skills/tdd/rules/紅燈綠燈循環規範.md) | 先觀察到行為尚不存在的失敗，再寫最小實作；綠燈階段停止結構調整 |
| [重構循環規範](.agents/skills/tdd/rules/重構循環規範.md) | 僅在綠燈後重構；不新增行為、不改接縫語意、不改測試來配合新結構 |

系統邊界包含外部 API、資料庫、時間、隨機性與檔案系統。自己擁有的類別、模組與內部協作物件不是系統邊界。
