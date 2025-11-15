import React, { useState, useEffect } from "react";
import { Image as RNImage } from "react-native";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import ImageSkeleton from "./ImageSkeleton";

const FeedImage = ({ imageUrl, alt = "Feed Image", onPress }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    // Usar React Native Image para pre-cargar
    const loadImage = () => {
      return new Promise((resolve, reject) => {
        RNImage.prefetch(imageUrl)
          .then(() => {
            // Simular tiempo de carga realista
            setTimeout(() => {
              resolve();
            }, Math.random() * 1500 + 800);
          })
          .catch(reject);
      });
    };

    loadImage()
      .then(() => {
        setIsLoading(false);
        setHasError(false);
      })
      .catch((error) => {
        console.warn("Error loading image:", error);
        setIsLoading(false);
        setHasError(true);
      });
  }, [imageUrl]);

  const handlePress = () => {
    if (!isLoading && !hasError && onPress) {
      onPress();
    }
  };

  if (isLoading) {
    return <ImageSkeleton showLoadingText={false} />;
  }

  if (hasError) {
    return (
      <Pressable onPress={onPress} className="rounded-md overflow-hidden">
        <Box
          className="bg-gray-200 rounded-md justify-center items-center border border-gray-300"
          style={{
            width: "100%",
            aspectRatio: 1,
          }}
        >
          <VStack className="items-center" space="sm">
            <Text className="text-gray-400 text-lg">📷</Text>
            <Text className="text-gray-400 text-xs text-center">
              Unable to load image
            </Text>
          </VStack>
        </Box>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      className="rounded-md overflow-hidden active:opacity-80"
    >
      <Image
        source={{ uri: imageUrl }}
        alt={alt}
        // style={{
        //   aspectRatio: 1,
        //   width: '100%'
        // }}
        className={"rounded-md"}
        size="xl"
      />
    </Pressable>
  );
};

export default FeedImage;
