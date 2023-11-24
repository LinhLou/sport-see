import styled from "styled-components";

const CardStyles = styled.div`
  background-color: #FBFBFB;
  border-radius: 5px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02);
  display: flex;
  justify-content: start;
  align-items: center;
  gap:24px;
  padding-left: 24px;
  padding-right:24px;
  svg {
    width:50px;
    height:50px;
  }
  div{
    height: fit-content;
    padding:0;
    margin:0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    &>:first-child{
      font-size: 20px;
      font-weight: 700;
      line-height: 24px; /* 120% */
    }
    &>:last-child{
      font-size: 14px;
      color:#74798C;
      font-weight: 500;
      line-height: 24px;
    }
  }
`;
export default CardStyles;