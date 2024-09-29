import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return <section className={cn('container', className)}>{children}</section>;
};

export default Container;
