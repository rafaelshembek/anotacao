import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleCheck, faListCheck, faPlus, faList, faMultiply } from "@fortawesome/free-solid-svg-icons";
import Firebase from "../../src/config/configdb";

function Home() {


    const [item, setItem] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isShowModal, setShowModal] = useState(false);


    const btnShowModal = () => {
        setShowModal(!isShowModal);
    };

    const btnItem = () => {

        setItem('')
        if (item !== '') {
            // setTasks([...tasks, { text: item, done: false }])
            Firebase.addItems('lista', { text: item, done: false })
            setItem('')
            setShowModal(false)
        }
    }
    useEffect(() => {
        Firebase.getCollection('lista').then((i) => {
            setTasks(i)
        }).catch((error) => {
            console.log(error)
        })
    }, [tasks])
    return (
        <>
            <SafeAreaView style={styles.container} >

                <View style={styles.header}>
                    <FontAwesomeIcon icon={faListCheck} />
                    <Text style={styles.titleHeader}>Minhas Notas</Text>
                </View>
                <View style={styles.list}>
                    <View style={styles.title}>
                        <Text>Lista de Notas</Text>
                        <View style={tasks.length !== 0 ? { height: 30, width: 30, justifyContent: "center", alignItems: "center", borderRadius: 100, margin: 5, backgroundColor: "#F08511" } : { height: 30, width: 30, justifyContent: "center", alignItems: "center", borderRadius: 100, margin: 5, backgroundColor: "#fff" }}>
                            <Text style={{ color: "#fff" }}>{tasks.length == 0 ? 0 : tasks.length}</Text>
                        </View>
                    </View>

                    <FlatList style={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                        data={tasks}
                        renderItem={({ item }) =>
                            <>
                                <TouchableOpacity style={styles.items} onPress={() => {
                                    console.log(`id do item ====> ${item}`)
                                    Firebase.delItem(item.id, 'lista')
                                }}>
                                    <FontAwesomeIcon style={styles.iconItem} icon={faCircleCheck} />
                                    <Text style={styles.item}>{item.text}</Text>
                                </TouchableOpacity>
                            </>
                        } />
                    <TouchableOpacity style={styles.btn} onPress={btnShowModal}>
                        <Text style={{ color: "#fff" }}><FontAwesomeIcon style={styles.iconPlus} icon={faPlus} /> Adcionar um novo item <FontAwesomeIcon style={styles.iconPlus} icon={faPlus} /></Text>
                    </TouchableOpacity>
                </View>
                {isShowModal && <View style={[styles.modalView]}>

                    <TouchableOpacity style={styles.btnExit} onPress={() => setShowModal(false)}>
                        <Text style={{ color: "#fff" }}><FontAwesomeIcon style={styles.iconPlus} icon={faMultiply} /></Text>
                    </TouchableOpacity>

                    <Text style={styles.titleModalView}><FontAwesomeIcon style={styles.iconTitleModal} icon={faList} /> Adicionar um Novo Item</Text>
                    <Text style={styles.paragrafoModalView}>Adicionar um novo item a sua lista de tarefas a fazer</Text>
                    {/* ========= INPUT PARA OBTER O TEXT DO NOVO ITEM =========== */}
                    <View style={styles.viewInputAndBtn}>
                        <TextInput
                            style={styles.inputNewItemModal}
                            value={item}
                            onChangeText={(text) => setItem(text)} placeholder="Novo Item" placeholderTextColor={'#666'} />
                        {/* ============== BTN ADICIONAR ITEM ========================= */}
                        <TouchableOpacity style={styles.btn} onPress={btnItem}>
                            <Text style={{ color: "#fff" }}><FontAwesomeIcon style={styles.iconPlus} icon={faPlus} /></Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 55,
        height: 60
    },
    titleHeader: {
        marginLeft: 5
    },
    title: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30
    },
    list: {
        flex: 2,
        // height:500,
        margin: 5,
        // backgroundColor:"#333"
    },
    iconPlus: {
        color: "#fff"
    },
    input: {
        flex: 1,
        backgroundColor: "#eee",
        fontSize: 20,
        paddingLeft: 24,
        borderRadius: 5,
        margin: 3,
        height: 44
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00C482",
        borderRadius: 5,
        padding: 12,
        margin: 3,
        height: 44
    },
    items: {
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 9,
        backgroundColor: "#eee",
        borderRadius: 12,
        padding: 12,
        flexDirection: "row"
    },
    item: {
        marginLeft: 5
    },
    iconItem: {
        color: "#777"
    },
    // =============== STYLO DO MODAL VIEW ==============
    modalView: {
        backgroundColor: "#FFE9B6",
        width: '100%',
        height: '30%',
        bottom: '0%',
        zIndex: 1,
        position: "absolute",
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21,
    },
    btnExit: {
        backgroundColor: "orange",
        height: 55,
        width: 55,
        borderRadius: 50,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: '-11%',
        right: '3%',
    },
    titleModalView: {
        fontSize: 20,
        color: "orange",
        width: "100%",
        textAlign: 'center',
        marginTop: '5%'
    },
    iconTitleModal: {
        color: 'orange'
    },
    paragrafoModalView: {
        color: "orange",
        margin: '5%'
    },
    inputNewItemModal: {
        backgroundColor: "#FFE9B6",
        fontSize: 20,
        paddingLeft: 24,
        borderRadius: 5,
        borderBottomWidth: 3,
        borderBottomColor: 'orange',
        margin: 3,
        height: 44,
        width: '80%',
    },
    viewInputAndBtn: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        // flexWrap: 'wrap',
        width: '100%'
    }
    // =============== STYLO DO MODAL VIEW ==============
})

export default Home;