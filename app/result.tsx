import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"



const Result = () => {

    return(
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        </View>
    </SafeAreaView>
    )
}

export default () => {
    return(
        <SafeAreaProvider>
            <Result/>
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3ac7c7',
    },

})