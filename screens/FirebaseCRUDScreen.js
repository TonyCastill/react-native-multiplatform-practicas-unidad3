import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { Trash2, Edit, Plus, RefreshCw, User } from 'lucide-react-native';
import { ref, onValue, push, update, remove } from 'firebase/database';
import database from '../config/firebase';

const FirebaseCRUDScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch users from Firebase
  useEffect(() => {
    const usersRef = ref(database, 'users');
    
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.keys(data).map((key) => ({
          firebaseId: key,
          ...data[key]
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
      setLoading(false);
      setRefreshing(false);
    }, (error) => {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch users from Firebase');
      setLoading(false);
      setRefreshing(false);
    });

    return () => unsubscribe();
  }, []);

  // Refresh data
  const onRefresh = () => {
    setRefreshing(true);
  };

  // Delete user
  const handleDelete = (firebaseId, firstName, lastName) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${firstName} ${lastName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const userRef = ref(database, `users/${firebaseId}`);
              await remove(userRef);
              Alert.alert('Success', 'User deleted successfully');
            } catch (error) {
              console.error('Error deleting user:', error);
              Alert.alert('Error', 'Failed to delete user');
            }
          }
        }
      ]
    );
  };

  // Navigate to Add/Edit screen
  const handleAdd = () => {
    navigation.navigate('UserForm', { mode: 'add' });
  };

  const handleEdit = (user) => {
    navigation.navigate('UserForm', { mode: 'edit', user });
  };

  // Gender badge color
  const getGenderColor = (gender) => {
    const lowerGender = gender?.toLowerCase() || '';
    if (lowerGender.includes('male') && !lowerGender.includes('female')) return 'info';
    if (lowerGender.includes('female') && !lowerGender.includes('male')) return 'error';
    return 'success';
  };

  if (loading) {
    return (
      <Box className="flex-1 justify-center items-center bg-background-50">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-typography-600">Loading users...</Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-background-50">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <Box className="bg-primary p-6 pb-8">
          <VStack space="md">
            <HStack className="justify-between items-center">
              <Heading size="xl" className="text-white">
                Users Database
              </Heading>
              <Pressable onPress={onRefresh}>
                <Icon as={RefreshCw} size="xl" className="text-white" />
              </Pressable>
            </HStack>
            <Text className="text-white text-sm opacity-90">
              Total Users: {users.length}
            </Text>
          </VStack>
        </Box>

        {/* Add User Button */}
        <Box className="px-4 py-4">
          <Button
            size="lg"
            className="bg-success-600"
            onPress={handleAdd}
          >
            <Icon as={Plus} size="lg" className="text-white mr-2" />
            <ButtonText>Add New User</ButtonText>
          </Button>
        </Box>

        {/* Users List */}
        <VStack space="md" className="px-4 pb-6">
          {users.length === 0 ? (
            <Card className="p-8">
              <VStack space="md" className="items-center">
                <Icon as={User} size="2xl" className="text-typography-400" />
                <Text className="text-center text-typography-600">
                  No users found. Add your first user!
                </Text>
              </VStack>
            </Card>
          ) : (
            users.map((user) => (
              <Card key={user.firebaseId} className="p-4">
                <VStack space="sm">
                  <HStack className="justify-between items-start">
                    <VStack space="xs" className="flex-1">
                      <HStack space="sm" className="items-center">
                        <Icon as={User} size="md" className="text-primary-600" />
                        <Heading size="md" className="text-typography-900">
                          {user.first_name} {user.last_name}
                        </Heading>
                      </HStack>
                      
                      <VStack space="xs" className="mt-2">
                        <HStack space="sm" className="items-center">
                          <Text className="text-typography-600 text-xs font-semibold">
                            ID:
                          </Text>
                          <Text className="text-typography-500 text-xs">
                            {user.id}
                          </Text>
                        </HStack>
                        
                        <HStack space="sm" className="items-center">
                          <Text className="text-typography-600 text-xs font-semibold">
                            Email:
                          </Text>
                          <Text className="text-typography-500 text-xs">
                            {user.email}
                          </Text>
                        </HStack>
                      </VStack>

                      <Badge 
                        action={getGenderColor(user.gender)} 
                        variant="solid" 
                        size="sm" 
                        className="mt-2 self-start"
                      >
                        <BadgeText>{user.gender}</BadgeText>
                      </Badge>
                    </VStack>

                    <VStack space="sm" className="ml-2">
                      <Pressable onPress={() => handleEdit(user)}>
                        <Box className="bg-primary-100 p-2 rounded-md">
                          <Icon as={Edit} size="md" className="text-primary-600" />
                        </Box>
                      </Pressable>
                      
                      <Pressable onPress={() => handleDelete(user.firebaseId, user.first_name, user.last_name)}>
                        <Box className="bg-error-100 p-2 rounded-md">
                          <Icon as={Trash2} size="md" className="text-error-600" />
                        </Box>
                      </Pressable>
                    </VStack>
                  </HStack>
                </VStack>
              </Card>
            ))
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default FirebaseCRUDScreen;
