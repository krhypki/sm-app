'use client';

import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import InputWLabel from './InputWLabel';

type PasswordInputProps = React.ComponentProps<typeof InputWLabel> & {
  label: string;
};

type InputType = 'password' | 'text';

export default function PasswordInputPreview({
  label,
  ...props
}: PasswordInputProps) {
  const [inputType, setInputType] = useState<InputType>('password');
  const IconComponent = inputType === 'password' ? EyeOpenIcon : EyeNoneIcon;

  const toggleInputType = () => {
    setInputType((prevState) =>
      prevState === 'password' ? 'text' : 'password',
    );
  };

  return (
    <InputWLabel label={label} {...props} type={inputType}>
      <button type="button" onClick={toggleInputType}>
        <IconComponent className="absolute right-2 top-[42px] -translate-y-1/2 h-5 w-5" />
      </button>
    </InputWLabel>
  );
}
