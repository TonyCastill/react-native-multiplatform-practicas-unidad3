import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";

const ImageSkeleton = ({ showLoadingText = false }) => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    // Animación de pulso
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    // Animación de shimmer
    const shimmer = () => {
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: -1,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => shimmer());
    };

    pulse();
    shimmer();
  }, [pulseAnim, shimmerAnim]);

  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200],
  });

  return (
    <Box 
      className="rounded-md overflow-hidden bg-gray-200"
      style={{ 
        width: '100%', 
        aspectRatio: 1,
        position: 'relative'
      }}
    >
      <Animated.View 
        style={{ 
          ...StyleSheet.absoluteFillObject,
          opacity: pulseAnim 
        }}
      >
        <Box className="bg-gray-300 w-full h-full" />
      </Animated.View>
      
      {/* Shimmer effect */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{ translateX: shimmerTranslateX }],
        }}
      >
        <Box 
          className="bg-white opacity-20"
          style={{ 
            width: 100,
            height: '100%'
          }} 
        />
      </Animated.View>

      {showLoadingText && (
        <VStack className="absolute inset-0 justify-center items-center">
          <Box className="bg-gray-400 rounded w-16 h-3 mb-2" />
          <Box className="bg-gray-400 rounded w-12 h-2" />
        </VStack>
      )}
    </Box>
  );
};

export default ImageSkeleton;