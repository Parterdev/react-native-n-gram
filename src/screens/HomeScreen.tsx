import React, { useState } from 'react';
import { Alert, 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  Image, 
  Button,
  View } 
from 'react-native';
import { useForm } from '../hooks/useForm';
import { titleText } from '../data/textIntro';


export const HomeScreen = () => {
  
  const [gramResult, setGramResult] = useState<string[]>();

  const {height} = Dimensions.get('screen');

  //To input value
  const {onChange, form} = useForm({
    initialWord: '',
  });

  /* function* generateNgrams(word:any, n:number = 3) {
    let newWord = word.split(' ');
    let res = [];

    for (let x of newWord) {
      res.push(x);
      if(res.length >= n) {
        yield res;
        res.shift();
      }
    }
  } */

  function process(arr:string[], n:number) {
    let temp = [];
    let result = [];

    //String math with the array
    if (arr.length >= n) {
      //Excludes left over words which don't match withe length rule 
      for (var i = 0; (i + n) <= arr.length; i++) {
        temp.push(arr.slice(i, n + i).join(' '));
      }
      result.push(temp);
      //Calling again
      process(arr, n + 1);
    }
    console.log('Bare result', temp);
    //console.log("With mapping", temp.map((element) => element)); 
    setGramResult(temp);
  }

  const showAlert = () => {
    Alert.alert(
      'Alert',
      'Please type a word to generate a nGram',
      [
        {text: 'OK',},
      ],
      {cancelable: true,}
    )
  }

  //To generate a Ngram elements
  const nGrams = (word:string) => {
    if(!word) {
      showAlert();
    }else {
      process(word.split(' '), 1);
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView style={{backgroundColor: 'darkblue', paddingHorizontal: 20, paddingVertical: 20}}>
        <View style={{...styles.firstBox, height: height * 0.40}}>
          <Text style={styles.textStyle}>{titleText}</Text>
          <View style={styles.textInputContainer}>
            <TextInput testID="text-data-input"
              style={styles.textInput}
              placeholder="Type: Show me the code"
              placeholderTextColor='black'
              autoCapitalize='none'
              onChangeText={(value) => onChange(value, 'initialWord')}
            />
            <Button testID="action-button"
              title='Go!'
              onPress={() => nGrams(form.initialWord)}
            />
          </View>
        </View>
        <Text style={{fontSize: 25, color: 'white'}}>Output with original value:</Text>
        <View style={{...styles.secondBox, height: height * 0.40}}>
          {
            (gramResult) ? <Image testID="image-ouput" style={{flex: 1, resizeMode: 'stretch'}}
              source={require('../assets/result.png')}
            /> :
            <Text testID="text-data-empty" style={styles.textStyle}>{JSON.stringify('{empty}', null, 3)}</Text>
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  firstBox: {
    //backgroundColor: 'pink'
  },
  secondBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'skyblue'
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white'
  },
  textInputContainer: {
    height: 125,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  textInput: {
    backgroundColor: '#f6f6f6',
    color: 'black',
    borderRadius: 5,
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#f6f6f6'
  },
})
