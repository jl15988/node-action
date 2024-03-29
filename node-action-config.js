exports.config = {
    // 端口号
    port: 9300,
    // 接口类扫描路径
    actionPath: 'src/actions',
    // 全局异常处理类
    errorAdvice: 'src/advice/GlobalErrorAdvice'
}
