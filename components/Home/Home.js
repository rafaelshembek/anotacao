import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleCheck, faListCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import Firebase from "../../src/config/configdb";

function Home() {


    const [item, setItem] = useState('');
    const [tasks, setTasks] = useState([])

    const btnItem = () => {

        setItem('')
        if (item !== '') {
            // setTasks([...tasks, { text: item, done: false }])
            Firebase.addItems('lista', {text:item, done: false})
            setItem('')
        }
    }
    useEffect( () => {
        Firebase.getCollection('lista').then( (i) => {
            setTasks(i)
        }).catch( (error) => {
            console.log(error)
        })
    },[tasks])
    return (
        <>
            <SafeAreaView style={styles.container} >

                <View style={styles.header}>
                    <FontAwesomeIcon icon={faListCheck} />
                    <Text style={styles.titleHeader}>Minhas Notas</Text>
                </View>
                <View style={styles.list}>
                    <View style={styles.title}>
                        <Text>Notas</Text>
                        <View style={tasks.length !== 0 ? { height: 30, width: 30, justifyContent: "center", alignItems: "center", borderRadius: 100, margin: 5, backgroundColor: "#F08511" } : { height: 30, width: 30, justifyContent: "center", alignItems: "center", borderRadius: 100, margin: 5, backgroundColor: "#fff" }}>
                            <Text style={{ color: "#fff" }}>{tasks.length == 0 ? 0 : tasks.length}</Text>
                        </View>
                    </View>

                    <FlatList style={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                        data={tasks}
                        renderItem={({item}) =>
                            <>
                                <TouchableOpacity style={styles.items} onPress={() => {
                                    console.log(`id do item ====> ${item}`)
                                   Firebase.delItem(item.id,'lista')
                                }}>
                                    <FontAwesomeIcon style={styles.iconItem} icon={faCircleCheck} />
                                    <Text style={styles.item}>{item.text}</Text>
                                </TouchableOpacity>
                            </>
                        } />
                    <View style={styles.inputAndBtn}>

                        <TextInput
                            style={styles.input}
                            value={item}
                            onChangeText={(text) => setItem(text)} placeholder="Adicionar Nota" placeholderTextColor={'#666'}
                        />

                        <TouchableOpacity style={styles.btn} onPress={btnItem}>
                            <Text style={{ color: "#fff" }}><FontAwesomeIcon style={styles.iconPlus} icon={faPlus} /></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    inputAndBtn: {
        flexDirection: "row",
        margin: 8
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
    }
})

export default Home;