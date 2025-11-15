import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
// import { Home, FileText, Info } from 'lucide-react-native';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

// Importar pantallas
import HomeScreen from './screens/HomeScreen';
import FormsScreen from './screens/FormsScreen';
import ProfileScreen from './screens/ProfileScreen';
import DisplayScreen from './screens/DisplayScreen';

// Custom components
import CustomHeader from './components/custom/CustomHeader';

const Drawer = createDrawerNavigator();



// function CustomDrawerContent() {
//   return (
//     <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
//       <View 
//         style={{ 
//           backgroundColor: '#2563eb',
//           padding: 24
//         }}
//       >
//         <Text style={{ 
//           color: 'white', 
//           fontSize: 22, 
//           fontWeight: 'bold',
//           marginBottom: 8
//         }}>
//           Menu Principal
//         </Text>
//         <Text style={{ 
//           color: '#bfdbfe', 
//           fontSize: 14
//         }}>
//           Desarrollado por Antonio
//         </Text>
//       </View>
//     </View>
//   );
// }


export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2563eb',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: ({ children }) => (
              CustomHeader({ title: children })
            ),
            drawerStyle: {
              backgroundColor: '#f8fafc',
              width: 280,
            },
            drawerActiveTintColor: '#2563eb',
            drawerInactiveTintColor: '#6b7280',
            drawerLabelStyle: {
              fontSize: 16,
              fontWeight: '500',
            },
          }}
        >
          <Drawer.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Inicio',
            }}
          />
          <Drawer.Screen 
            name="Forms" 
            component={FormsScreen}
            options={{
              title: 'Formularios',
            }}
          />
          <Drawer.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              title: 'Perfil',
            }}
          />
          <Drawer.Screen 
            name="Display" 
            component={DisplayScreen}
            options={{
              title: 'Display',
            }}
          />
          
        </Drawer.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
