# NODE-ACTION 开发规范

## 1. 接口类

在类上添加 type = 'action' 表明当前是一个接口类，项目中提供了 ModuleType 类，可直接选择其中的类型

```js
class BingImg {

    type = ModuleType.action;

}
```

## 2. 方法名

方法名以 $$ 开头将被识别为接口方法

```js
class BingImg {

    $$getData() {
        
    }
}
```

## 3. 参数

为方便传参，规定接口方法的参数必须都通过大括号包括，如：

```js
class BingImg {

    $$getData({number}) {

    }
}
```

## 4. 数据返回

接口方法中的逻辑代码，必须通过 Promise 返回，如：

```js
class BingImg {

    $$getData({number, format}) {
        return new Promise(resolve => {
            resolve('')
        })
    }
}
```
