import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  width: 25px;
  margin: 0;
  padding: 5px;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  background: black;
  color: white;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: ForestGreen;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

function Pagination({total, page, setPage, postPerPage}) {
  const numPages = Math.ceil(total / postPerPage);
  return (
    <div>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill(null)
          .map((_, i) => (
            <Button key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? 'page' : null}>
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </div>
  );
}

export default Pagination;
