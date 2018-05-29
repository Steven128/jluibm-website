enroll - API文档
===
#查看有没有可报名的活动
<br><br>
请求方式
<br>
>GET
<br>
---
URL
<br>
>https://www.jluibm.cn/jluibm-wx/check-enroll.php?request=getActiveList
<br>
-------
返回结果（JSON示例）
<br>
```
[
    {
        activity_name: "test1",
        date: "2018-05-01",
        enroll_id: "enr_180501",
        hold: "IBM俱乐部,吉大科协",
        quantity: "60",
        remarks: "",
        state: "1"
    },
    {
        activity_name: "test2",
        date: "2018-05-20",
        enroll_id: "enr_180520",
        hold: "IBM俱乐部",
        quantity: "30",
        remarks: "",
        state: "0"
    }
]
```
返回字段说明
<table>
    <thead>
        <tr>
            <td>字段</td><td>说明</td>
        </tr>
    </thead>
    <tbody>
        <tr><td>activity_name</td><td>活动名称</td></tr>
        <tr><td>date</td><td>时间（格式yyyy-MM-dd）</td></tr>
        <tr><td>enroll_id</td><td>活动ID</td></tr>
        <tr><td>hold</td><td>举办的社团名称</td></tr>
        <tr><td>quantity</td><td>人数</td></tr>
        <tr><td>remarks</td><td>备注</td></tr>
        <tr><td>state</td><td>状态（0为未开始报名，1为正在报名期间，2为已结束报名）</td></tr>
    </tbody>
</table>

#检查是否已经报名过了
<br><br>
请求方式
<br>
>GET
<br>
---
URL
<br>
>https://www.jluibm.cn/jluibm-wx/check-enroll.php?request=checkAlready&{}
<br>
-------
请求参数
<br>

<table>
    <thead>
        <tr>
            <td>字段</td><td>说明</td>
        </tr>
    </thead>
    <tbody>
        <tr><td>number</td><td>学生的学号</td></tr>
        <tr><td>enroll_id</td><td>活动ID</td></tr>
    </tbody>
</table>
<br>

返回结果（JSON示例）

>已经报名过了
<br>
`
{ message: "has_enrolled" }
`
<br>
人数已满，不能报名了
<br>
`
{ message: "not-allowed" }
`
<br>
可以报名
<br>
`
{ message: "enroll_allowed" }
`
<br><br>

#提交报名信息
<br>
请求方式
<br>
>POST
<br>
---
URL
<br>
>https://www.jluibm.cn/jluibm-wx/enroll.php
<br>
-------
请求参数
<br>
<table>
    <thead>
        <tr>
            <td>字段</td><td>解释</td><td>参数说明</td>
        </tr>
    </thead>
    <tbody>
        <tr><td>request</td><td>请求值</td><td>submit</td></tr>
        <tr><td>enroll_id</td><td>活动ID</td><td></td></tr>
        <tr><td>submitTime</td><td>提交时间</td><td>datetime格式（yyyy-MM-dd HH:mm:ss）</td></tr>
        <tr><td>name</td><td>姓名</td><td></td></tr>
        <tr><td>number</td><td>学号</td><td>8位字符串</td></tr>
        <tr><td>college</td><td>学院</td><td></td></tr>
        <tr><td>gender</td><td>性别</td><td>男为male，女为female</td></tr>
        <tr><td>grade</td><td>年级</td><td>一位数字，大一为1，大二为2，大三为3，大四为4</td></tr>
        <tr><td>qq</td><td>QQ号码</td><td>字符串，5～15位</td></tr>
        <tr><td>comeFrom</td><td>来自哪个社团</td><td>多个社团名称用英文逗号隔开</td></tr>
    </tbody>
</table>

返回结果（JSON示例）
>存在该学生
<br>
`
{ message: "already_exists" }
`
<br>
报名失败
<br>
`
{ message: "error" }
`
<br>
报名成功
<br>
`
{ message: "success" }
`