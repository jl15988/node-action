# NODE-ACTION 开发规范

## 1. 接口类

在类上添加 type = 'action' 表明当前是一个接口类（接口类名称默认会添加到请求路径中），项目中提供了 ModuleType 类，可直接选择其中的类型

包括：action（html）、jsonAction（json）、textAction（纯文本）

```js
class BingImg {

    type = ModuleType.action;

}
```

## 2. 接口方法

接口方法通过创建 GetMap 和 PostMap 来创建，你可以传递请求路径，如果不传则默认属性名则是请求路径

```js
class BingImg {

    type = ModuleType.jsonAction;

    // 没有定义请求路径，默认请求路径为 /getData
    getData = new GetMap(() => {
        
    })

    // 自定义请求路径为 /set
    setData = new PostMap('/set', () => {
        
    })
}
```

## 3. 参数

为方便传参，规定接口方法的参数必须都通过大括号包括，如：

```js
class BingImg {

    getData = new GetMap(({number}) => {

    })
}
```

## 4. 全局异常处理

为方便开发者处理异常，在 advice 目录下设置了全局异常处理类，用于处理全局的异常，其中方法名应对应对应的异常类名称，而 common 方法将处理其他异常

```js
class GlobalErrorAdvice {
    CustomError() {

    }
    
    common() {
        
    }
}
```

## 5. 配置

通过在项目根目录创建 node-action-config.js 来对 node-action 进行相关配置

```js
exports.config = {
    // 端口号
    port: 9300,
    // 接口类扫描路径
    actionPath: 'src/actions',
    // 全局异常处理类
    errorAdvice: 'src/advice/GlobalErrorAdvice',
    // 是否允许跨域
    allowCross: true
}
```
