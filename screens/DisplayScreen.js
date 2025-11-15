import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, XCircle, CheckCircle } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableData,
  TableCaption,
} from "@/components/ui/table";
import { ScrollView, Animated, StyleSheet } from "react-native";

const DisplayScreen = () => {
  const [showToast, setShowToast] = useState(false);
  const slideAnim = useState(new Animated.Value(-100))[0];
  const opacityAnim = useState(new Animated.Value(0))[0];
  
  const [products, setProducts] = useState([
    { name: "T-Shirt", price: 12.00, inCart: false, soldOut: true },
    { name: "T-Shirt", price: 12.00, inCart: false, soldOut: false },
    { name: "T-Shirt", price: 12.00, inCart: false, soldOut: false },
  ]);

  useEffect(() => {
    if (showToast) {
      // Animación de entrada
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto cerrar después de 3 segundos
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setShowToast(false);
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleAddToCart = () => {
    setShowToast(true);
  };

  const toggleProductInCart = (index) => {
    const updatedProducts = [...products];
    if (!updatedProducts[index].soldOut) {
      updatedProducts[index].inCart = !updatedProducts[index].inCart;
      setProducts(updatedProducts);
    }
  };
  return (
    <Box style={{ flex: 1 }} className="bg-background-50">
      {/* Toast personalizado compatible con Android */}
      {showToast && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [{ translateY: slideAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Box className="bg-success-700 p-4 m-4 rounded-lg shadow-lg border border-success-600">
            <HStack space="md" className="items-center">
              <Icon as={CheckCircle} className="stroke-background-0" size="xl" />
              <VStack space="xs" className="flex-1">
                <Text className="text-typography-0 font-semibold text-base">
                  Éxito
                </Text>
                <Text className="text-typography-50 text-sm">
                  ¡Tu pedido se realizó con éxito, gracias por comprar con nosotros!
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Animated.View>
      )}

      <ScrollView style={{ flex: 1 }}>
        <Box
        mt="$8"
        className="m-3 p-4"
        alignItems="center"
        justifyContent="center"
      >
        <Center justifyContent="center" alignItems="center">
          <Card className="p-4 rounded-lg max-w-[360px] m-3">
            <Center>
              <Image
                width="250"
                height="250"
                source={{
                  uri: "https://gluestack.github.io/public-blog-video-assets/saree.png",
                }}
                className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
                alt="image"
              />
            </Center>
            <VStack className="mt-4 mb-2">
              <Text className="text-sm font-normal text-typography-700">
                Fashion Clothing
              </Text>
              <Heading size="md" className="mb-4">
                Cotton Kurta
              </Heading>
              <Text size="sm">
                Floral embroidered notch neck thread work cotton kurta in white
                and black.
              </Text>
            </VStack>
            <Box className="flex-col sm:flex-row">
              <Button 
                className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
                onPress={handleAddToCart}
              >
                <ButtonText size="sm">Add to cart</ButtonText>
              </Button>
              <Button
                variant="outline"
                className="px-4 py-2 border-outline-300 sm:flex-1"
              >
                <ButtonText size="sm" className="text-typography-600">
                  Wishlist
                </ButtonText>
              </Button>
            </Box>
          </Card>
        </Center>
      </Box>
      <Box mt="$8">
        <Center justifyContent="center" alignItems="center">
          <Card className="p-5 rounded-lg max-w-[360px] m-3">
            <Box className="rounded-lg overflow-hidden w-full">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>ST</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={index}>
                      <TableData>{product.name}</TableData>
                      <TableData className="font-normal">
                        {product.price}
                      </TableData>
                      <TableData>
                        {product.soldOut ? (
                          <Badge action="error" variant="solid" size="sm">
                            <BadgeIcon as={XCircle} />
                            <BadgeText>Sold</BadgeText>
                          </Badge>
                        ) : (
                          <Pressable onPress={() => toggleProductInCart(index)}>
                            <Icon 
                              as={ShoppingCart}
                              size="lg"
                              className={product.inCart ? "text-success-600" : "text-typography-400"}
                            />
                          </Pressable>
                        )}
                      </TableData>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="font-normal">
                  Showing recent membership details
                </TableCaption>
              </Table>
            </Box>
          </Card>
        </Center>
      </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
});

export default DisplayScreen;
