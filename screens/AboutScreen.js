import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import LoadingDemo from '../components/custom/LoadingDemo';

const AboutScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }} className="bg-background-50">
      <VStack space="lg" className="p-4">
        <Box className="bg-white rounded-xl p-6 shadow-lg">
          <VStack space="md">
            <Text size="2xl" className="font-bold text-center text-primary-600">
              🎨 Componentes Personalizados
            </Text>
            
            <Text size="md" className="text-center text-gray-600">
              Demostración de componentes avanzados con skeleton loading
            </Text>
          </VStack>
        </Box>

        <Box className="bg-white rounded-xl shadow-lg overflow-hidden">
          <LoadingDemo />
        </Box>

        <Box className="bg-white rounded-xl p-6 shadow-lg">
          <VStack space="md">
            <Text size="lg" className="font-bold text-primary-600">
              ✨ Características Implementadas
            </Text>
            
            <VStack space="sm">
              <Text size="sm">• 🔄 Skeleton Loading con animaciones</Text>
              <Text size="sm">• 📱 Componentes Gluestack UI</Text>
              <Text size="sm">• 🗂️ Drawer Navigation</Text>
              <Text size="sm">• 📋 Formularios interactivos</Text>
              <Text size="sm">• 🖼️ Sistema de feed con modal</Text>
              <Text size="sm">• ⚡ Promise-based image loading</Text>
              <Text size="sm">• 🎭 Animaciones suaves</Text>
            </VStack>
          </VStack>
        </Box>

        <Box className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl p-6">
          <VStack space="md">
            <Text size="lg" className="font-bold text-white text-center">
              🚀 Tecnologías Utilizadas
            </Text>
            
            <VStack space="sm">
              <Text size="sm" className="text-white">React Native + Expo</Text>
              <Text size="sm" className="text-white">Gluestack UI + Tailwind CSS</Text>
              <Text size="sm" className="text-white">React Navigation</Text>
              <Text size="sm" className="text-white">Lucide Icons</Text>
              <Text size="sm" className="text-white">Animated API</Text>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default AboutScreen;