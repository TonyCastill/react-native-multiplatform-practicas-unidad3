import React, { useState } from "react";
import { ScrollView } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Grid, GridItem } from "@/components/ui/grid";
import { Button, ButtonIcon } from "@/components/ui/button";
import { EditIcon, Heart, EyeOff } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";

// Componentes personalizados
import ImageModal from '../components/custom/ImageModal';
import ImageSkeleton from '../components/custom/ImageSkeleton';
import FeedImage from '../components/custom/FeedImage';

const ProfileScreen = () => {
  // Estados para el modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedCaption, setSelectedCaption] = useState('');

  // Array de imágenes con captions
  const feedImages = [
    {
      url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      caption: "Beautiful mountain landscape with crystal clear lake reflection"
    },
    {
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXJsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      caption: "Coding late at night - the developer's life"
    },
    {
      url: "https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      caption: "Modern workspace with clean aesthetic"
    },
    {
      url: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXJsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      caption: "Stunning urban architecture at sunset"
    },
    {
      url: "https://images.unsplash.com/photo-1627119703136-3964f14b7325?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TEFOU0NBUEV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      caption: "Peaceful countryside landscape"
    },
    {
      url: "https://images.unsplash.com/photo-1657161540865-a46753494068?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TEFOU0NBUEV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      caption: "Dramatic sky over rolling hills"
    },
    {
      url: "https://images.unsplash.com/photo-1570131728383-2b752198346b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fExBTlNDQVBFfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      caption: "Serene forest path in autumn colors"
    }
  ];

  // Función para abrir el modal con la imagen seleccionada
  const openImageModal = (imageUrl, caption) => {
    setSelectedImage(imageUrl);
    setSelectedCaption(caption);
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedImage('');
    setSelectedCaption('');
  };

  return (
    <>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <VStack space="4xl" className="items-center my-8">
          <Avatar size="2xl">
            <AvatarFallbackText>TC</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
              }}
            />
          </Avatar>
          <Text size="3xl" className="text-center">
            Tony Castillo
          </Text>
          <VStack space="md" className="items-center w-3/4">
            <Text size="lg">Software Engineer at TechCorp</Text>
            <Text size="md">Ags, MX</Text>
          </VStack>
        </VStack>

        <Grid className="gap-5" _extra={{ className: "grid-cols-12" }}>
          <GridItem
            className="rounded-md"
            _extra={{
              className: "col-span-12",
            }}
          >
            <Grid className="gap-5" _extra={{ className: "grid-cols-12" }}>
              <GridItem
                className="p-3 rounded-md"
                _extra={{
                  className: "col-span-4",
                }}
              >
                <Grid
                  className="gap-2"
                  _extra={{
                    className: "grid-cols-4",
                  }}
                >
                  <GridItem
                    className="rounded-md items-center"
                    _extra={{
                      className: "col-span-4",
                    }}
                  >
                    <Text className="text-sm" bold={true}>
                      156
                    </Text>
                  </GridItem>
                  <GridItem
                    className="rounded-md items-center"
                    _extra={{
                      className: "col-span-4",
                    }}
                  >
                    <Text className="text-sm">Posts</Text>
                  </GridItem>
                </Grid>
              </GridItem>

              <GridItem
                className="p-3 rounded-md"
                _extra={{
                  className: "col-span-4",
                }}
              >
                <Grid
                  className="gap-2"
                  _extra={{
                    className: "grid-cols-4",
                  }}
                >
                  <GridItem
                    className="rounded-md items-center"
                    _extra={{
                      className: "col-span-4",
                    }}
                  >
                    <Text className="text-sm" bold={true}>
                      2.8k
                    </Text>
                  </GridItem>
                  <GridItem
                    className="rounded-md items-center"
                    _extra={{
                      className: "col-span-4",
                    }}
                  >
                    <Text className="text-sm">Following</Text>
                  </GridItem>
                </Grid>
              </GridItem>

              <GridItem
                className="p-3 rounded-md"
                _extra={{
                  className: "col-span-4",
                }}
              >
                <Grid
                  className="gap-2"
                  _extra={{
                    className: "grid-cols-4",
                  }}
                >
                  <GridItem
                    className="rounded-md items-center"
                    _extra={{
                      className: "col-span-4",
                    }}
                  >
                    <Text className="text-sm" bold={true}>
                      5.2k
                    </Text>
                  </GridItem>
                  <GridItem
                    className="rounded-md items-center"
                    _extra={{
                      className: "col-span-4",
                    }}
                  >
                    <Text className="text-sm">Followers</Text>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem
            _extra={{
              className: "col-span-12",
            }}
          >
            <Grid className="gap-3" _extra={{ className: "grid-cols-12" }}>
              <GridItem
                className="items-center"
                _extra={{
                  className: "col-span-4",
                }}
              >
                <Button size="lg" className="rounded-full bg-background-200">
                  <ButtonIcon as={EditIcon} className="text-background-500" />
                </Button>
              </GridItem>
              <GridItem
                className="items-center"
                _extra={{
                  className: "col-span-4",
                }}
              >
                <Button size="lg" className="rounded-full bg-background-200">
                  <ButtonIcon as={Heart} className="text-background-500" />
                </Button>
              </GridItem>
              <GridItem
                className="items-center"
                _extra={{
                  className: "col-span-4",
                }}
              >
                <Button size="lg" className="rounded-full bg-background-200">
                  <ButtonIcon as={EyeOff} className="text-background-500" />
                </Button>
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem
            _extra={{
              className: "col-span-12",
            }}
          >
            <Text size="lg" className="p-3">
              Galería ({feedImages.length + 1} imágenes)
            </Text>
          </GridItem>
        </Grid>
        
        {/* Feed Content - Grid dinámico */}
        <Grid className="gap-3 mb-6" _extra={{ className: "grid-cols-12" }}>
          {/* Item con skeleton loading */}
          <GridItem
            _extra={{
              className: "col-span-4",
            }}
          >
            <ImageSkeleton />
          </GridItem>
          
          {/* Render de imágenes dinámicamente con skeleton loading */}
          {feedImages.map((item, index) => (
            <GridItem
              key={index}
              _extra={{
                className: "col-span-4",
              }}
            >
              <FeedImage
                imageUrl={item.url}
                alt={`Gallery image ${index + 1}`}
                onPress={() => openImageModal(item.url, item.caption)}
              />
            </GridItem>
          ))}
          
          
        </Grid>
      </ScrollView>

      {/* Modal de imagen */}
      <ImageModal
        visible={modalVisible}
        imageUrl={selectedImage}
        caption={selectedCaption}
        onClose={closeImageModal}
      />
    </>
  );
};

export default ProfileScreen;
