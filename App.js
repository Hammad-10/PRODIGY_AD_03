import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      startTimeRef.current = Date.now() - (time.minutes * 60000 + time.seconds * 1000 + time.milliseconds);
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTimeRef.current;
        const newMinutes = Math.floor(elapsedTime / 60000);
        const newSeconds = Math.floor((elapsedTime % 60000) / 1000);
        const newMilliseconds = Math.floor((elapsedTime % 1000) / 10);
        setTime({ minutes: newMinutes, seconds: newSeconds, milliseconds: newMilliseconds });
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerTextContainer}>
        <Text style={styles.timerText}>{`${time.minutes
          .toString()
          .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}.${time.milliseconds.toString().padStart(2, '0')}`}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startStop}>
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  timerText: {
    fontSize: 40,
    marginBottom: 20,
    color:'green'
  },
  timerTextContainer: {
    marginBottom:80,
    borderColor: 'lightgreen',
    borderWidth: 1,
    height: 200,
    width: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginHorizontal: 10,
    height:75,
    width:75,
    borderRadius: 37.5,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
