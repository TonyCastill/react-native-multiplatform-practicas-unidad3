import React, { useState } from 'react';
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Grid, GridItem } from "@/components/ui/grid";
import FeedImage from './FeedImage';
import ImageSkeleton from './ImageSkeleton';

const LoadingDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [currentDemo, setCurrentDemo] = useState('skeleton');

  const demoImages = [
    {
      url: "https://picsum.photos/300/300?random=1",
      caption: "Demo Image 1"
    },
    {
      url: "https://picsum.photos/300/300?random=2", 
      caption: "Demo Image 2"
    },
    {
      url: "https://picsum.photos/300/300?random=3",
      caption: "Demo Image 3"
    }
  ];

  const resetDemo = () => {
    setShowDemo(false);
    setTimeout(() => setShowDemo(true), 100);
  };

  return (
    <VStack space="lg" className="p-4">
      <Text size="xl" className="font-bold text-center">
        🎭 Skeleton Loading Demo
      </Text>
      
      <VStack space="md">
        <Text size="md" className="text-center">
          Prueba los diferentes estados de carga:
        </Text>
        
        <HStack space="md" className="justify-center">
          <Button 
            size="sm" 
            className={currentDemo === 'skeleton' ? 'bg-blue-500' : 'bg-gray-300'}
            onPress={() => setCurrentDemo('skeleton')}
          >
            <ButtonText>Solo Skeleton</ButtonText>
          </Button>
          
          <Button 
            size="sm"
            className={currentDemo === 'images' ? 'bg-blue-500' : 'bg-gray-300'}
            onPress={() => setCurrentDemo('images')}
          >
            <ButtonText>Con Imágenes</ButtonText>
          </Button>
        </HStack>

        <Button onPress={resetDemo} className="bg-green-500">
          <ButtonText>🔄 Reiniciar Demo</ButtonText>
        </Button>
      </VStack>

      {showDemo && (
        <Grid className="gap-3" _extra={{ className: "grid-cols-12" }}>
          {currentDemo === 'skeleton' ? (
            // Mostrar solo skeletons
            Array(6).fill(0).map((_, index) => (
              <GridItem
                key={`skeleton-${index}`}
                _extra={{ className: "col-span-4" }}
              >
                <ImageSkeleton showLoadingText={index === 0} />
              </GridItem>
            ))
          ) : (
            // Mostrar imágenes con skeleton loading
            demoImages.map((item, index) => (
              <GridItem
                key={`image-${index}-${Date.now()}`}
                _extra={{ className: "col-span-4" }}
              >
                <FeedImage
                  imageUrl={item.url}
                  alt={item.caption}
                  onPress={() => console.log(`Pressed ${item.caption}`)}
                />
              </GridItem>
            ))
          )}
        </Grid>
      )}

      <VStack space="sm" className="mt-4">
        <Text size="sm" className="text-gray-600 text-center">
          💡 Tips del Skeleton Loading:
        </Text>
        <Text size="xs" className="text-gray-500 text-center">
          • Muestra placeholder mientras cargan las imágenes
        </Text>
        <Text size="xs" className="text-gray-500 text-center">
          • Animación suave de pulso y shimmer
        </Text>
        <Text size="xs" className="text-gray-500 text-center">
          • Manejo de errores con fallback
        </Text>
        <Text size="xs" className="text-gray-500 text-center">
          • Mejora la percepción de velocidad
        </Text>
      </VStack>
    </VStack>
  );
};

export default LoadingDemo;