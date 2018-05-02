import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'

// 默认横向跳转
// 如果即将要跳转到的页面需要其它跳转方式
// 可在路由参数中传入 transition参数，可选值有：forHorizontal,forVertical,forFadeFromBottomAndroid,forFade
// 示例定义竖向跳转：this.props.navigation.push('ProdDetail', {'prodID': item.id, 'transition':'forVertical'})
const screenInterpolater = (sceneProps) => {
    const { route } = sceneProps.scene;
    const params = route.params || {};
    const transition = params.transition || 'forHorizontal';
    return CardStackStyleInterpolator[transition](sceneProps);
};

/*

     --- StackNavigator配置 ---

     initialRouteName - 导航器组件中初始显示页面的路由名称，如果不设置，则默认第一个路由页面为初始显示页面
     initialRouteParams - 给初始路由的参数，在初始显示的页面中可以通过 this.props.navigation.state.params 来获取
     navigationOptions - 路由页面的配置选项，它会被RouteConfigs和组件页面中的 navigationOptions 的对应属性覆盖。
     paths - 路由中设置的路径的覆盖映射配置

     mode - 页面跳转方式，有 card 和 modal 两种，默认为 card ：
     -- card - 原生系统默认的的跳转
     -- modal - 只针对iOS平台，模态跳转

     headerMode - 页面跳转时，头部的动画模式，有 float 、 screen 、 none 三种：
     -- float - 渐变，类似iOS的原生效果
     -- screen - 标题与屏幕一起淡入淡出
     -- none - 没有动画

     cardStyle - 为各个页面设置统一的样式，比如背景色，字体大小等
     transitionConfig - 配置页面跳转的动画，覆盖默认的动画效果：forHorizontal,forVertical,forFadeFromBottomAndroid,forFade
     onTransitionStart - 页面跳转动画即将开始时调用
     onTransitionEnd - 页面跳转动画一旦完成会马上调用

 */
const StackNavigationConfig = {
    initialRouteName: 'MainTab',
    headerMode: 'float',
    transitionConfig:() => ({
        //screenInterpolater: screenInterpolater
        screenInterpolater: CardStackStyleInterpolator.forHorizontal
    })
}

export default StackNavigationConfig;
