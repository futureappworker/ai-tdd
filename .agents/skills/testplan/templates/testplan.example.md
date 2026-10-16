# 測試計劃 ( Test Plan )：線上 PVP 1A2B 猜數字

## 系統介面 ( System Interfaces )

| 介面 | 種類 | 測試層級 | 案例數 |
| --- | --- | --- | --- |
| 後端房間 API | 後端 | API 到資料持久化 | 32 |
| 前端對局畫面 | 前端 | 端到端遊玩路徑 | 1 |

一個案例只有一個**唯一測試意圖**。厚案例拆成 A/B/C 這類原子案例。TDD 每次只取下方順序的下一個原子案例，先看到該案例的預期 RED，再寫讓它通過的實作。

**對應需求**只索引規格。斷言要用的字面值寫在 Fixture、操作與預期輸出。

每個案例的 oracle 分成三欄：**觀測通道**是從哪一次回應讀，**預期輸出**是這次要出現的新結果，**必須維持不變**是這次要同時斷言、且與操作前相同的欄位。沒有要守住的欄位就寫「無」。**本案例不驗證**的項目不要寫進斷言。

### 介面 1 - 後端房間 API（種類 ( Kind )：後端）

呼叫者透過房間 API 建立房間、準備、猜測、離開與讀回對局。測試從 API 觀察回應，並確認寫入真實資料庫後仍讀得到同一場。

**呼叫契約 ( Call Contract )**：進入成功回傳 `playerId`。之後的讀取、設定祕密答案、開始、猜測、離開與心跳，都在標頭 `X-Player-Id` 帶這個 `playerId`。請求本體不放角色。拒絕都是 HTTP 400，並帶 `message`。

**公開介面 ( Public Interface )**：

- `POST /api/rooms/enter`：本體欄位 `nickname`、`roomCode`。新建房間成功是 HTTP 201，加入等待中的房間成功是 HTTP 200；兩者都回傳 `playerId`、`role` 與 `room`。
- `GET /api/rooms/:roomId`：成功是 HTTP 200，回傳該玩家看到的房間。房間不存在是 HTTP 404，`message` 為「房間已關閉。」
- `POST /api/rooms/:roomId/secret`：本體欄位 `secret`。成功是 HTTP 200。
- `POST /api/rooms/:roomId/start`：沒有本體。成功是 HTTP 200。
- `POST /api/rooms/:roomId/guesses`：本體欄位 `guess`。成功是 HTTP 200，並回傳 `result`。
- `POST /api/rooms/:roomId/leave`：沒有本體。成功是 HTTP 200。
- `POST /api/rooms/:roomId/heartbeat`：沒有本體。成功是 HTTP 200。

**本介面涵蓋 ( Covered Here )**：開房與加入、同時進房、房號已滿或對局中、輸入拒絕、開始前離開、祕密答案、開始對局、輪流猜測、猜中、對局中離開、斷線、結束後釋放房號、資料可再讀。

**留給其他介面 ( Left to Other Interfaces )**：瀏覽器上兩位玩家是否走完同一條遊玩路徑並看到相同畫面。該路徑由前端對局畫面負責。

### 介面 2 - 前端對局畫面（種類 ( Kind )：前端）

兩位玩家在瀏覽器完成同一場對局。測試以兩個瀏覽器頁面操作真實畫面，並連到真實後端。

**呼叫契約 ( Call Contract )**：一個瀏覽器頁面就是一位玩家，不另帶 `playerId`。進入房間送欄位「暱稱」「房號」並按「進入房間」。設定祕密答案送欄位「祕密答案」並按「設定祕密答案」。開始對局按「開始對局」。送出猜測送欄位「猜測」並按「送出猜測」。

**公開介面 ( Public Interface )**：

- 進入房間：欄位「暱稱」「房號」，按鈕「進入房間」
- 設定祕密答案：欄位「祕密答案」，按鈕「設定祕密答案」
- 開始對局：按鈕「開始對局」
- 送出猜測：欄位「猜測」，按鈕「送出猜測」
- 讀取結果：「對局結果」「你的祕密答案」「對手的祕密答案」「猜測紀錄」

**本介面涵蓋 ( Covered Here )**：從進房、設定祕密答案、房主開始、猜中對方答案，到雙方看到同一場結果。

**留給其他介面 ( Left to Other Interfaces )**：房號格式、空暱稱、房間已滿、對局中的房號、開始前離開、未準備開始、非房主開始、未輪到猜測、不合法答案、斷線、對局中離開、房號釋放與資料庫再讀。這些由後端房間 API 負責。

## 共用 Arrange Fixtures

案例的前置條件引用這裡的 Fixture，並保留 Fixture 寫明的 `playerId` 與 `roomId`。

1. **Fixture 空資料庫**：啟動接到空資料庫的後端。沒有進行中的房間。
2. **Fixture 等待房主**：玩家A 呼叫 `POST /api/rooms/enter`，`nickname` 為「玩家A」，`roomCode` 為「1234」。保留房主 `playerId` 與 `roomId`。房間 `status` 為等待對手，`players` 只有房主玩家A、`ready` 為 false。
3. **Fixture 準備中**：先做 Fixture 等待房主。玩家B 再呼叫 `POST /api/rooms/enter`，`nickname` 為「玩家B」，`roomCode` 為「1234」。保留加入者 `playerId`。`status` 為準備中。雙方都尚未呼叫 `POST /api/rooms/:roomId/secret`。
4. **Fixture 雙方已準備**：先做 Fixture 準備中。房主 `secret` 為「5678」，加入者 `secret` 為「1234」。雙方 `ready` 為 true。尚未呼叫 `POST /api/rooms/:roomId/start`。
5. **Fixture 對局中**：先做 Fixture 雙方已準備。房主呼叫 `POST /api/rooms/:roomId/start`。`status` 為對局中，`turn` 為房主，`guesses` 為空。
6. **Fixture 已猜中**：先做 Fixture 對局中。房主呼叫 `POST /api/rooms/:roomId/guesses`，`guess` 為「1234」。`result` 為 4A0B，`status` 為已結束，`result.winnerRole` 為房主，`result.reason` 為猜中。保留原 `roomId`。
7. **Fixture 可控時鐘**：建立後端時帶入時鐘，斷線界線為 5000。玩家A、玩家B 以房號 1234 進入並保留雙方 `playerId` 與 `roomId`。房主 `secret` 為「5678」，加入者 `secret` 為「1234」，房主開始。時間在 4000 時房主呼叫 `POST /api/rooms/:roomId/heartbeat`。加入者自進房後沒有再呼叫心跳。
8. **Fixture 兩個對局頁**：開兩個瀏覽器，都進入對局頁。選定一個尚未進行中的四位房號。兩邊都還沒按「進入房間」。

## TDD 順序 ( Atomic Order )

依這個順序，一次只做一個原子案例：

1. BE-1.1
2. BE-1.2
3. BE-10.1
4. BE-2.1
5. BE-2.2
6. BE-2.3
7. BE-3.1
8. BE-4.1
9. BE-4.2
10. BE-4.3
11. BE-5.1A
12. BE-5.1B
13. BE-5.2
14. BE-6.1
15. BE-6.2
16. BE-6.3
17. BE-2.4
18. BE-7.1
19. BE-7.2
20. BE-7.3
21. BE-7.4
22. BE-7.5
23. BE-8.1A
24. BE-8.1B
25. BE-8.1C
26. BE-8.2A
27. BE-8.2B
28. BE-9.1A
29. BE-9.1B
30. BE-9.2
31. BE-9.3A
32. BE-9.3B
33. FE-1.1

## 後端房間 API 的測試情境 ( Backend Scenarios )

### 情境 BE-1 - 以暱稱與房號進入房間

**對應需求 ( Traces )**：FR-US1-001、FR-US1-002、FR-US1-003、FR-US1-006、FR-US1-007、FR-G-002、邊界「相同暱稱仍可分辨房主與加入者」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-1.1 玩家以暱稱與不存在的房號進入房間後成為房主並等待對手
   - **唯一測試意圖 ( Intent )** 不存在的房號會開出等待對手的房間，進入者是房主。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/enter`
   - **前置條件 ( Arrange )** Fixture 空資料庫。
   - **操作 ( Act )** `nickname` 為「玩家A」，`roomCode` 為「1234」。
   - **觀測通道 ( Observation Channel )** 這次進入的回應。
   - **預期輸出 ( Expected Output )** HTTP 201。`role` 為房主。`room.roomCode` 為 1234，`room.status` 為等待對手。`room.players` 只有一位：房主、暱稱玩家A、`ready` 為 false。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 祕密答案、猜測紀錄、離開、第二位玩家。
   - **預期 RED 原因 ( Expected Red )** 尚不能以暱稱與房號建立房間，進入回應不是 HTTP 201 的房主、等待對手。
2. **案例 ( Case )** BE-1.2 玩家加入只有房主在等待的房間後雙方都看得到彼此暱稱與身分
   - **唯一測試意圖 ( Intent )** 相同暱稱的第二位玩家加入同一間等待中的房間，雙方都靠房主與加入者分辨彼此。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/enter`
   - **前置條件 ( Arrange )** 小明先呼叫 `POST /api/rooms/enter`，`nickname` 為「小明」、`roomCode` 為「1234」。保留這次的 `roomId`。房間只有這位房主，`status` 為等待對手。
   - **操作 ( Act )** 另一位玩家以 `nickname`「小明」、`roomCode`「1234」進入。
   - **觀測通道 ( Observation Channel )** 加入者這次進入的回應，以及房主與加入者各自的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 加入回應 HTTP 200，`role` 為加入者，`room.roomId` 與房主那間相同。雙方讀到的 `status` 都是準備中。雙方的 `players` 都依序是：房主小明 `ready` false，加入者小明 `ready` false。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 祕密答案、猜測紀錄、誰先開始。
   - **預期 RED 原因 ( Expected Red )** 第二位小明沒有成為同一間房間的加入者，或雙方讀回的玩家列表不是房主與加入者各一位。

### 情境 BE-2 - 拒絕不該進入的房間

**對應需求 ( Traces )**：FR-US1-004、FR-US1-005、FR-US1-006、FR-G-002、邊界「對局中的房號必須拒絕且不干擾該場」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-2.1 玩家送出不是四位數字的房號時被拒絕並得知正確格式
   - **唯一測試意圖 ( Intent )** 不是四位數字的房號被拒絕，並得到指定訊息。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/enter`
   - **前置條件 ( Arrange )** Fixture 空資料庫。
   - **操作 ( Act )** `nickname` 為「玩家A」，`roomCode` 為「12a4」。
   - **觀測通道 ( Observation Channel )** 這次進入的回應。
   - **預期輸出 ( Expected Output )** HTTP 400。`message` 為「房號必須是四位數字，請輸入 0000 到 9999。」
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 空暱稱、房間已滿、對局中的房號。
   - **預期 RED 原因 ( Expected Red )** `12a4` 仍被接受，或拒絕訊息不是「房號必須是四位數字，請輸入 0000 到 9999。」
2. **案例 ( Case )** BE-2.2 玩家未輸入暱稱時被拒絕並被提示要輸入暱稱
   - **唯一測試意圖 ( Intent )** 送出的空暱稱被拒絕，並得到指定訊息。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/enter`
   - **前置條件 ( Arrange )** Fixture 空資料庫。
   - **操作 ( Act )** `nickname` 為空字串，`roomCode` 為「1234」。欄位要送出，不可省略。
   - **觀測通道 ( Observation Channel )** 這次進入的回應。
   - **預期輸出 ( Expected Output )** HTTP 400。`message` 為「請輸入暱稱後再進入房間。」
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 房號格式、房間是否已存在。
   - **預期 RED 原因 ( Expected Red )** 空字串暱稱仍能進入，或拒絕訊息不是「請輸入暱稱後再進入房間。」
3. **案例 ( Case )** BE-2.3 第三人進入已有兩位玩家的房號時被拒絕且不會另開房間
   - **唯一測試意圖 ( Intent )** 已有兩人的房號拒絕後續進入，原房間仍是原來那一場。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/enter`
   - **前置條件 ( Arrange )** Fixture 準備中。保留原 `roomId`。
   - **操作 ( Act )** 玩家C、玩家D 先後以 `nickname`「玩家C」「玩家D」、`roomCode`「1234」進入。
   - **觀測通道 ( Observation Channel )** 第三位與第四位的進入回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 兩次進入都是 HTTP 400，`message` 都是「此房號已滿，請改用其他四位數字房號。」
   - **必須維持不變 ( Must Stay )** 原 `roomId` 的 `status` 仍是準備中，`players` 仍是房主玩家A 與加入者玩家B。
   - **本案例不驗證 ( Not Verified )** 對局中的拒絕訊息、祕密答案。
   - **預期 RED 原因 ( Expected Red )** 第三人或第四人進入成功，或原 `roomId` 不再是準備中的那兩位玩家。
4. **案例 ( Case )** BE-2.4 玩家進入對局中的房號時被拒絕且對局不受影響
   - **唯一測試意圖 ( Intent )** 對局中的房號拒絕新玩家，原對局的輪次與紀錄不變。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/enter`
   - **前置條件 ( Arrange )** Fixture 對局中。保留原 `roomId`。
   - **操作 ( Act )** 玩家C 以 `nickname`「玩家C」、`roomCode`「1234」進入。
   - **觀測通道 ( Observation Channel )** 這次進入的回應，以及原房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** HTTP 400。`message` 為「此房號正在對局中，請改用其他四位數字房號。」
   - **必須維持不變 ( Must Stay )** 原 `roomId` 的 `status` 仍是對局中，`turn` 仍是房主，`guesses` 仍是空的。
   - **本案例不驗證 ( Not Verified )** 房間已滿的訊息、xAyB、勝負。
   - **預期 RED 原因 ( Expected Red )** 玩家C 進入了對局中的房號，或原對局的 `turn`、`guesses` 被改掉。

### 情境 BE-3 - 同時進入同一個不存在的房號

**對應需求 ( Traces )**：NFR-US1-001、FR-G-002、SC-004、邊界「同時輸入同一個不存在房號只能產生一個房間」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-3.1 兩位玩家同時進入同一個不存在的房號時只建立一個房間
   - **唯一測試意圖 ( Intent )** 兩次同時進入只產生一個房間，一人是房主、一人是加入者。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** 同時兩次 `POST /api/rooms/enter`
   - **前置條件 ( Arrange )** Fixture 空資料庫。
   - **操作 ( Act )** 玩家A 與玩家B 的兩次進入都送出之後，才讀取兩次回應。`roomCode` 都是「1234」。
   - **觀測通道 ( Observation Channel )** 兩次進入的回應。
   - **預期輸出 ( Expected Output )** 一次 HTTP 201 且 `role` 為房主，另一次 HTTP 200 且 `role` 為加入者。兩個 `room.roomId` 相同。房主人數為 1，加入者人數為 1。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 祕密答案、猜測、離開。
   - **預期 RED 原因 ( Expected Red )** 兩次進入得到兩個 `roomId`，或兩個角色都是房主。

### 情境 BE-4 - 對局開始前離開房間

**對應需求 ( Traces )**：假設「加入者離開則回到等待對手；房主離開則關閉房間並釋放房號；兩種都不產生勝負」、邊界「房主在對手加入前離開後房號被釋放」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-4.1 房主在對手加入前離開後同一房號會開出新房間
   - **唯一測試意圖 ( Intent )** 等待中的房主離開後，同一房號開出另一個房間。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/leave`，接著 `POST /api/rooms/enter`
   - **前置條件 ( Arrange )** Fixture 等待房主。保留原 `roomId`。
   - **操作 ( Act )** 房主離開。玩家B 再以 `nickname`「玩家B」、`roomCode`「1234」進入。
   - **觀測通道 ( Observation Channel )** 離開的回應，以及之後那次進入的回應。
   - **預期輸出 ( Expected Output )** 離開 HTTP 200。新的進入 HTTP 201，`role` 為房主，`room.status` 為等待對手，`room.players` 只有房主玩家B、`ready` false。新的 `room.roomId` 與原 `roomId` 不同。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 準備中的離開、勝負、猜測紀錄。
   - **預期 RED 原因 ( Expected Red )** 玩家B 進入後仍是原 `roomId`，或新房間不是等待對手的房主玩家B。
2. **案例 ( Case )** BE-4.2 準備中的加入者離開後房間回到等待對手
   - **唯一測試意圖 ( Intent )** 準備中的加入者離開後，原房間回到等待對手且沒有勝負。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/leave`
   - **前置條件 ( Arrange )** Fixture 準備中。保留原 `roomId`。
   - **操作 ( Act )** 加入者以自己的 `playerId` 離開。
   - **觀測通道 ( Observation Channel )** 離開的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 離開 HTTP 200。原 `roomId` 的 `status` 為等待對手。
   - **必須維持不變 ( Must Stay )** `players` 只有房主玩家A、`ready` false。回應沒有 `result`。
   - **本案例不驗證 ( Not Verified )** 房主離開、對局中的勝負、祕密答案。
   - **預期 RED 原因 ( Expected Red )** 加入者離開後 `status` 仍是準備中，或出現 `result`。
3. **案例 ( Case )** BE-4.3 準備中的房主離開後房間關閉且沒有勝負
   - **唯一測試意圖 ( Intent )** 準備中的房主離開後，原房間不存在，因此沒有勝負。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/leave`
   - **前置條件 ( Arrange )** Fixture 準備中。保留原 `roomId`。
   - **操作 ( Act )** 房主離開後，再讀原 `roomId`。
   - **觀測通道 ( Observation Channel )** 離開的回應，以及對原 `roomId` 的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 離開 HTTP 200。讀原 `roomId` 為 HTTP 404，`message` 為「房間已關閉。」
   - **必須維持不變 ( Must Stay )** 這次 404 回應沒有 `result`。
   - **本案例不驗證 ( Not Verified )** 加入者離開後的等待對手、猜測紀錄。
   - **預期 RED 原因 ( Expected Red )** 房主離開後原 `roomId` 仍讀得到，或 404 的訊息不是「房間已關閉。」

### 情境 BE-5 - 設定祕密答案

**對應需求 ( Traces )**：FR-US2-001、FR-US2-002、FR-US2-003、FR-G-001、FR-G-003、邊界「重複數字、非數字或長度不是四位必須拒絕」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-5.1A 玩家設定符合規則的祕密答案後自己看得到答案且已準備
   - **唯一測試意圖 ( Intent )** 合法祕密答案寫入後，設定者自己看得到答案並成為已準備。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/secret`
   - **前置條件 ( Arrange )** Fixture 準備中。
   - **操作 ( Act )** 房主以自己的 `playerId` 送出 `secret`「5678」。
   - **觀測通道 ( Observation Channel )** 這次設定的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 設定 HTTP 200。房主那一筆 `players` 的 `ready` 為 true。房主的 `ownSecret` 為 5678。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 加入者是否看得到 5678、開始對局、猜測。
   - **預期 RED 原因 ( Expected Red )** 房主讀回沒有 `ownSecret` 5678，或房主 `ready` 仍是 false。
2. **案例 ( Case )** BE-5.1B 對手看不到剛剛設定的祕密答案
   - **唯一測試意圖 ( Intent )** 房主的祕密答案不會出現在加入者的房間讀取裡。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/secret`
   - **前置條件 ( Arrange )** Fixture 準備中。
   - **操作 ( Act )** 房主以自己的 `playerId` 送出 `secret`「5678」。
   - **觀測通道 ( Observation Channel )** 加入者的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 加入者讀到房主那一筆 `ready` 為 true、自己那一筆 `ready` 為 false。加入者的回應沒有 `ownSecret`，也沒有 `opponentSecret`。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 房主自己的 `ownSecret` 字面值、開始對局。
   - **預期 RED 原因 ( Expected Red )** 加入者的房間回應出現 `ownSecret` 或 `opponentSecret`。
3. **案例 ( Case )** BE-5.2 玩家送出不符合規則的祕密答案時被拒絕且尚未準備
   - **唯一測試意圖 ( Intent )** 重複數字的祕密答案被拒絕，設定者仍未準備。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/secret`
   - **前置條件 ( Arrange )** Fixture 準備中。
   - **操作 ( Act )** 房主送出 `secret`「1123」。
   - **觀測通道 ( Observation Channel )** 這次設定的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** HTTP 400。`message` 為「祕密答案必須是四位不重複的數字，0 可以在首位。」
   - **必須維持不變 ( Must Stay )** 房主 `ready` 仍是 false。房主的回應沒有 `ownSecret`。
   - **本案例不驗證 ( Not Verified )** 合法祕密答案 5678、開始對局。
   - **預期 RED 原因 ( Expected Red )** `1123` 被存成祕密答案，或房主變成已準備。

### 情境 BE-6 - 房主開始對局

**對應需求 ( Traces )**：FR-US2-004、FR-G-001、使用者故事 2 驗收「雙方都準備好才可開始，且輪到房主」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-6.1 尚有玩家未準備時房主不能開始對局
   - **唯一測試意圖 ( Intent )** 雙方都還沒有祕密答案時，房主不能開始。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/start`
   - **前置條件 ( Arrange )** Fixture 準備中。
   - **操作 ( Act )** 房主以自己的 `playerId` 開始對局。
   - **觀測通道 ( Observation Channel )** 這次開始的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** HTTP 400。`message` 為「尚有玩家未準備好，請待雙方都設定祕密答案後再開始。」
   - **必須維持不變 ( Must Stay )** `status` 仍是準備中。
   - **本案例不驗證 ( Not Verified )** 加入者開始、雙方都已準備後的開始。
   - **預期 RED 原因 ( Expected Red )** 未準備時開始仍成功，或 `status` 變成對局中。
2. **案例 ( Case )** BE-6.2 加入者不能開始對局
   - **唯一測試意圖 ( Intent )** 雙方都已準備時，加入者仍不能開始。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/start`
   - **前置條件 ( Arrange )** Fixture 雙方已準備。
   - **操作 ( Act )** 加入者以自己的 `playerId` 開始對局。
   - **觀測通道 ( Observation Channel )** 這次開始的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** HTTP 400。`message` 為「只有房主可以開始對局。」
   - **必須維持不變 ( Must Stay )** `status` 仍是準備中。回應沒有 `turn`。
   - **本案例不驗證 ( Not Verified )** 房主開始後的猜測權、xAyB。
   - **預期 RED 原因 ( Expected Red )** 加入者開始成功，或房間出現 `turn`。
3. **案例 ( Case )** BE-6.3 雙方都準備好後房主開始對局且輪到房主
   - **唯一測試意圖 ( Intent )** 雙方都已準備後，房主開始，雙方都看到輪到房主。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/start`
   - **前置條件 ( Arrange )** Fixture 雙方已準備。
   - **操作 ( Act )** 房主以自己的 `playerId` 開始對局。
   - **觀測通道 ( Observation Channel )** 這次開始的回應，以及房主與加入者各自的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 開始 HTTP 200。雙方讀到的 `status` 都是對局中，`turn` 都是房主。
   - **必須維持不變 ( Must Stay )** 房主的 `ownSecret` 仍是 5678。加入者的回應仍沒有 `ownSecret`，也沒有 `opponentSecret`。
   - **本案例不驗證 ( Not Verified )** 猜測內容、勝負。
   - **預期 RED 原因 ( Expected Red )** 開始後 `status` 不是對局中，或 `turn` 不是房主。

### 情境 BE-7 - 輪流猜測並回饋 xAyB

**對應需求 ( Traces )**：FR-US3-001、FR-US3-002、FR-US3-003、FR-US3-004、FR-US3-007、NFR-US3-002、SC-002、SC-007、邊界「相同猜測永遠得到相同 xAyB」「非自己回合不得改變猜測權」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-7.1 輪到的玩家猜中部分數字時回饋 xAyB 並換手
   - **唯一測試意圖 ( Intent )** 房主對加入者的 1234 猜 1325，得到 1A2B 並換到加入者。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/guesses`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 房主以自己的 `playerId` 送出 `guess`「1325」。
   - **觀測通道 ( Observation Channel )** 這次猜測的回應，以及房主與加入者各自的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** HTTP 200，`result` 為 1A2B。雙方讀到的 `turn` 都是加入者。雙方的 `guesses` 都是一筆：`guesserRole` 房主、`guess` 1325、`result` 1A2B。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 0A0B、4A0B、非輪到的拒絕。
   - **預期 RED 原因 ( Expected Red )** `result` 不是 1A2B，或 `turn` 仍是房主，或 `guesses` 沒有這一筆。
2. **案例 ( Case )** BE-7.2 猜測沒有任何位置正確時回饋 0A0B
   - **唯一測試意圖 ( Intent )** 房主對加入者的 1234 猜 5678，得到 0A0B 並換到加入者。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/guesses`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 房主以自己的 `playerId` 送出 `guess`「5678」。
   - **觀測通道 ( Observation Channel )** 這次猜測的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** HTTP 200，`result` 為 0A0B。`turn` 為加入者。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 1A2B 的部分命中、猜中後的勝負。
   - **預期 RED 原因 ( Expected Red )** `result` 不是 0A0B，或 `turn` 仍是房主。
3. **案例 ( Case )** BE-7.3 還沒輪到的玩家送出猜測時被拒絕且紀錄不變
   - **唯一測試意圖 ( Intent )** 輪到房主時，加入者送出合法猜測會被拒絕。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/guesses`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 加入者以自己的 `playerId` 送出 `guess`「1325」。
   - **觀測通道 ( Observation Channel )** 這次猜測的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** HTTP 400。`message` 為「尚未輪到你，請等對手猜完。」
   - **必須維持不變 ( Must Stay )** `turn` 仍是房主。`guesses` 仍是空的。
   - **本案例不驗證 ( Not Verified )** 1325 對 1234 的 1A2B、不合法猜測 1123。
   - **預期 RED 原因 ( Expected Red )** 加入者的 1325 被接受，或 `guesses` 多了一筆，或 `turn` 離開房主。
4. **案例 ( Case )** BE-7.4 輪到的玩家送出不符合規則的猜測時被拒絕且仍輪到自己
   - **唯一測試意圖 ( Intent )** 輪到房主時，重複數字的猜測被拒絕，輪次不換。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/guesses`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 房主以自己的 `playerId` 送出 `guess`「1123」。
   - **觀測通道 ( Observation Channel )** 這次猜測的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** HTTP 400。`message` 為「猜測必須是四位不重複的數字，0 可以在首位。」
   - **必須維持不變 ( Must Stay )** `turn` 仍是房主。`guesses` 仍是空的。
   - **本案例不驗證 ( Not Verified )** 尚未輪到的拒絕、合法猜測的 xAyB。
   - **預期 RED 原因 ( Expected Red )** `1123` 被接受，或 `turn` 變成加入者。
5. **案例 ( Case )** BE-7.5 玩家重複送出相同猜測時得到相同的 xAyB
   - **唯一測試意圖 ( Intent )** 房主兩次送出 1325，兩次結果都是 1A2B。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/guesses`
   - **前置條件 ( Arrange )** Fixture 對局中。房主先送出 `guess`「1325」。加入者再送出 `guess`「0987」，`turn` 回到房主。
   - **操作 ( Act )** 房主再以自己的 `playerId` 送出 `guess`「1325」。
   - **觀測通道 ( Observation Channel )** 這次猜測的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 這次回應 HTTP 200，`result` 為 1A2B。讀回的 `guesses` 裡，`guesserRole` 為房主且 `guess` 為 1325 的有兩筆，兩筆 `result` 都是 1A2B。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 加入者 0987 的 xAyB、猜中 1234。
   - **預期 RED 原因 ( Expected Red )** 第二次 1325 的 `result` 不是 1A2B，或房主的 1325 不是兩筆相同結果。

### 情境 BE-8 - 猜中對方答案並釋放房號

**對應需求 ( Traces )**：FR-US3-005、FR-G-001、SC-005、SC-008、邊界「對局結束後雙方仍看得到雙方祕密答案與完整猜測紀錄」、假設「對局結束後房號被釋放，原對局仍可讀」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-8.1A 猜中時回饋 4A0B 且房主因猜中獲勝
   - **唯一測試意圖 ( Intent )** 房主猜中 1234 時，結果是 4A0B，對局結束且房主因猜中獲勝。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/guesses`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 房主以自己的 `playerId` 送出 `guess`「1234」。
   - **觀測通道 ( Observation Channel )** 這次猜測的回應，以及房主與加入者各自的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** HTTP 200，`result` 為 4A0B。雙方讀到的 `status` 都是已結束。`result.winnerRole` 為房主，`result.reason` 為猜中。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 雙方祕密答案欄位、猜測紀錄的筆數、新房間。
   - **預期 RED 原因 ( Expected Red )** `result` 不是 4A0B，或 `status` 仍是對局中，或勝方與原因不是房主、猜中。
2. **案例 ( Case )** BE-8.1B 猜中結束後雙方看得到彼此的祕密答案
   - **唯一測試意圖 ( Intent )** 猜中結束後，雙方各自看得到自己的與對手的祕密答案。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/guesses`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 房主以自己的 `playerId` 送出 `guess`「1234」。
   - **觀測通道 ( Observation Channel )** 房主與加入者各自的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 房主的 `ownSecret` 為 5678、`opponentSecret` 為 1234。加入者的 `ownSecret` 為 1234、`opponentSecret` 為 5678。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 4A0B 字面值以外的換手、對手離開、新房間。
   - **預期 RED 原因 ( Expected Red )** 任一方的 `ownSecret` 或 `opponentSecret` 與上述四個值不符，或加入者仍沒有 `opponentSecret`。
3. **案例 ( Case )** BE-8.1C 猜中的那一次猜測留在雙方紀錄
   - **唯一測試意圖 ( Intent )** 猜中的 1234 以 4A0B 留在雙方的猜測紀錄。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/guesses`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 房主以自己的 `playerId` 送出 `guess`「1234」。
   - **觀測通道 ( Observation Channel )** 房主與加入者各自的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 雙方的 `guesses` 都是一筆：`guesserRole` 房主、`guess` 1234、`result` 4A0B。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 祕密答案欄位、新房間。
   - **預期 RED 原因 ( Expected Red )** `guesses` 沒有房主 1234、4A0B 這一筆，或雙方紀錄不一致。
4. **案例 ( Case )** BE-8.2A 對局結束後同一房號可以開出新房間
   - **唯一測試意圖 ( Intent )** 已結束的房號可以再開一間不同的房間，新進入者是房主。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/enter`
   - **前置條件 ( Arrange )** Fixture 已猜中。保留原 `roomId`。
   - **操作 ( Act )** 玩家C 以 `nickname`「玩家C」、`roomCode`「1234」進入。
   - **觀測通道 ( Observation Channel )** 玩家C 的進入回應。
   - **預期輸出 ( Expected Output )** HTTP 201。`role` 為房主。新的 `room.roomId` 與原 `roomId` 不同。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 原房間是否仍保有祕密答案與猜測紀錄。
   - **預期 RED 原因 ( Expected Red )** 玩家C 不能用 1234 開房，或新的 `roomId` 仍是原對局。
5. **案例 ( Case )** BE-8.2B 原對局在房號釋放後仍可讀
   - **唯一測試意圖 ( Intent )** 原對局的房間識別仍讀得到結束狀態、雙方祕密答案與猜中紀錄。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `GET /api/rooms/:roomId`
   - **前置條件 ( Arrange )** Fixture 已猜中。保留原 `roomId`。
   - **操作 ( Act )** 原房主以自己的 `playerId` 讀取原 `roomId`。
   - **觀測通道 ( Observation Channel )** 這次 `GET` 的回應。
   - **預期輸出 ( Expected Output )** HTTP 200。`status` 為已結束。`ownSecret` 為 5678，`opponentSecret` 為 1234。`guesses` 有一筆：`guesserRole` 房主、`guess` 1234、`result` 4A0B。
   - **必須維持不變 ( Must Stay )** `roomId` 仍是猜中時留下的那個。
   - **本案例不驗證 ( Not Verified )** 新房間的玩家與祕密答案。
   - **預期 RED 原因 ( Expected Red )** 原 `roomId` 讀不到，或已結束的祕密答案與 4A0B 紀錄缺失。

### 情境 BE-9 - 對局中離開或斷線

**對應需求 ( Traces )**：FR-US3-006、SC-008、邊界「斷線立即判落敗，不提供重新連線恢復對局」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-9.1A 對局中的加入者離開後房主因對手離開獲勝
   - **唯一測試意圖 ( Intent )** 加入者在對局中離開，房主因對手離開獲勝。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/leave`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 加入者以自己的 `playerId` 離開。
   - **觀測通道 ( Observation Channel )** 離開的回應，以及房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 離開 HTTP 200。房主讀到 `status` 為已結束。`result.winnerRole` 為房主，`result.reason` 為對手離開。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 雙方祕密答案是否揭曉、心跳逾時、猜中。
   - **預期 RED 原因 ( Expected Red )** 加入者離開後 `status` 仍是對局中，或勝方與原因不是房主、對手離開。
2. **案例 ( Case )** BE-9.1B 加入者離開後房主看得到雙方祕密答案
   - **唯一測試意圖 ( Intent )** 對局中的加入者離開並結束後，房主看得到雙方祕密答案。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/leave`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 加入者以自己的 `playerId` 離開。
   - **觀測通道 ( Observation Channel )** 房主的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 房主的 `ownSecret` 為 5678，`opponentSecret` 為 1234。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 勝方與原因的字面值、房主離開。
   - **預期 RED 原因 ( Expected Red )** 房主讀回沒有 `opponentSecret` 1234，或 `ownSecret` 不是 5678。
3. **案例 ( Case )** BE-9.2 對局中的房主離開後加入者獲勝
   - **唯一測試意圖 ( Intent )** 房主在對局中離開，加入者因對手離開獲勝。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/leave`
   - **前置條件 ( Arrange )** Fixture 對局中。
   - **操作 ( Act )** 房主以自己的 `playerId` 離開。
   - **觀測通道 ( Observation Channel )** 離開的回應，以及加入者的 `GET /api/rooms/:roomId`。
   - **預期輸出 ( Expected Output )** 離開 HTTP 200。加入者讀到 `status` 為已結束。`result.winnerRole` 為加入者，`result.reason` 為對手離開。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 加入者離開、心跳逾時、猜測紀錄的 xAyB。
   - **預期 RED 原因 ( Expected Red )** 房主離開後加入者看到的勝方不是加入者，或原因不是對手離開。
4. **案例 ( Case )** BE-9.3A 加入者心跳逾時後房主因對手離開獲勝
   - **唯一測試意圖 ( Intent )** 時間超過斷線界線後讀取房間，加入者已落敗，房主因對手離開獲勝。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `GET /api/rooms/:roomId`
   - **前置條件 ( Arrange )** Fixture 可控時鐘。
   - **操作 ( Act )** 時間改為 8000。房主讀取房間。
   - **觀測通道 ( Observation Channel )** 房主這次 `GET` 的回應。
   - **預期輸出 ( Expected Output )** HTTP 200。`status` 為已結束。`result.winnerRole` 為房主，`result.reason` 為對手離開。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 加入者心跳被拒的訊息、主動離開、猜中。
   - **預期 RED 原因 ( Expected Red )** 時間 8000 時讀到的 `status` 仍是對局中，或勝方與原因不是房主、對手離開。
5. **案例 ( Case )** BE-9.3B 逾時落敗的加入者不能重連回同一場
   - **唯一測試意圖 ( Intent )** 加入者在斷線落敗後再送心跳，得到不能重連的拒絕。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `POST /api/rooms/:roomId/heartbeat`
   - **前置條件 ( Arrange )** Fixture 可控時鐘。時間先改為 8000，並已由房主讀取過房間，對局已結束。
   - **操作 ( Act )** 加入者以自己的 `playerId` 呼叫心跳。
   - **觀測通道 ( Observation Channel )** 加入者這次心跳的回應。
   - **預期輸出 ( Expected Output )** HTTP 400。`message` 為「對局已結束，無法重新連線。」
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 房主讀取時的勝方欄位、猜中。
   - **預期 RED 原因 ( Expected Red )** 加入者的心跳仍成功，或訊息不是「對局已結束，無法重新連線。」

### 情境 BE-10 - 房間資料寫入後可再讀回

**對應需求 ( Traces )**：FR-G-004、關鍵實體「房間、玩家、祕密答案、猜測紀錄、對局只屬於這一場」

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** BE-10.1 房間寫入後換一條資料庫連線仍讀得到同一場
   - **唯一測試意圖 ( Intent )** 另一個連到同一資料庫的後端，用同一個 `GET` 讀得到剛寫入的房間。
   - **受測部位 ( Subject )** 後端房間 API
   - **受測操作 ( Operation )** `GET /api/rooms/:roomId`
   - **前置條件 ( Arrange )** Fixture 等待房主。另開一條連到同一資料庫的連線，並用它建立第二個後端。
   - **操作 ( Act )** 由第二個後端，以玩家A 的 `playerId` 讀取同一個 `roomId`。
   - **觀測通道 ( Observation Channel )** 第二個後端這次 `GET` 的回應。
   - **預期輸出 ( Expected Output )** HTTP 200。`roomCode` 為 1234，`status` 為等待對手。`players` 只有房主玩家A、`ready` false。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 第二個後端再進入房間、祕密答案、猜測紀錄。
   - **預期 RED 原因 ( Expected Red )** 第二個後端讀不到這個 `roomId`，或讀到的不是等待對手的房主玩家A。

## 前端對局畫面的測試情境 ( Frontend Scenarios )

### 情境 FE-1 - 兩位玩家完成同一場對局

**對應需求 ( Traces )**：使用者故事 1 到 3 的主路徑、FR-US3-005、FR-G-001、NFR-G-001、SC-006

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** FE-1.1 兩位玩家能從進房玩到猜中並看到同一場結果
   - **唯一測試意圖 ( Intent )** 兩位玩家走完進房、設答案、開始、猜中之後，雙方畫面看到同一場結果。
   - **受測部位 ( Subject )** 前端對局畫面
   - **受測操作 ( Operation )** 雙方按「進入房間」；雙方按「設定祕密答案」；房主按「開始對局」；房主按「送出猜測」
   - **前置條件 ( Arrange )** Fixture 兩個對局頁。
   - **操作 ( Act )** 玩家A 在「暱稱」填玩家A、在「房號」填該房號並按「進入房間」。玩家B 以暱稱玩家B、同一房號按「進入房間」。房主在「祕密答案」填 5678 並按「設定祕密答案」。加入者在「祕密答案」填 1234 並按「設定祕密答案」。房主按「開始對局」。房主在「猜測」填 1234 並按「送出猜測」。
   - **觀測通道 ( Observation Channel )** 雙方畫面上的「對局結果」「你的祕密答案」「對手的祕密答案」「猜測紀錄」。四個區塊去掉首尾空白後比對；猜測紀錄中間的換行折成一個空白。
   - **預期輸出 ( Expected Output )** 房主畫面：對局結果為「房主獲勝」，你的祕密答案為「5678」，對手的祕密答案為「1234」，猜測紀錄為「房主 1234 4A0B」。加入者畫面：對局結果為「房主獲勝」，你的祕密答案為「1234」，對手的祕密答案為「5678」，猜測紀錄為「房主 1234 4A0B」。
   - **必須維持不變 ( Must Stay )** 無。
   - **本案例不驗證 ( Not Verified )** 房號格式、空暱稱、房間已滿、未輪到的猜測、離開、斷線、資料庫再讀。
   - **預期 RED 原因 ( Expected Red )** 走完操作後，任一方畫面還沒有上述四個區塊的對應文字。
