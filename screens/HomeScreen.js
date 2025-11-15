import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <View style={{ padding: 24, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ 
          fontSize: 28, 
          fontWeight: 'bold', 
          color: '#2563eb', 
          textAlign: 'center',
          marginBottom: 20 
        }}>
          ¡Bienvenido a la App!
        </Text>
        
        <Text style={{ 
          fontSize: 16, 
          color: '#6b7280', 
          textAlign: 'center',
          lineHeight: 24,
          marginBottom: 30
        }}>
          Esta es una aplicación desarrollada con React Native y Gluestack UI.
        </Text>
        
        {/* <View style={{ 
          backgroundColor: '#eff6ff', 
          padding: 24, 
          borderRadius: 8, 
          borderWidth: 1, 
          borderColor: '#bfdbfe', 
          width: '100%' 
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            color: '#1d4ed8',
            marginBottom: 10
          }}>
            Funcionalidades incluidas:
          </Text>
          
          <Text style={{ color: '#374151', marginBottom: 8 }}>Drawer Navigation</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>CheckboxGroup con 5 elementos</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>Links con Icons</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>Pressable interactivo</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>RadioGroup con FormControl</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>Select controlado</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>Slider con min/max</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>Switch con estado</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>TextArea con FormControl</Text>
        </View>
        
        <Text style={{ 
          fontSize: 14, 
          color: '#9ca3af', 
          textAlign: 'center',
          marginTop: 30,
          fontStyle: 'italic'
        }}>
          Usa el menú lateral para navegar a la pantalla de formularios
        </Text> */}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;