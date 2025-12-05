import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Save, X } from 'lucide-react-native';
import { ref, push, update } from 'firebase/database';
import database from '../config/firebase';
import { Input, InputField } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@/components/ui/select';
import { ChevronDownIcon } from 'lucide-react-native';

const UserFormScreen = ({ route, navigation }) => {
  const { mode, user } = route.params || {};
  const isEditMode = mode === 'edit';

  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: 'Male'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditMode && user) {
      setFormData({
        id: user.id?.toString() || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        gender: user.gender || 'Male'
      });
    }
  }, [isEditMode, user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) {
      Alert.alert('Validation Error', 'First name is required');
      return false;
    }
    if (!formData.last_name.trim()) {
      Alert.alert('Validation Error', 'Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);

    try {
      if (isEditMode) {
        // Update existing user
        const userRef = ref(database, `users/${user.firebaseId}`);
        await update(userRef, {
          id: parseInt(formData.id) || user.id,
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email.trim().toLowerCase(),
          gender: formData.gender
        });
        Alert.alert('Success', 'User updated successfully');
      } else {
        // Add new user
        const usersRef = ref(database, 'users');
        await push(usersRef, {
          id: parseInt(formData.id) || Date.now(),
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email.trim().toLowerCase(),
          gender: formData.gender
        });
        Alert.alert('Success', 'User added successfully');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving user:', error);
      Alert.alert('Error', 'Failed to save user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Box className="flex-1 bg-background-50">
        <ScrollView>
          {/* Header */}
          <Box className=" p-6" style={{ backgroundColor: '#2563eb' }}>
            <Heading size="xl" className="text-white" style={{ color: 'white' }}>
              {isEditMode ? 'Edit User' : 'Add New User'}
            </Heading>
            <Text className="text-white text-sm opacity-90 mt-1">
              {isEditMode ? 'Update user information' : 'Fill in the details below'}
            </Text>
          </Box>

          {/* Form */}
          <Box className="p-4">
            <Card className="p-5">
              <VStack space="lg">
                {/* ID Field */}
                <VStack space="sm">
                  <Text className="text-typography-700 font-semibold">
                    ID (Optional)
                  </Text>
                  <Input>
                    <InputField
                      placeholder="Auto-generated if empty"
                      value={formData.id}
                      onChangeText={(value) => handleInputChange('id', value)}
                      keyboardType="numeric"
                    />
                  </Input>
                </VStack>

                {/* First Name */}
                <VStack space="sm">
                  <Text className="text-typography-700 font-semibold">
                    First Name *
                  </Text>
                  <Input>
                    <InputField
                      placeholder="Enter first name"
                      value={formData.first_name}
                      onChangeText={(value) => handleInputChange('first_name', value)}
                    />
                  </Input>
                </VStack>

                {/* Last Name */}
                <VStack space="sm">
                  <Text className="text-typography-700 font-semibold">
                    Last Name *
                  </Text>
                  <Input>
                    <InputField
                      placeholder="Enter last name"
                      value={formData.last_name}
                      onChangeText={(value) => handleInputChange('last_name', value)}
                    />
                  </Input>
                </VStack>

                {/* Email */}
                <VStack space="sm">
                  <Text className="text-typography-700 font-semibold">
                    Email *
                  </Text>
                  <Input>
                    <InputField
                      placeholder="Enter email address"
                      value={formData.email}
                      onChangeText={(value) => handleInputChange('email', value)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </Input>
                </VStack>

                {/* Gender */}
                <VStack space="sm">
                  <Text className="text-typography-700 font-semibold">
                    Gender *
                  </Text>
                  <Select
                    selectedValue={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                  >
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Select gender" />
                      <SelectIcon className="mr-3" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Male" value="Male" />
                        <SelectItem label="Female" value="Female" />
                        <SelectItem label="Genderfluid" value="Genderfluid" />
                        <SelectItem label="Non-binary" value="Non-binary" />
                        <SelectItem label="Other" value="Other" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </VStack>

                {/* Buttons */}
                <VStack space="md" className="mt-4">
                  <Button
                    size="lg"
                    className="bg-success-600"
                    onPress={handleSave}
                    disabled={saving}
                  >
                    <Icon as={Save} size="lg" className="text-white mr-2" />
                    <ButtonText>
                      {saving ? 'Saving...' : (isEditMode ? 'Update User' : 'Save User')}
                    </ButtonText>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-typography-300"
                    onPress={() => navigation.goBack()}
                    disabled={saving}
                  >
                    <Icon as={X} size="lg" className="text-typography-600 mr-2" />
                    <ButtonText className="text-typography-600">Cancel</ButtonText>
                  </Button>
                </VStack>
              </VStack>
            </Card>
          </Box>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default UserFormScreen;
