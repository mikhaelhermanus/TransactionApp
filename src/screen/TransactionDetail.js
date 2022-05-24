import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Clipboard } from 'react-native'
//icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
//colors
import colors from '../style/index'
//function 
import * as helper from '../Helper/DateUtils';

const TransactionDetail = props => {
    const { params } = props.route
    const navigation = props.navigation
    const dataTransacations = params ? params.dataTransacations : null

    const copyToClipboard = () => {
        Clipboard.setString(dataTransacations.id);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.innerContainer, styles.row]}>
                <Text style={styles.textBold}>ID TRANSAKSI:#{dataTransacations.id}</Text>
                <TouchableOpacity onPress={() => copyToClipboard()}>
                    <MaterialIcons style={{ marginLeft: 10 }} name='content-copy' size={20} color={colors.orangeFlip} />
                </TouchableOpacity>
            </View>
            <View style={styles.lineSeparator} />
            <View style={[styles.innerContainer, styles.rowSpace]}>
                <Text style={styles.textBold}>Detail Transaksi</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontWeight: 'bold', color: colors.orangeFlip }}>Tutup</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lineSeparator} />
            <View style={[styles.row, styles.innerContainer]}>
                <Text style={styles.textBold}>{dataTransacations.sender_bank.toUpperCase()} </Text>
                <Fontisto style={{alignSelf : 'center'}} name='arrow-right' size={15} color={colors.black}/>
                <Text style={styles.textBold}> {dataTransacations.beneficiary_bank.toUpperCase()}</Text>
            </View>
            <View style={[styles.innerContainer, styles.rowSpace]}>
                <View style={styles.column}>
                    <Text style={styles.textBold}>{dataTransacations.beneficiary_name.toUpperCase()}</Text>
                    <Text style={styles.textSemiBold}>{dataTransacations.account_number}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.textBold}>NOMINAL</Text>
                    <Text style={styles.textSemiBold}>Rp{helper.numberWithCommas(dataTransacations?.amount)}</Text>
                </View>
            </View>
            <View style={[styles.innerContainer, styles.rowSpace]}>
                <View style={styles.column}>
                    <Text style={styles.textBold}>BERITA TRANSFER</Text>
                    <Text style={styles.textSemiBold}>{dataTransacations.remark}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.textBold}>KODE UNIK</Text>
                    <Text style={styles.textSemiBold}>{dataTransacations.unique_code}</Text>
                </View>
            </View>
            <View style={[styles.innerContainer, styles.rowSpace]}>
                <View style={styles.column}>
                    <Text style={styles.textBold}>WAKTU DIBUAT</Text>
                    <Text style={styles.textSemiBold}>{helper.formatDate(dataTransacations?.created_at)}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TransactionDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : colors.white
    },
    innerContainer: {
        margin: 20,
    },
    row: {
        flexDirection: 'row'
    },
    rowSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color : colors.black
    },
    lineSeparator: {
        borderBottomWidth: 1,
        borderColor: colors.grayHeader
    },
    column: {
        flexDirection: 'column'
    },
    textSemiBold: {
        color: colors.blackProgress,
        fontSize: 16,
        fontWeight: '600'
    }
})