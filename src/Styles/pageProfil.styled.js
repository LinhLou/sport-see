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
    padding-right: 90px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 31px;
    & #charts{
      display: grid;
      grid-template-rows: 1fr 1fr;
      gap:28px;
      &#barchart{
        
      }
      div{
        background-color: #FF0101;
      }
      /* div{
        height: 520px;
      } */
    }
    & #cards{
      display: grid;
      grid-template-columns: 1fr;
      gap:39px;
    }
  }

`

export default PageProfilStyles;