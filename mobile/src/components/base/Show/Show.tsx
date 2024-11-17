import React, {Children} from 'react';

interface IShowProps {
  children: React.ReactElement<{isTrue: boolean; children: React.ReactNode}>[];
}
const Show = ({children}: IShowProps) => {
  let when: React.ReactNode = null;
  let otherwise: React.ReactNode = null;
  Children.forEach(children, element => {
    if (!element.props?.isTrue) {
      otherwise = element;
    } else if (element.props.isTrue) {
      when = element;
    }
  });
  return when || otherwise;
};
export default Show;

Show.When = ({
  isTrue,
  children,
}: {
  isTrue?: boolean;
  children: React.ReactNode;
}) => isTrue && children;
Show.Else = ({children}: {children: React.ReactNode}) => children;
