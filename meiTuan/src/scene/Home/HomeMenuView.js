import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import PageControl from 'react-native-page-control'
import screen from '../../common/screen'
import system from '../../common/system'
import color from '../../widget/color'
import HomeMenuItem from './HomeMenuItem'

export default class HomeMenuView extends PureComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            currentPage: 0,
        }
    }

    onScroll(e){
        let x = e.nativeEvent.contentOffset.x
        let currentPage = Math.round(x/screen.width)

        if (this.state.currentPage != currentPage) {
            this.setState({currentPage})
        }
    }

    render(){
        let {menuInfos, onMenuSelected} = this.props

        let menuItems = menuInfos.map((info, i) =>(
            <HomeMenuItem 
                key={info.title}
                title={info.title}
                icon={info.icon}
                onPress={() => {
                    onMenuSelected && onMenuSelected(i)
                }}
            />
        ))

        let menuViews = []
        let pageCount = Math.ceil(menuItems.length / 10)

        for (let i = 0; i < pageCount; i++) {
            let items = menuItems.slice(i*10, i*10+10)
            let menuView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            )
            menuViews.push(menuView)
        }

        return(
            <View style={styles.container}>
                <ScrollView
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onScroll={(e) => this.onScroll(e)}
                >
                    <View style={styles.menuContainer}>
                        {menuViews}
                    </View>
                </ScrollView>

                <PageControl 
                    style={styles.PageControl}
                    numberOfPages={pageCount}
                    hidesForSinglePage
                    currentPage={this.state.currentPage}
                    pageIndicatorTintColor='gray'
                    currentPageIndicatorTintColor={color.primary}
                    indicatorSize={{width: 8, height: 8}}
                />
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    menuContainer: {
        flexDirection: 'row',
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screen.width,
    },
    PageControl: {
        margin: 10,
    }
})