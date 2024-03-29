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
