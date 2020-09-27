import React, { Component } from 'react'
import ApiView from './AppView'
import axios from 'axios'
import styles from './Appstyles'
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fromFetch: false,
            fromAxios: false,
            dataSource: [],
            axiosData: null
        };
    }
    goForFetch = () => {
        this.setState({
            fromFetch: true,
            loading: true,

        })
        //recuperer les informentions 'comments' dans JSONPlaceholder qui est une API
        // REST en ligne gratuite que vous pouvez utiliser  de fausses données au besoin
        fetch("https://jsonplaceholder.typicode.com/comments")
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch', responseJson)
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        dataSource: responseJson
                    })
                }, 2000)

            })
            .catch(error => console.log(error))
    }
    goForAxios = () => {
        this.setState({
            fromFetch: false,
            loading: true,

        })
        axios.get("https://jsonplaceholder.typicode.com/comments")
            .then(response => {
                console.log('getting data from axios', response.data);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        axiosData: response.data
                    })
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });
    }
    FlatListSeparator = () => {
        return (
            //ajuster le style 
            <View style={{
                height: .5,
                width: "50%",
                padding:10,
                flexWrap:"wrap",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }
    renderItem = (data) => {
        return (
            //
            <TouchableOpacity style={styles.list}>
                <Text style={styles.lightText}>{data.item.name}</Text>
                <Text style={styles.lightText}>{data.item.email}</Text>
                <Text style={styles.lightText}>{data.item.body}</Text></TouchableOpacity>
        )

    }


    render() {
        const { dataSource, fromFetch, fromAxios, loading, axiosData } = this.state
        return (
            <ApiView 
                goForFetch={this.goForFetch}
                goForAxios={this.goForAxios}
                dataSource={dataSource}
                loading={loading}
                fromFetch={fromFetch}
                fromAxios={fromAxios}
                axiosData={axiosData}
                FlatListSeparator={this.FlatListSeparator}
                renderItem={this.renderItem}
            />
        );
    }
}

export default AppContainer;