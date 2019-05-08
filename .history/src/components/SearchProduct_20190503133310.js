import React, { Component } from 'react';
import {
    Dimensions,
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Button,
    StatusBar, TouchableOpacity, Platform
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import SearchHeader from 'react-native-search-header';

const DEVICE_WIDTH = Dimensions.get(`window`).width;


 class SearchProduct extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <View style = { styles.container }>
                
                <View style = { styles.header }>
                <TouchableOpacity style={styles.search} disabled={true} onPress = {() => /* */}>
              <Icon
                  name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                  color="#FFF"
                  size={24}
              />
            </TouchableOpacity>
                </View>
                <SearchHeader
                    ref = {(searchHeader) => {
                        this.searchHeader = searchHeader;
                    }}
                    placeholder = 'Buscar producto'
                    placeholderColor = 'gray'
                    onClear = {() => {
                        console.log(`Clearing input!`);
                    }}
                    onGetAutocompletions = {async (text) => {
                        if (text) {
                            const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                                method: `get`
                            });
                            const data = await response.json();
                            return data[1];
                        } else {
                            return [];
                        }
                    }}
                />
                <View style = { styles.button }>
                    <Button
                        title = 'Open Search'
                        color = '#f5fcff'
                        onPress = {() => this.searchHeader.show()}
                    />
                </View>
                <View style = { styles.button }>
                    <Button
                        title = 'Clear'
                        color = '#f5fcff'
                        onPress = {() => {
                            this.searchHeader.clear();
                        }}
                    />
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    },
   
  
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        height: 56,
        marginBottom: 6,
        backgroundColor: '#00bcd4'
    },
    label: {
        flexGrow: 1,
        fontSize: 20,
        fontWeight: `600`,
        textAlign: `left`,
        marginVertical: 8,
        paddingVertical: 3,
        color: `#f5fcff`,
        backgroundColor: `transparent`
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        marginTop: 40,
        borderRadius: 2,
        backgroundColor: `#ff5722`
    }
});

export default withNavigation(SearchProduct);