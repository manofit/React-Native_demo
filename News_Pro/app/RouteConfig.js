import MainTab from './TabNavigator'
import NewsDetail from './pages/subPages/NewsDetail'
import VideoDetail from './pages/subPages/VideoDetail'
import NewsSearch from './pages/subPages/NewsSearch'

/*

    --- 路由配置 ---

   * 所有组件都必须在这里注册
   * 在这里设置的navigationOptions的权限 > 对应页面里面的 static navigationOptions的设置 > StackNavigator()第二个参数里navigationOptions的设置
   * 该配置文件会在App.js里的StackNavigator(导航组件)里使用。

*/
const RouteConfig = {
    MainTab: {
        screen:MainTab,
        //navigationOptions: ({navigation}) => ({header: null})
    },
    NewsDetail: {
        screen: NewsDetail,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    },
    VideoDetail: {
        screen: VideoDetail,
        navigationOptions: ({navigation}) => ({header:null, gesturesEnable:true})
    },
    NewsSearch: {
        screen: NewsSearch,
        navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
    }
}

export default RouteConfig;