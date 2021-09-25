import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import  Player from './Player.js';
import { Logs } from 'expo';

export default function App() {
  console.disableYellowBox = true;
  const [audioIndex,setarAudioIndex] = useState(0);
  const [playing,setPlaying] = useState(false);

  const[audio,setarAudio] = useState(null);
  const [musicas,setarMusicas] = useState([
    {
      nome: 'Sweet child of mine',
      artista: 'Guns N Roses',
      playing: false,
      file: require('./audio.mp3')
    },
    {
      nome: 'Welcome to the jungle',
      artista: 'Guns N Roses',
      playing: false,
      file: require('./Guns N Roses - Welcome To The Jungle.mp3')
    },
    {
      nome: 'This love',
      artista: 'Maroon 5',
      playing: false,
      file: require('./audio.mp3')
    },
    {
      nome: 'This love',
      artista: 'Maroon 5',
      playing: false,
      file: ''
    },
    {
      nome: 'This love',
      artista: 'Maroon 5',
      playing: false,
      file: ''
    },
    {
      nome: 'This love',
      artista: 'Maroon 5',
      playing: false,
      file: ''
    }
  ]);

  const changeMusic = async (id) =>{
    let curFile = null;
    let newMusics = musicas.filter((val,k)=>{
     if(id == k){
       musicas[id].playing = true;
       
       curFile = musicas[k].file;
       setPlaying(true);
       setarAudioIndex(id);
     }else{
       musicas[k].playing = false;
     } 

     return musicas[k];
    })

    if(audio != null){
      audio.unloadAsync();
    }
     
    let curAudio = new Audio.Sound();
    try{
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    }catch(error){}
    setarAudio(curAudio);
    setarMusicas(newMusics);
  }

  return (
    <View style={{flex:1}}>
     <ScrollView style={styles.container}>
          <StatusBar hidden/>
          <View style={styles.header}>
               <Text style={{textAlign:'center',color:'#fff',fontSize:25}}>App Música</Text>            
          </View>

          <View style={styles.table}>
               <Text style={{width:'50%',color:'rgb(200,200,200)'}}>Música</Text>
               <Text style={{width:'50%',color:'rgb(200,200,200)'}}>Artista</Text>
          </View>
          

          {
            musicas.map((val,k)=>{
              console.log(k)
              if(val.playing){
                //Renderiza algo aqui
               return(
               <View style={styles.table} key={k}>
                    <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%',flexDirection:'row'}}> 
                        <Text style={styles.tableTextSelected}><AntDesign name='play' size={15} color='#1DB954' /> {val.nome}</Text>
                        <Text style={styles.tableTextSelected}>{val.artista}</Text>
                    </TouchableOpacity>
                </View>
              );
              }else{
                return(
                  <View style={styles.table} key={k}>
                       <TouchableOpacity  onPress={()=>changeMusic(k)} style={{width:'100%',flexDirection:'row'}}>
                           <Text style={styles.tableText}><AntDesign name='play' size={15} color='white'/> {val.nome}</Text>
                           <Text style={styles.tableText}> {val.artista}</Text>
                       </TouchableOpacity>
                   </View>
                 );
              }

            })
          }
        <View style={{paddingBottom:200}}></View>
     </ScrollView>
     <Player playing={playing} setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} musicas={musicas}
     setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio} 
     />
     
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header:{
    backgroundColor:'#1DB954',
    width:'100%',
    padding:20
  },
  table:{
    flexDirection: 'row',
    padding:20,
    borderBottomColor:'white',
    borderBottomWidth: 1,
  },
  tableText:{
    width:'50%',
    color:'white',
    
  },
  tableTextSelected:{
    width:'50%',
    color:'#1DB954',

  }
});
