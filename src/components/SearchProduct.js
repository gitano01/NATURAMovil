import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    TouchableOpacity, Platform
} from 'react-native';
import SearchHeader from 'react-native-search-header';
import Icon from "react-native-vector-icons/Ionicons";
import {withNavigation} from 'react-navigation';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    },
    status: {
        zIndex: 10,
        elevation: 2,
        width: DEVICE_WIDTH,
        height: 21,
        backgroundColor: '#0097a7'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        height: 56,
        marginBottom: 6,
        backgroundColor: '#F98806'
    },
    search:{
        position: 'relative',
        top: -8,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    label: {
        flexGrow: 1,
        fontSize: 20,
        fontWeight: `600`,
        textAlign: `left`,
        marginVertical: 8,
        paddingVertical: 3,
        color: `#C0c0c0`,
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

 class SearchProduct extends Component {
    static navigationOptions = {
        header: null
    };

    constructor (props) {
        super(props);
    }
    render () {
        return (
            <View style = { styles.container }>


                    <TouchableOpacity style={styles.search} onPress = {() => this.searchHeader.show()} >
                        <Icon
                            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                            color="#FFF"
                            size={24}
                        />
                    </TouchableOpacity>

                <SearchHeader style={{top:-10}}
                    ref = {(searchHeader) => {
                        this.searchHeader = searchHeader;
                    }}
                    placeholder = 'Buscar'
                    placeholderColor = 'gray'
                    onClear = {() => {
                        console.log(`Clearing input!`);
                    }}
                    onGetAutocompletions = {async (text) => {
                        if (text) {
                            const response = await fetch(`http://naturawebtest.kadasoftware.com/api/v1/productos/find_by_categoria?nombre=${text}`, {
                                headers: {

                                    "Natura-Api-Key": "201904041730"
                                }
                            });
                            const data = await response.json();
                            return data[1];
                        } else {
                            return [];
                        }
                    }}
                />

            </View>
        );
    }
}

export default withNavigation(SearchProduct);