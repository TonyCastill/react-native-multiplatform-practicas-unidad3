import React, { useState } from 'react';
import { ScrollView, Text, Alert, View, TouchableOpacity, TextInput, Linking } from 'react-native';
import { ExternalLink, ChevronDown, Square, CheckSquare, Circle, Disc, Check } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { Checkbox, CheckboxGroup, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from '@/components/ui/checkbox';
import { Link, LinkText } from '@/components/ui/link';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@/components/ui/radio';
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@/components/ui/select';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText } from '@/components/ui/form-control';
// import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
const FormsScreen = () => {
  // Estados para controlar los componentes
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [pressablePressed, setPressablePressed] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [sliderValue, setSliderValue] = useState(25);
  const [switchValue, setSwitchValue] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <Box className="p-6">
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2563eb', textAlign: 'center', marginBottom: 20 }}>
          Formulario Gluestack UI
        </Text>

        {/* CheckboxGroup - 5 elementos */}
        <FormControl className="mb-6 mx-2">
          <FormControlLabel mb="$3">
            <FormControlLabelText size="lg" className="font-bold text-primary-600">
              Selecciona tus lenguajes favoritos (Checkbox Group)
            </FormControlLabelText>
          </FormControlLabel>
          
          <CheckboxGroup 
            value={checkboxValues} 
            onChange={setCheckboxValues}
            className="space-y-3"
          >
            {['JavaScript', 'Python', 'Java', 'C++', 'React Native'].map((language) => (
              <Checkbox key={language} value={language} size="md">
                <CheckboxIndicator mr="$2">
                  <CheckboxIcon as={Check} />
                </CheckboxIndicator>
                <CheckboxLabel>{language}</CheckboxLabel>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </FormControl>

        {/* Links con Icons - 5 elementos */}
        <FormControl className="mb-6 mx-2">
          <FormControlLabel mb="$3">
            <FormControlLabelText size="lg" className="font-bold text-primary-600">
              Enlaces útiles (Links con Icons)
            </FormControlLabelText>
          </FormControlLabel>
          
          <Box className="space-y-3">
            {[
              { title: 'Documentación Gluestack', url: 'https://gluestack.io' },
              { title: 'React Native', url: 'https://reactnative.dev' },
              { title: 'Expo', url: 'https://expo.dev' },
              { title: 'GitHub', url: 'https://github.com' },
              { title: 'Stack Overflow', url: 'https://stackoverflow.com' }
            ].map((link, index) => (
              <Link key={index} href={link.url} className="flex-row items-center py-2">
                <Icon as={ExternalLink} size="sm" className="mr-2 text-blue-500" />
                <LinkText className="text-blue-600 underline">{link.title}</LinkText>
              </Link>
            ))}
          </Box>
        </FormControl>

        {/* Pressable con cambio de color */}
        <FormControl className="mb-6 mx-2">
          <FormControlLabel mb="$3">
            <FormControlLabelText size="lg" className="font-bold text-primary-600">
              Botón Interactivo (Pressable)
            </FormControlLabelText>
          </FormControlLabel>
          
          <Pressable
            onPressIn={() => setPressablePressed(true)}
            onPressOut={() => setPressablePressed(false)}
            onPress={() => Alert.alert('¡Presionaste el botón!', 'El color cambió mientras lo presionabas')}
            className={`p-4 rounded-lg border-2 ${pressablePressed ? 'bg-red-100 border-red-400' : 'bg-blue-100 border-blue-400'}`}
          >
            <Text style={{ 
              color: pressablePressed ? '#dc2626' : '#2563eb',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16
            }}>
              {pressablePressed ? '¡Presionado! (Rojo)' : 'Presiona aquí (Azul)'}
            </Text>
          </Pressable>
        </FormControl>

        {/* RadioGroup con FormControl - 3 opciones */}
        <FormControl className="mb-6 mx-2">
          <FormControlLabel mb="$3">
            <FormControlLabelText size="lg" className="font-bold text-primary-600">
              Selecciona tu nivel de experiencia (Radio Group)
            </FormControlLabelText>
          </FormControlLabel>
          
          <RadioGroup value={String(radioValue)} onChange={(value) => setRadioValue(String(value))} className="space-y-3">
            {['Principiante', 'Intermedio', 'Avanzado'].map((level) => (
              <Radio key={level} value={level} size="md">
                <RadioIndicator mr="$2">
                  <RadioIcon as={Check} />
                </RadioIndicator>
                <RadioLabel>{level}</RadioLabel>
              </Radio>
            ))}
          </RadioGroup>
          
          <FormControlHelper>
            <FormControlHelperText className="text-gray-500">
              Elige el nivel que mejor describa tu experiencia
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>

        {/* Select FormControlled - 3 opciones */}
        <FormControl className="mb-6 mx-2">
          <FormControlLabel mb="$3">
            <FormControlLabelText size="lg" className="font-bold text-primary-600">
              Selecciona tu ciudad (Select Controlado)
            </FormControlLabelText>
          </FormControlLabel>
          
          <Select selectedValue={String(selectValue)} onValueChange={(value) => setSelectValue(String(value))}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Elige una ciudad" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDown} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Ciudad de México" value="cdmx" />
                <SelectItem label="Guadalajara" value="gdl" />
                <SelectItem label="Monterrey" value="mty" />
              </SelectContent>
            </SelectPortal>
          </Select>
          
          <FormControlHelper>
            <FormControlHelperText className="text-gray-500">
              Selecciona la ciudad donde vives
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>

        {/* Slider con valores Min y Max */}
        <FormControl className="mb-6 mx-2">
          <FormControlLabel mb="$3">
            <FormControlLabelText size="lg" className="font-bold text-primary-600">
              Ajusta la edad: {sliderValue} años (Slider)
            </FormControlLabelText>
          </FormControlLabel>
          
          <Slider
            value={Number(sliderValue)}
            onChange={(value) => setSliderValue(Number(value))}
            minValue={18}
            maxValue={65}
            step={1}
            className="w-full"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          
          <FormControlHelper>
            <FormControlHelperText className="text-gray-500">
              Rango: 18 - 65 años
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>

        {/* Switch con estado controlado */}
        <FormControl className="mb-6 mx-2">
          <FormControlLabel mb="$3">
            <FormControlLabelText size="lg" className="font-bold text-primary-600">
              Notificaciones {switchValue ? 'Activadas' : 'Desactivadas'} (Switch)
            </FormControlLabelText>
          </FormControlLabel>
          
          <Box className="flex-row items-center">
            <Switch
              value={Boolean(switchValue)}
              onValueChange={(value) => setSwitchValue(Boolean(value))}
              size="md"
              className="mr-3"
            />
            <Text className="text-gray-600">
              {switchValue ? 'Recibirás notificaciones' : 'No recibirás notificaciones'}
            </Text>
          </Box>
        </FormControl>

        {/* TextArea con FormControl */}
        <FormControl className="mb-6 mx-2">
          <FormControlLabel mb="$3">
            <FormControlLabelText size="lg" className="font-bold text-primary-600">
              Comentarios adicionales (TextArea)
            </FormControlLabelText>
          </FormControlLabel>
          
          <Textarea>
            <TextareaInput
              placeholder="Escribe tus comentarios aquí..."
              value={textareaValue}
              onChangeText={setTextareaValue}
              numberOfLines={4}
              multiline={true}
            />
          </Textarea>
          
          <FormControlHelper>
            <FormControlHelperText className="text-gray-500">
              Máximo 500 caracteres ({textareaValue.length}/500)
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>

        {/* Resumen de valores seleccionados */}
        <Box className="mt-8 mx-2 p-4 bg-green-50 rounded-lg border border-green-200">
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#059669', marginBottom: 10 }}>
            Resumen de tu selección:
          </Text>
          <Text className="text-gray-700 mb-2">• Lenguajes: {checkboxValues.join(', ') || 'Ninguno'}</Text>
          <Text className="text-gray-700 mb-2">• Experiencia: {radioValue || 'No seleccionado'}</Text>
          <Text className="text-gray-700 mb-2">• Ciudad: {selectValue || 'No seleccionada'}</Text>
          <Text className="text-gray-700 mb-2">• Edad: {sliderValue} años</Text>
          <Text className="text-gray-700 mb-2">• Notificaciones: {switchValue ? 'Sí' : 'No'}</Text>
          <Text className="text-gray-700">• Comentarios: {textareaValue ? 'Sí tiene' : 'Sin comentarios'}</Text>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default FormsScreen;