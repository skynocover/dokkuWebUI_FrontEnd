import React from 'react';
import * as antd from 'antd';

interface PrimaryButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

const PrimaryButton = ({
  title,
  onClick,
  disabled,
  htmlType = 'button',
}: PrimaryButtonProps) => {
  return (
    <antd.Button
      type="primary"
      disabled={disabled}
      onClick={onClick}
      htmlType={htmlType}
    >
      {title}
    </antd.Button>
  );
};

export { PrimaryButton };
