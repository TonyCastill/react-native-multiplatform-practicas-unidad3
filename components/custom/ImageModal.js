import React from 'react';
import { Modal } from 'react-native';
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { X } from "lucide-react-native";
import { ButtonIcon } from "@/components/ui/button";

const ImageModal = ({ visible, imageUrl, caption, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <VStack 
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      >
        <Card className="w-11/12 max-w-md p-4 bg-white rounded-lg">
          <VStack space="md">
            <Button 
              size="sm" 
              variant="ghost" 
              className="self-end"
              onPress={onClose}
            >
              <ButtonIcon as={X} className="text-gray-500" />
            </Button>
            
            <Image
              source={{ uri: imageUrl }}
              alt="Enlarged image"
              className="w-full h-64 rounded-md"
              style={{ resizeMode: 'cover' }}
            />
            
            <Text size="md" className="text-center text-gray-700">
              {caption}
            </Text>
          </VStack>
        </Card>
      </VStack>
    </Modal>
  );
};

export default ImageModal;