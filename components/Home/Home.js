import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native";

function Home() {


    const [item, setItem] = useState('');
    const [tasks, setTasks] = useState([])
    // botão de adicioinar item na array setTasks()
    const btnItem = () => {

        setItem('')
        if (item !== '') {
            setTasks([...tasks, { text: item, done: false }])
            setItem('')
        }
    }

    const delItem = (id) => {
        tasks.splice(id,1)
        setTasks([...tasks])
    }

    return (
        <>
            {/* <SafeAreaView style={styles.container} > */}
                <View style={styles.header}>
                    <Text style={{marginTop:20}}>Minhas Notas</Text>
                </View>
                <View style={styles.list}>
                    <View style={styles.title}>
                            <Text>Notas</Text>
                            <View style={tasks.length !== 0 ? {height:30,width:30,justifyContent:"center",alignItems:"center",borderRadius:100,margin:5,backgroundColor:"#F08511"} : {height:30,width:30,justifyContent:"center",alignItems:"center",borderRadius:100,margin:5,backgroundColor:"#fff"}}>
                                <Text style={{color:"#fff"}}>{tasks.length == 0 ? 0 : tasks.length}</Text>
                            </View>
                    </View>

                    <FlatList style={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                        data={tasks}
                        renderItem={({ item, index }) =>
                            <>
                                <TouchableOpacity style={styles.items} onPress={()=> {
                                    delItem(index)
                                }}>
                                    <View style={{backgroundColor:"#F0A411", height:10, width:10, borderRadius:100, marginLeft:5,marginRight:5}}></View>
                                    <Text>{item.text}</Text>
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
                            <Text style={{ color: "#fff" }}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </SafeAreaView> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header: {
        // backgroundColor:"#eee",
        alignItems: "center",
        marginTop: 55,
        // marginBottom:25,
        height:60
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
        margin:5,
        // backgroundColor:"#333"
    },
    inputAndBtn: {
        flexDirection: "row",
        margin:8
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
        justifyContent:"flex-start",
        alignItems:"center",
        margin: 9,
        backgroundColor: "#eee",
        borderRadius: 12,
        padding: 12,
        flexDirection: "row"
    }
})

export default Home;