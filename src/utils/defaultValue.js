export const pptDefaultValue = `# 这里是第一页
以及一些基本的自我介绍

----
### 这里是第二页
- 这里有内容
- 这里有内容
- 这里有内容

----

没了，__谢谢__`

export const flowDefaultValue = `1. 开始
2. 输入数据
3. 数据处理
数据清洗、数据校对
4. 数据展示
5. 结束

1->2->3
2->|连线|4->5
3->5`

export const markdownDefaultValue = `# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

**这是加粗的文字**
*这是倾斜的文字*

>这是引用的内容
>>这是引用的内容

#### 这是分割线
---
[超链接名]（超链接地址）
[github地址](https://github.com/ufresh2013/Mars)
<br/>

![图片alt](图片地址 “图片title”)
![](https://ufresh2013.github.io/2018/10/07/DOM/6.jpg)

#### 表格

| 功能 | 支持情况 |
|------|----------|
| 标题 | ✅ |
| 列表 | ✅ |
| 代码块 | ✅ |
| 数学公式 | ✅ |

#### 列表
- 列表内容
  - item1
  - item2
+ 列表内容
* 列表内容
`

export const reportDefaultValue = `{card}
# 1月销售额
100
# 2月销售额
200
# 3月销售额
300
# 4月销售额
400


{pie}
# 饼图标题
- 月份[x]
1月 2月 3月 4月
- 销售额[y]
100 200 300 400


{bar}
# 柱状图标题
- 月份[x]
1月 2月 3月 4月
- 成本[y]
50 100 150 200
- 销售额[y]
100 200 300 400


{rowBar}
# 条形图标题
- 月份[x]
1月 2月 3月 4月
- 成本[y]
50 100 150 200
- 销售额[y]
100 200 300 400


{line}
# 折线图标题
- 月份[x]
1月 2月 3月 4月
- 成本[y]
50 100 150 200
- 销售额[y]
100 200 300 400
`
