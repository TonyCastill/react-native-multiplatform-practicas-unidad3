'use client';
import React from 'react';
import { TextInput, View } from 'react-native';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import {
  withStyleContext,
  useStyleContext,
} from '@gluestack-ui/utils/nativewind-utils';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';

const SCOPE = 'INPUT';

const inputStyle = tva({
  base: 'flex flex-row items-center border border-outline-300 rounded-md px-3',
  variants: {
    size: {
      sm: 'h-9',
      md: 'h-10',
      lg: 'h-11',
      xl: 'h-12',
    },
    variant: {
      outline: 'border-outline-300',
      underlined: 'border-b border-outline-300 rounded-none',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
});

const inputFieldStyle = tva({
  base: 'flex-1 text-typography-900 font-normal',
  parentVariants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
});

const ContextView = withStyleContext(View, SCOPE);

type IInputProps = React.ComponentPropsWithoutRef<typeof ContextView> &
  VariantProps<typeof inputStyle>;

const Input = React.forwardRef<
  React.ComponentRef<typeof ContextView>,
  IInputProps
>(({ size = 'md', variant = 'outline', className, ...props }, ref) => {
  return (
    <ContextView
      ref={ref}
      className={inputStyle({ size, variant, class: className })}
      context={{ size, variant }}
      {...props}
    />
  );
});

type IInputFieldProps = React.ComponentPropsWithoutRef<typeof TextInput> &
  VariantProps<typeof inputFieldStyle>;

const InputField = React.forwardRef<
  React.ComponentRef<typeof TextInput>,
  IInputFieldProps
>(({ className, placeholderTextColor, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <TextInput
      ref={ref}
      placeholderTextColor={placeholderTextColor || '#9ca3af'}
      className={inputFieldStyle({
        parentVariants: { size: parentSize },
        class: className,
      })}
      {...props}
    />
  );
});

Input.displayName = 'Input';
InputField.displayName = 'InputField';

export { Input, InputField };
