# 測試計劃 ( Test Plan )：{{FEATURE_NAME_1}}

## 系統介面 ( System Interfaces )

| 介面 | 種類 | 測試層級 | 案例數 |
| --- | --- | --- | --- |
| {{INTERFACE_NAME_1}} | {{INTERFACE_KIND_1}} | {{INTERFACE_LEVEL_1}} | {{INTERFACE_CASE_COUNT_1}} |
| {{INTERFACE_NAME_2}} | {{INTERFACE_KIND_2}} | {{INTERFACE_LEVEL_2}} | {{INTERFACE_CASE_COUNT_2}} |

一個案例只有一個**唯一測試意圖**。厚案例拆成 A/B/C 這類原子案例。TDD 每次只取下方順序的下一個原子案例，先看到該案例的預期 RED，再寫讓它通過的實作。

**對應需求**只索引規格。斷言要用的字面值寫在 Fixture、操作與預期輸出。

每個案例的 oracle 分成三欄：**觀測通道**是從哪一次回應讀，**預期輸出**是這次要出現的新結果，**必須維持不變**是這次要同時斷言、且與操作前相同的欄位。沒有要守住的欄位就寫「無」。**本案例不驗證**的項目不要寫進斷言。

### 介面 1 - {{INTERFACE_TITLE_1}}（種類 ( Kind )：{{INTERFACE_KIND_LABEL_1}}）

{{INTERFACE_SUMMARY_1}}

**呼叫契約 ( Call Contract )**：{{CALL_CONTRACT_1}}

**公開介面 ( Public Interface )**：

- {{PUBLIC_OPERATION_1}}
- {{PUBLIC_OPERATION_2}}
- {{PUBLIC_OPERATION_3}}
- {{PUBLIC_OPERATION_4}}
- {{PUBLIC_OPERATION_5}}
- {{PUBLIC_OPERATION_6}}
- {{PUBLIC_OPERATION_7}}

**本介面涵蓋 ( Covered Here )**：{{COVERED_HERE_1}}

**留給其他介面 ( Left to Other Interfaces )**：{{LEFT_TO_OTHERS_1}}

### 介面 2 - {{INTERFACE_TITLE_2}}（種類 ( Kind )：{{INTERFACE_KIND_LABEL_2}}）

{{INTERFACE_SUMMARY_2}}

**呼叫契約 ( Call Contract )**：{{CALL_CONTRACT_2}}

**公開介面 ( Public Interface )**：

- {{PUBLIC_OPERATION_8}}
- {{PUBLIC_OPERATION_9}}
- {{PUBLIC_OPERATION_10}}
- {{PUBLIC_OPERATION_11}}
- {{PUBLIC_OPERATION_12}}

**本介面涵蓋 ( Covered Here )**：{{COVERED_HERE_2}}

**留給其他介面 ( Left to Other Interfaces )**：{{LEFT_TO_OTHERS_2}}

## 共用 Arrange Fixtures

案例的前置條件引用這裡的 Fixture，並保留 Fixture 寫明的 `playerId` 與 `roomId`。

1. **Fixture {{FIXTURE_NAME_1}}**：{{FIXTURE_BODY_1}}
2. **Fixture {{FIXTURE_NAME_2}}**：{{FIXTURE_BODY_2}}
3. **Fixture {{FIXTURE_NAME_3}}**：{{FIXTURE_BODY_3}}
4. **Fixture {{FIXTURE_NAME_4}}**：{{FIXTURE_BODY_4}}
5. **Fixture {{FIXTURE_NAME_5}}**：{{FIXTURE_BODY_5}}
6. **Fixture {{FIXTURE_NAME_6}}**：{{FIXTURE_BODY_6}}
7. **Fixture {{FIXTURE_NAME_7}}**：{{FIXTURE_BODY_7}}
8. **Fixture {{FIXTURE_NAME_8}}**：{{FIXTURE_BODY_8}}

## TDD 順序 ( Atomic Order )

依這個順序，一次只做一個原子案例：

1. {{ATOMIC_ORDER_1}}
2. {{ATOMIC_ORDER_2}}
3. {{ATOMIC_ORDER_3}}
4. {{ATOMIC_ORDER_4}}
5. {{ATOMIC_ORDER_5}}
6. {{ATOMIC_ORDER_6}}
7. {{ATOMIC_ORDER_7}}
8. {{ATOMIC_ORDER_8}}
9. {{ATOMIC_ORDER_9}}
10. {{ATOMIC_ORDER_10}}
11. {{ATOMIC_ORDER_11}}
12. {{ATOMIC_ORDER_12}}
13. {{ATOMIC_ORDER_13}}
14. {{ATOMIC_ORDER_14}}
15. {{ATOMIC_ORDER_15}}
16. {{ATOMIC_ORDER_16}}
17. {{ATOMIC_ORDER_17}}
18. {{ATOMIC_ORDER_18}}
19. {{ATOMIC_ORDER_19}}
20. {{ATOMIC_ORDER_20}}
21. {{ATOMIC_ORDER_21}}
22. {{ATOMIC_ORDER_22}}
23. {{ATOMIC_ORDER_23}}
24. {{ATOMIC_ORDER_24}}
25. {{ATOMIC_ORDER_25}}
26. {{ATOMIC_ORDER_26}}
27. {{ATOMIC_ORDER_27}}
28. {{ATOMIC_ORDER_28}}
29. {{ATOMIC_ORDER_29}}
30. {{ATOMIC_ORDER_30}}
31. {{ATOMIC_ORDER_31}}
32. {{ATOMIC_ORDER_32}}
33. {{ATOMIC_ORDER_33}}

## {{SCENARIO_SECTION_1}}

### 情境 {{SCENARIO_ID_1}} - {{SCENARIO_TITLE_1}}

**對應需求 ( Traces )**：{{TRACES_1}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_1}} {{CASE_TITLE_1}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_1}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_1}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_1}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_1}}
   - **操作 ( Act )** {{CASE_ACT_1}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_1}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_1}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_1}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_1}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_1}}
2. **案例 ( Case )** {{CASE_ID_2}} {{CASE_TITLE_2}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_2}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_2}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_2}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_2}}
   - **操作 ( Act )** {{CASE_ACT_2}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_2}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_2}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_2}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_2}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_2}}

### 情境 {{SCENARIO_ID_2}} - {{SCENARIO_TITLE_2}}

**對應需求 ( Traces )**：{{TRACES_2}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_3}} {{CASE_TITLE_3}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_3}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_3}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_3}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_3}}
   - **操作 ( Act )** {{CASE_ACT_3}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_3}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_3}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_3}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_3}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_3}}
2. **案例 ( Case )** {{CASE_ID_4}} {{CASE_TITLE_4}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_4}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_4}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_4}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_4}}
   - **操作 ( Act )** {{CASE_ACT_4}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_4}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_4}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_4}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_4}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_4}}
3. **案例 ( Case )** {{CASE_ID_5}} {{CASE_TITLE_5}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_5}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_5}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_5}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_5}}
   - **操作 ( Act )** {{CASE_ACT_5}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_5}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_5}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_5}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_5}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_5}}
4. **案例 ( Case )** {{CASE_ID_6}} {{CASE_TITLE_6}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_6}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_6}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_6}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_6}}
   - **操作 ( Act )** {{CASE_ACT_6}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_6}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_6}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_6}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_6}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_6}}

### 情境 {{SCENARIO_ID_3}} - {{SCENARIO_TITLE_3}}

**對應需求 ( Traces )**：{{TRACES_3}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_7}} {{CASE_TITLE_7}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_7}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_7}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_7}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_7}}
   - **操作 ( Act )** {{CASE_ACT_7}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_7}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_7}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_7}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_7}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_7}}

### 情境 {{SCENARIO_ID_4}} - {{SCENARIO_TITLE_4}}

**對應需求 ( Traces )**：{{TRACES_4}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_8}} {{CASE_TITLE_8}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_8}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_8}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_8}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_8}}
   - **操作 ( Act )** {{CASE_ACT_8}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_8}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_8}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_8}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_8}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_8}}
2. **案例 ( Case )** {{CASE_ID_9}} {{CASE_TITLE_9}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_9}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_9}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_9}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_9}}
   - **操作 ( Act )** {{CASE_ACT_9}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_9}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_9}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_9}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_9}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_9}}
3. **案例 ( Case )** {{CASE_ID_10}} {{CASE_TITLE_10}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_10}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_10}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_10}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_10}}
   - **操作 ( Act )** {{CASE_ACT_10}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_10}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_10}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_10}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_10}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_10}}

### 情境 {{SCENARIO_ID_5}} - {{SCENARIO_TITLE_5}}

**對應需求 ( Traces )**：{{TRACES_5}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_11}} {{CASE_TITLE_11}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_11}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_11}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_11}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_11}}
   - **操作 ( Act )** {{CASE_ACT_11}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_11}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_11}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_11}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_11}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_11}}
2. **案例 ( Case )** {{CASE_ID_12}} {{CASE_TITLE_12}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_12}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_12}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_12}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_12}}
   - **操作 ( Act )** {{CASE_ACT_12}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_12}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_12}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_12}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_12}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_12}}
3. **案例 ( Case )** {{CASE_ID_13}} {{CASE_TITLE_13}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_13}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_13}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_13}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_13}}
   - **操作 ( Act )** {{CASE_ACT_13}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_13}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_13}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_13}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_13}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_13}}

### 情境 {{SCENARIO_ID_6}} - {{SCENARIO_TITLE_6}}

**對應需求 ( Traces )**：{{TRACES_6}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_14}} {{CASE_TITLE_14}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_14}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_14}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_14}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_14}}
   - **操作 ( Act )** {{CASE_ACT_14}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_14}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_14}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_14}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_14}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_14}}
2. **案例 ( Case )** {{CASE_ID_15}} {{CASE_TITLE_15}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_15}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_15}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_15}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_15}}
   - **操作 ( Act )** {{CASE_ACT_15}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_15}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_15}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_15}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_15}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_15}}
3. **案例 ( Case )** {{CASE_ID_16}} {{CASE_TITLE_16}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_16}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_16}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_16}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_16}}
   - **操作 ( Act )** {{CASE_ACT_16}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_16}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_16}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_16}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_16}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_16}}

### 情境 {{SCENARIO_ID_7}} - {{SCENARIO_TITLE_7}}

**對應需求 ( Traces )**：{{TRACES_7}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_17}} {{CASE_TITLE_17}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_17}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_17}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_17}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_17}}
   - **操作 ( Act )** {{CASE_ACT_17}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_17}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_17}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_17}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_17}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_17}}
2. **案例 ( Case )** {{CASE_ID_18}} {{CASE_TITLE_18}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_18}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_18}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_18}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_18}}
   - **操作 ( Act )** {{CASE_ACT_18}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_18}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_18}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_18}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_18}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_18}}
3. **案例 ( Case )** {{CASE_ID_19}} {{CASE_TITLE_19}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_19}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_19}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_19}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_19}}
   - **操作 ( Act )** {{CASE_ACT_19}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_19}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_19}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_19}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_19}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_19}}
4. **案例 ( Case )** {{CASE_ID_20}} {{CASE_TITLE_20}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_20}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_20}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_20}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_20}}
   - **操作 ( Act )** {{CASE_ACT_20}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_20}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_20}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_20}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_20}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_20}}
5. **案例 ( Case )** {{CASE_ID_21}} {{CASE_TITLE_21}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_21}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_21}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_21}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_21}}
   - **操作 ( Act )** {{CASE_ACT_21}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_21}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_21}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_21}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_21}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_21}}

### 情境 {{SCENARIO_ID_8}} - {{SCENARIO_TITLE_8}}

**對應需求 ( Traces )**：{{TRACES_8}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_22}} {{CASE_TITLE_22}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_22}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_22}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_22}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_22}}
   - **操作 ( Act )** {{CASE_ACT_22}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_22}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_22}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_22}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_22}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_22}}
2. **案例 ( Case )** {{CASE_ID_23}} {{CASE_TITLE_23}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_23}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_23}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_23}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_23}}
   - **操作 ( Act )** {{CASE_ACT_23}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_23}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_23}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_23}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_23}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_23}}
3. **案例 ( Case )** {{CASE_ID_24}} {{CASE_TITLE_24}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_24}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_24}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_24}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_24}}
   - **操作 ( Act )** {{CASE_ACT_24}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_24}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_24}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_24}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_24}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_24}}
4. **案例 ( Case )** {{CASE_ID_25}} {{CASE_TITLE_25}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_25}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_25}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_25}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_25}}
   - **操作 ( Act )** {{CASE_ACT_25}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_25}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_25}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_25}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_25}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_25}}
5. **案例 ( Case )** {{CASE_ID_26}} {{CASE_TITLE_26}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_26}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_26}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_26}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_26}}
   - **操作 ( Act )** {{CASE_ACT_26}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_26}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_26}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_26}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_26}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_26}}

### 情境 {{SCENARIO_ID_9}} - {{SCENARIO_TITLE_9}}

**對應需求 ( Traces )**：{{TRACES_9}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_27}} {{CASE_TITLE_27}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_27}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_27}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_27}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_27}}
   - **操作 ( Act )** {{CASE_ACT_27}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_27}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_27}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_27}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_27}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_27}}
2. **案例 ( Case )** {{CASE_ID_28}} {{CASE_TITLE_28}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_28}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_28}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_28}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_28}}
   - **操作 ( Act )** {{CASE_ACT_28}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_28}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_28}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_28}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_28}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_28}}
3. **案例 ( Case )** {{CASE_ID_29}} {{CASE_TITLE_29}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_29}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_29}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_29}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_29}}
   - **操作 ( Act )** {{CASE_ACT_29}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_29}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_29}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_29}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_29}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_29}}
4. **案例 ( Case )** {{CASE_ID_30}} {{CASE_TITLE_30}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_30}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_30}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_30}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_30}}
   - **操作 ( Act )** {{CASE_ACT_30}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_30}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_30}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_30}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_30}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_30}}
5. **案例 ( Case )** {{CASE_ID_31}} {{CASE_TITLE_31}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_31}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_31}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_31}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_31}}
   - **操作 ( Act )** {{CASE_ACT_31}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_31}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_31}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_31}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_31}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_31}}

### 情境 {{SCENARIO_ID_10}} - {{SCENARIO_TITLE_10}}

**對應需求 ( Traces )**：{{TRACES_10}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_32}} {{CASE_TITLE_32}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_32}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_32}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_32}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_32}}
   - **操作 ( Act )** {{CASE_ACT_32}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_32}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_32}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_32}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_32}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_32}}

## {{SCENARIO_SECTION_2}}

### 情境 {{SCENARIO_ID_11}} - {{SCENARIO_TITLE_11}}

**對應需求 ( Traces )**：{{TRACES_11}}

**測試案例 ( Test Cases )**：

1. **案例 ( Case )** {{CASE_ID_33}} {{CASE_TITLE_33}}
   - **唯一測試意圖 ( Intent )** {{CASE_INTENT_33}}
   - **受測部位 ( Subject )** {{CASE_SUBJECT_33}}
   - **受測操作 ( Operation )** {{CASE_OPERATION_33}}
   - **前置條件 ( Arrange )** {{CASE_ARRANGE_33}}
   - **操作 ( Act )** {{CASE_ACT_33}}
   - **觀測通道 ( Observation Channel )** {{CASE_CHANNEL_33}}
   - **預期輸出 ( Expected Output )** {{CASE_EXPECTED_33}}
   - **必須維持不變 ( Must Stay )** {{CASE_MUST_STAY_33}}
   - **本案例不驗證 ( Not Verified )** {{CASE_NOT_VERIFIED_33}}
   - **預期 RED 原因 ( Expected Red )** {{CASE_EXPECTED_RED_33}}
