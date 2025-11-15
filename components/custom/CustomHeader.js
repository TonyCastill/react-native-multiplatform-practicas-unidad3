import React from 'react';
import { Text, View } from 'react-native';

export default function CustomHeader({ title }) {
  return (
    <View>
      <Text style={{ 
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold',
        // textAlign: 'center'
        
      }}>
        Yael Antonio Castillo Perez
      </Text>
      <Text style={{ 
        color: '#bfdbfe', 
        fontSize: 14,
        textAlign: 'left',
        marginTop: 2
      }}>
        {title}
      </Text>
    </View>
  );
}
