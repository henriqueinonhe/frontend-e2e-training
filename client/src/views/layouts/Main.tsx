import { ReactNode } from "react";
import styled from "styled-components";
import Header from "@/views/components/Header";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainLayout.Wrapper>
      <Header />
      <MainLayout.Content>{children}</MainLayout.Content>
    </MainLayout.Wrapper>
  );
};

MainLayout.Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: min-content 1fr;
`;

MainLayout.Content = styled.main`
  padding: ${({ theme: { spacing } }) => spacing.xl};
  padding-top: ${({ theme: { spacing } }) => spacing.l};
`;

export default MainLayout;
