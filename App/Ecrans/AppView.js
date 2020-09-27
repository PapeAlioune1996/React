import React, { Component } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native'

import styles from  './Appstyles'
const AppView = (props) => {
    const { goForFetch, goForAxios, fromFetch, fromAxios, axiosData, renderItem, FlatListItemSeparator, dataSource, loading } = props
    return (
        <View style={styles.parentContainer}>
            <View>
                <Text style={styles.textStyle}>les méthodes fournies pour les appels d'API dans l'application React Native.</Text>
            </View>
            <View style={{ margin: 25 }}>
                <Button
                    title={'Clicker avec Fetch'}
                    onPress={goForFetch}
                    color='blue'
                />
            </View>
            <View style={{ margin: 18 }}>
                <Button
                    title={'Clicker avec axios'}
                    onPress={goForAxios}
                    color='blue'
                />
            </View>


            {fromFetch ?
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                /> : <FlatList
                    data={axiosData}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                />
            }
             
            {loading &&
        //button du chargement
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                    <Text style={{fontSize:16,color:'red'}}>Loading Data...</Text>
                </View>
            }
        </View>
    )
}
export default AppView;