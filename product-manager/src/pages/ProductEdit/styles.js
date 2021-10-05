import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  .success {
    color: #6cdb30;
    margin-bottom: 15px;
    border: 1px solid #6cdb30;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  .error {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;