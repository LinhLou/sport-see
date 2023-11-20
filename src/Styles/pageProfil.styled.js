import styled from "styled-components";


const PageProfilStyles = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  display: float right;
  color:black;
  & #header{
    padding-top:68px;
    padding-bottom: 77px;
    padding-left: 107px;
    padding-right: 90px;
    h1{
      margin:0;
      height: fit-content;
      font-size: 48px;
    }
    span{
      color:#FF0101;
    }
    p{
      margin:41px 0 0;
      font-size: 18px;
    }
  }
  & #container{
    padding-left: 107px;
    padding-right: 91px;
    padding-bottom:88px;
    display: grid;
    grid-template-columns: 3.2fr 1fr;
    column-gap: 31px;
    & #charts{
      display: flex;
      flex-direction: column;
      /* grid-template-rows: 1fr 1fr; */
      gap:28px;
      & #barchart{
        background-color: #FBFBFB;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      & #otherChats{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap:30px;
        div{
          /* border: 2px solid blue; */
          /* overflow: hidden; */

        }
      }
      div{
        background-color: #FBFBFB;
      }
    }
    & #cards{
      display: grid;
      grid-template-columns: 1fr;
      gap:39px;
    }
  }

`;

export default PageProfilStyles;