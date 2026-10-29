# 学习模块

手机上每天三门，一门大约二十分钟：商业模式、英语、泰语。

正文是明文 JSON，不加密。页面从 `/learn/data/` 读取，开发和构建都由 `vite.config.js` 里的 `learnStatic` 提供（和日记的 `diaryStatic` 一样：开发时中间件按文件响应，`closeBundle` 把整个 `learn/` 拷进 `dist/learn`）。没有对应文件的地址仍走 SPA。

## 每天怎么发

时区：**Asia/Shanghai**。每天 **10:00** 由学习助手提交当天内容。本仓库不生成课文，也不跑定时任务：内容还没交上来时，定时检查只会空转报红。

一篇一天，做两件事：

1. 新建目录 `learn/data/YYYY-MM-DD/`，放入 `business.json`、`english.json`、`thai.json`。
2. 在 `learn/data/index.json` 的 `entries` **最前面**加一条（新的在上）。`title`、`minutes` 和三份课文保持一致。

日期是上海的日历日，用在 URL 里：

- `/learn` 当天三门入口
- `/learn/business`、`/learn/english`、`/learn/thai` 会转到当天
- `/learn/business/2026-10-29`（英语、泰语同样）

## index.json

```json
{
  "entries": [
    {
      "date": "2026-10-29",
      "day": 1,
      "subjects": {
        "business": { "title": "街边奶茶店", "minutes": 20 },
        "english": { "title": "日常开场", "minutes": 20 },
        "thai": { "title": "基础招呼", "minutes": 20 }
      }
    }
  ]
}
```

`day` 从 1 累加。某一门当天没有课时，不要写空文件充数；索引里也不要挂这门。页面会显示「还没放上来」。

## business.json

案例卡，不朗读。

```json
{
  "date": "2026-10-29",
  "day": 1,
  "title": "街边奶茶店",
  "minutes": 20,
  "case": {
    "background": "这门生意是什么，写短段落。",
    "howMoney": "钱从哪来。",
    "keyCosts": "钱花在哪。",
    "keyRisks": "会在哪摔。",
    "questions": ["问自己的一句", "第二句", "第三句"]
  }
}
```

## english.json

`lang` 固定 `en-US`。喇叭朗读 `speak`；例句按钮朗读 `example`。意思用短中文，别写成词表说明。

喇叭先用手机自带语音（有对应 `en` / `th` 嗓音时）。没有嗓音，或朗读报错、有声无音时，改播在线音频：泰语按百度 → 有道 → 谷歌，英语按有道 → 百度 → 谷歌。都失败会提示「暂时播不了，请检查网络或稍后重试」。

```json
{
  "date": "2026-10-29",
  "day": 1,
  "title": "日常开场",
  "minutes": 20,
  "lang": "en-US",
  "words": [
    {
      "term": "schedule",
      "meaning": "日程安排",
      "example": "What's your schedule today?",
      "speak": "schedule"
    }
  ],
  "sentences": [
    {
      "en": "What's your schedule today?",
      "zh": "你今天日程怎么安排？",
      "speak": "What's your schedule today?"
    }
  ],
  "scenarios": [
    {
      "title": "早会上问同事日程",
      "setting": "在哪里、跟谁、干什么。一两句中文。",
      "lines": [
        {
          "role": "你",
          "en": "What's your schedule today?",
          "zh": "你今天日程怎么安排？",
          "speak": "What's your schedule today?"
        }
      ]
    }
  ],
  "task": "把上面 4 句连着说一遍并录音自听"
}
```

## thai.json

`lang` 固定 `th-TH`。`roman` 写在泰文下面，给手机上看。`speak` 用泰文，不要用罗马音去朗读。

```json
{
  "date": "2026-10-29",
  "day": 1,
  "title": "基础招呼",
  "minutes": 20,
  "lang": "th-TH",
  "tip": "今天怎么跟读，一两句人话。",
  "items": [
    { "th": "สวัสดี", "roman": "sa-wat-dee", "zh": "你好", "speak": "สวัสดี" }
  ],
  "scenarios": [
    {
      "title": "进店打招呼",
      "setting": "在哪里、跟谁、干什么。一两句中文。",
      "lines": [
        {
          "role": "你（男）",
          "th": "สวัสดีครับ",
          "roman": "sa-wat-dee khrap",
          "zh": "你好（男）",
          "speak": "สวัสดีครับ"
        }
      ]
    }
  ],
  "task": "三句连说两遍，录一条给自己听"
}
```

英语和泰语都用 `scenarios`，不再单写 `scenes`。一句一个 `speak`。`ครับ` 和 `ค่ะ` 要分成两条，喇叭才能读准。泰语行用 `th` `roman` `zh` `speak` `role`，不要用 `en`。

## 字段别写丢

| 文件 | 必填 |
| --- | --- |
| 索引一条 | `date` `day` `subjects` |
| 一门 | `date` `day` `title` `minutes` |
| 商业 | `case.background` `case.howMoney` `case.keyCosts` `case.keyRisks` `case.questions` |
| 英语 | `lang` `words[]`（`term` `meaning` `example` `speak`）`sentences[]`（`en` `zh` `speak`）`scenarios[]` `task` |
| 泰语 | `lang` `tip` `items[]`（`th` `roman` `zh` `speak`）`scenarios[]` `task` |

`scenarios[]` 每条要有 `title`、`setting`、`lines`。英语对白行是 `role` `en` `zh` `speak`。泰语对白行是 `role` `th` `roman` `zh` `speak`。
