import styled from 'styled-components';

const LayoutStyled = styled.div`
  min-height: 768px;
  min-width: 1024px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 91px 1fr;
  header{
    background-color: black;
    padding-left: 28px;
    display: grid;
    grid-template-columns: 180px 1fr;
    div, nav{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    nav{
      padding-right:91px;
      padding-left:149px;
      a{
        text-decoration: none;
        color:white;
        font-family: Roboto;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; 
        &:hover{
          color:#FF0101;
        }
        &.active{
          color:#FF0101;
        }
        &.inactive{
          color:white;
        }
      }
    }
  }
  main{
    box-sizing: border-box;
    display: flex;

  }
  aside{
    width: 117px;
    background-color: black;
    padding-top: 256px;
    display: grid;
    grid-template-rows: min-content 1fr;
    color: white;

    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap:20px;
    }
    #icons{
      justify-content:space-between;
      svg{
        width: 64px;
        height: 64px;
      }
    }
    #copyrigth{
      justify-content:flex-end;
      padding-bottom: 59px;
      p{
        writing-mode:vertical-rl;
        transform:rotate(-180deg);
        font-size: 12px;
      }
    }
  }

`;

export default LayoutStyled;