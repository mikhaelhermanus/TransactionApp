import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import colors from '../src/style/index';
import * as helper from './Helper/DateUtils';
import Fontisto from 'react-native-vector-icons/Fontisto'

const CardItem = props => {
    const dataTransacations = props.item
    const navigation = props.navigation

    const renderStatusTransaction = (status) => {
        if (status === 'SUCCESS') {
            return 'Berhasil'
        } else {
            return 'Pengecekkan'
        }
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('TransactionDetail', { dataTransacations: dataTransacations })} style={dataTransacations.status === 'SUCCESS' ? styles.containerCardSuccess : styles.containerCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textBold}>{dataTransacations.sender_bank.toUpperCase()} </Text>
                        <Fontisto style={{alignSelf : 'center'}} name='arrow-right' size={15} color={colors.black} />
                        <Text style={styles.textBold}> {dataTransacations.beneficiary_bank.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.textSemiBold}>{dataTransacations.beneficiary_name.toUpperCase()}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textSemiBold}>Rp{helper.numberWithCommas(dataTransacations?.amount)} </Text>
                        <View style={styles.circle} />
                        <Text style={styles.textSemiBold}>{helper.formatDate(dataTransacations?.created_at)}</Text>
                    </View>
                </View>
                <View style={{ alignSelf: 'center', margin: 10 }}>
                    <TouchableOpacity style={dataTransacations.status === 'SUCCESS' ? styles.successCheckButton : styles.checkButton}>
                        <Text style={dataTransacations.status === 'SUCCESS' ? styles.textSuccess : styles.normalText}>{renderStatusTransaction(dataTransacations.status)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardItem

const styles = StyleSheet.create({
    containerCard: {
        width: '100%',
        borderRadius: 6,
        borderColor: colors.white,
        borderWidth: 1,
        borderLeftWidth: 7,
        borderLeftColor: colors.orangeFlip,
        backgroundColor: colors.white,
        shadowColor: colors.grayBg,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        marginTop: 10,
    },
    containerCardSuccess: {
        width: '100%',
        borderRadius: 6,
        borderColor: colors.white,
        borderWidth: 1,
        borderLeftWidth: 7,
        borderLeftColor: colors.greenSucces,
        backgroundColor: colors.white,
        shadowColor: colors.grayBg,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        marginTop: 10,
    },
    checkButton: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: colors.orangeFlip,
        borderWidth: 2
    },
    successCheckButton: {
        width: 70,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: colors.greenSucces,
        borderWidth: 2,
        backgroundColor: colors.greenSucces
    },
    textSuccess: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.white
    },
    normalText: {
        fontSize: 14,
        fontWeight: '500',
        color : colors.black
    },
    textSemiBold:{
        fontSize: 16, fontWeight: '400', color :colors.black
    },
    textBold:{
        fontSize: 16, fontWeight: 'bold', color : colors.black
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: 8,
        borderColor: colors.blackProgress,
        backgroundColor: colors.blackProgress,
        alignSelf: 'center',
        marginLeft: 3,
        marginRight: 3
    }
})