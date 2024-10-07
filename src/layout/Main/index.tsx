import { S } from './style';
import { Header } from '@/components';

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <S.Main>
      <Header />
      {children}
    </S.Main>
  );
};
