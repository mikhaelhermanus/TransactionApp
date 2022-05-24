import React, { useEffect, useState, startTransition } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    ActivityIndicator,
    Modal,
    TouchableOpacity
} from 'react-native';
import CardItem from '../CardItem';
import colors from '../style/index'
import { useGetAllTransactionQuery } from '../store/transactionApi'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { RadioButton } from 'react-native-paper';

const IndexScreen = props => {
    const [dataTransacations, setDataTransaction] = useState([])
    const [result, setResult] = useState([])
    const [search, setSearch] = useState('')
    const [isRequest, setIsRequest] = useState(false)
    const [reset, setIsReset] = useState(false)
    const [activeSort, setActiveSort] = useState('Urutkan')
    const [sortDefault, setSortDefault] = useState([
        { name: 'URUTKAN', isChecked: true },
        { name: 'Nama A-Z', isChecked: false },
        { name: 'Nama Z-A', isChecked: false },
        { name: 'Tanggal Terbaru', isChecked: false },
        { name: 'Tanggal Terlama', isChecked: false }
    ])

    const [sortModal, setSortModal] = useState(false)
    const { data, error, isLoading } = useGetAllTransactionQuery()


    const navigation = props.navigation
    useEffect(() => {
        if (!isLoading) {
            let result = Object.keys(data).map((key) => data[key]);
            setDataTransaction(result)
            setResult(result)
            setIsReset(false)
        }
    }, [data, isLoading, reset])

    useEffect(() => {
        const results = dataTransacations.filter(element => {
            // 👇️ using AND (&&) operator
            return element.beneficiary_name.toLowerCase().includes(search.toLowerCase()) || element.beneficiary_bank.toLowerCase().includes(search.toLowerCase()) || element.sender_bank.toLowerCase().includes(search.toLowerCase()) || element.amount.toString().includes(search)
        });
        setResult(results)
    }, [search])

    const applySort = (sort) => {
        setIsRequest(true)
        if (sort === 'Nama A-Z') {
            dataTransacations.sort((a, b) => (a.beneficiary_name > b.beneficiary_name) ? 1 : ((b.beneficiary_name > a.beneficiary_name) ? -1 : 0))
            setResult(dataTransacations)
            setIsRequest(false)
        } else if (sort === 'Nama Z-A') {

            dataTransacations.sort((a, b) => (a.beneficiary_name < b.beneficiary_name) ? 1 : ((b.beneficiary_name < a.beneficiary_name) ? -1 : 0))
            setResult(dataTransacations)
            setIsRequest(false)
        } else if (sort === 'Tanggal Terbaru') {
            dataTransacations.sort(function (a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            });
            setResult(dataTransacations)
            setIsRequest(false)
        } else if (sort === 'Tanggal Terlama') {

            dataTransacations.sort(function (a, b) {
                return new Date(a.created_at) - new Date(b.created_at);
            });
            setResult(dataTransacations)
            setIsRequest(false)
        } else if (sort === 'URUTKAN') {
            setIsReset(true)
            setIsRequest(false)
        }
    }

    //on search function
    const onChangeText = (text) => {
        setSearch(text)
    }

    const selectedSortDefault = (index, item) => {
        let newArr = [{ name: 'URUTKAN', isChecked: false },
        { name: 'Nama A-Z', isChecked: false },
        { name: 'Nama Z-A', isChecked: false },
        { name: 'Tanggal Terbaru', isChecked: false },
        { name: 'Tanggal Terlama', isChecked: false }]
        newArr[index].isChecked = !item
        setActiveSort(newArr[index].name)
        setSortDefault(newArr)
        setSortModal(false)
        applySort(newArr[index].name)
    }

    const renderSearchBar = () => {
        return (
            <View style={styles.containerSearch}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <EvilIcons style={{ alignSelf: 'center' }} size={30} name='search' color={colors.gray} />
                    <TextInput
                        placeholder='Cari Nama, Bank atau Nominal'
                        onChangeText={onChangeText}
                        value={search}
                    />
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setSortModal(true)}>
                        <Text style={{ alignSelf: 'center', color: colors.orangeFlip, fontWeight: 'bold', alignSelf: 'center' }}>{activeSort}</Text>
                        <MaterialIcons style={{ alignSelf: 'center' }} color={colors.orangeFlip} name='keyboard-arrow-down' size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    const renderListTransaction = () => {
        return (
            <FlatList
                contentContainerStyle={{ marginHorizontal: 10 }}
                style={{ flex: 1 }}
                data={result}
                renderItem={({ item, index }) => <CardItem navigation={navigation} item={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderSearchBar()}
            {
                error ? <Text>Something Went Wrong</Text> :
                    isLoading || isRequest ? <ActivityIndicator size='large' color={colors.orangeSoft} />
                        :
                        renderListTransaction()}
            <Modal
                animationType='slide'
                transparent={true}
                visible={sortModal}
                onRequestClose={() => setSortModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                            sortDefault.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row', margin: 10 }}>
                                    <RadioButton
                                        color={colors.orangeFlip}
                                        value={item.name}
                                        status={item.isChecked ? 'checked' : 'unchecked'}
                                        onPress={() => selectedSortDefault(index, item.isChecked)}
                                        uncheckedColor={colors.orangeFlip}
                                        keyExtractor={index.toString()}
                                    />
                                    <Text style={styles.textSemiBold}>{item.name}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default IndexScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayCard
    },
    containerSearch: {
        padding: 15,
        backgroundColor: colors.white,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.white
    },
    centeredView: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        width: '80%',
        paddingBottom: 10

    },
    radioButton: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000'
    },
    cirleButton: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    textSemiBold: {
        fontSize: 16, fontWeight: '400', color: colors.black, alignSelf: 'center'
    },
});