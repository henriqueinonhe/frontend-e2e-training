import styled from "styled-components";
import Button from "@/views/components/Button";
import { Link } from "react-router-dom";
import { testIds } from "../helpers/testIds";
import { useNotesPreview } from "../hooks/useNotesPreview";
import { useUser } from "../hooks/useUser";

export const Header = () => {
  const { fetchStatus, status } = useNotesPreview();

  const { logout } = useUser();

  return (
    <Header.Wrapper>
      <Header.LeftRow>
        <Header.Title data-testid={testIds.headerTitle}>
          Don't Forget
        </Header.Title>
      </Header.LeftRow>

      <Header.RightRow>
        {fetchStatus === "fetching" && status !== "pending" && (
          <Header.Loading>
            <span>Loading...</span>
          </Header.Loading>
        )}

        <Link to="/notes/add">
          <Button data-testid={testIds.addNoteButton}>Add note</Button>
        </Link>

        <Header.Logout onClick={logout} data-testid={testIds.logoutButton}>
          Logout
        </Header.Logout>
      </Header.RightRow>
    </Header.Wrapper>
  );
};

Header.Wrapper = styled.header`
  padding: ${({ theme: { spacing } }) => `${spacing.l} ${spacing.xl}`};
  display: flex;
  justify-content: space-between;
`;

Header.LeftRow = styled.div``;

Header.RightRow = styled.div`
  display: flex;
  align-items: center;
`;

Header.Title = styled.h2`
  margin: 0;
  padding: ${({ theme: { colors } }) => colors.primary};
`;

Header.Loading = styled.span`
  margin-right: ${({ theme: { spacing } }) => spacing.l};
`;

Header.Logout = styled(Button)`
  color: red;
  border-color: red;
  margin-left: 12px;
`;

export default Header;
