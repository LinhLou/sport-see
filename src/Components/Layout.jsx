import React, { useRef, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import LayoutStyled from '../Styles/Layout.styled';
import Profil from '../Pages/Profil';
import Acceuil from '../Pages/Acceuil';
import Reglage from '../Pages/Reglage';
import Communaute from '../Pages/Communaute';


export default function Layout() {
  const location = useLocation();
  const refAcceuil = useRef();
  const refProfil = useRef();
  const refReglage = useRef();
  const refCommunaute = useRef();
  useEffect(()=>{
    if(location.pathname=='/'){
      refAcceuil.current.className='active';
    }else if(location.pathname.includes('/user/')){
      refProfil.current.className='active';
    }else if(location.pathname=='/reglage'){
      refReglage.current.className='active';
    }else if(location.pathname=='/communaute'){
      refCommunaute.current.className='active';
    }
    return ()=>{
      refAcceuil.current.className='inactive';
      refProfil.current.className='inactive';
      refReglage.current.className='inactive';
      refCommunaute.current.className='inactive';
    }
  })


  return (
    <LayoutStyled>
      <header>
        <div id='logo'>
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
            <path d="M28.5982 57.7027C44.3925 57.7027 57.1963 44.7855 57.1963 28.8514C57.1963 12.9172 44.3925 0 28.5982 0C12.8038 0 0 12.9172 0 28.8514C0 44.7855 12.8038 57.7027 28.5982 57.7027Z" fill="#FF0101"/>
            <path d="M40.9174 16.423C43.5556 16.423 45.6942 14.2654 45.6942 11.6039C45.6942 8.94239 43.5556 6.78479 40.9174 6.78479C38.2792 6.78479 36.1406 8.94239 36.1406 11.6039C36.1406 14.2654 38.2792 16.423 40.9174 16.423Z" fill="#020203"/>

            <g mask="url(#mask0_44_12)">
              <path d="M39.5346 29.422C39.8489 29.9293 40.4146 30.2463 41.0431 30.2463C41.3574 30.2463 41.6716 30.1829 41.9859 29.9927L50.5968 24.7931C51.4767 24.2858 51.7281 23.1445 51.2253 22.3201C50.7225 21.4324 49.5911 21.1788 48.774 21.686L41.6088 25.9979L38.1519 19.2131C37.2091 18.2619 36.1406 17.3108 35.0721 16.4865L24.827 11.2869C24.1356 10.9698 23.3814 11.0332 22.8157 11.5405L14.2677 19.3399C13.5134 20.0374 13.4506 21.1788 14.142 21.8763C14.8334 22.6372 15.9647 22.7006 16.6561 22.0031L24.387 15.028L29.7295 17.7546L20.553 32.0852L-0.377096 57.0686C-1.19419 58.0197 -1.13133 59.5415 -0.125684 60.3659C0.817112 61.1902 2.32559 61.1268 3.14268 60.1122L23.4442 36.4605L32.1808 38.4896L26.2098 47.9376C25.5812 49.079 25.9584 50.474 27.0897 51.1081C28.0954 51.6788 29.4153 51.4251 30.1067 50.4106L37.7747 38.1725C38.2147 37.5384 38.2776 36.7141 38.0261 36.0166C37.7119 35.3191 37.1462 34.8118 36.392 34.685L29.6667 33.0998L35.7634 23.4615L39.5346 29.422Z" fill="#020203"/>
            </g>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="110" height="25" viewBox="0 0 110 25" fill="none">
            <path d="M4.28111 18.553C3.14975 18.0458 2.33267 17.2848 1.70413 16.3337C1.0756 15.3826 0.761339 14.3046 0.698486 13.0364H3.65258C3.71543 14.1144 4.21826 15.0021 4.97249 15.6996C5.72673 16.3971 6.85809 16.7142 8.11515 16.7142C9.2465 16.7142 10.1264 16.4605 10.8178 16.0166C11.5092 15.5094 11.8863 14.8753 11.8863 13.9875C11.8863 13.3534 11.6978 12.8462 11.3207 12.4657C10.9435 12.0853 10.4407 11.8316 9.81218 11.6414C9.18365 11.4512 8.24085 11.2609 7.04665 11.0073H6.92094C5.78958 10.8171 4.78393 10.5634 3.96684 10.183C3.14975 9.80251 2.45837 9.29523 1.89269 8.59773C1.38987 7.90022 1.13846 6.94908 1.13846 5.80771C1.13846 4.72975 1.38987 3.7786 1.95555 2.95428C2.52123 2.12995 3.27546 1.49586 4.28111 0.988581C5.28676 0.544714 6.41812 0.291077 7.67518 0.291077C8.99509 0.291077 10.1893 0.544715 11.1949 1.05199C12.2635 1.55927 13.0805 2.19336 13.6462 3.0811C14.2747 3.96883 14.589 4.98338 14.589 6.06135H11.6349C11.5092 5.1102 11.0692 4.34929 10.3779 3.7786C9.68647 3.20792 8.74368 2.89087 7.67518 2.89087C6.60667 2.89087 5.72673 3.14451 5.0982 3.58837C4.46967 4.03224 4.15541 4.72975 4.15541 5.55407C4.15541 6.18817 4.34396 6.63203 4.72108 7.01249C5.0982 7.32954 5.60102 7.64659 6.22955 7.83682C6.85809 8.02704 7.73803 8.21727 8.93224 8.47091C10.1264 8.66114 11.1321 8.97819 12.012 9.29523C12.892 9.61228 13.5834 10.183 14.149 10.8805C14.7147 11.578 14.9661 12.5291 14.9661 13.6705C14.9661 14.7485 14.6519 15.6996 14.0862 16.5873C13.5205 17.4751 12.7034 18.1092 11.6349 18.6164C10.5664 19.1237 9.43506 19.3139 8.11515 19.3139C6.66953 19.3774 5.34961 19.1237 4.28111 18.553Z" fill="#E60000"/>
            <path d="M27.851 6.25156C28.7938 6.82225 29.548 7.58316 30.1137 8.66112C30.6794 9.73909 30.9308 10.9439 30.9308 12.4023C30.9308 13.7973 30.6794 15.0021 30.1137 16.0166C29.548 17.0946 28.7938 17.9189 27.851 18.4896C26.9082 19.0603 25.7769 19.3773 24.5826 19.3773C23.3884 19.3773 22.3828 19.1237 21.5657 18.6164C20.7486 18.1092 20.1829 17.4116 19.743 16.5873L20.1201 15.9532V24.5769H17.2917V5.61746H19.743L20.3086 8.97817L19.6801 8.34408C20.1829 7.51975 20.8115 6.82225 21.5657 6.25156C22.3828 5.74428 23.3256 5.49064 24.5198 5.49064C25.7768 5.42724 26.8454 5.74428 27.851 6.25156ZM22.0057 8.40748C21.3771 8.78794 20.9372 9.29522 20.6229 9.99272C20.3086 10.6902 20.1201 11.4511 20.1201 12.3389C20.1201 13.2266 20.3086 14.0509 20.6229 14.7484C20.9372 15.4459 21.44 15.9532 22.0057 16.3971C22.6342 16.7775 23.2627 16.9678 24.0798 16.9678C24.8341 16.9678 25.5254 16.7775 26.154 16.3971C26.7825 16.0166 27.2225 15.4459 27.5367 14.8119C27.851 14.1143 28.0396 13.3534 28.0396 12.4657C28.0396 11.578 27.851 10.817 27.5367 10.1195C27.2225 9.42204 26.7825 8.91476 26.154 8.5343C25.5254 8.15385 24.8341 7.96362 24.0798 7.96362C23.2627 7.8368 22.5713 8.02703 22.0057 8.40748Z" fill="#E60000"/>
            <path d="M36.022 18.4896C34.9534 17.9189 34.1364 17.0946 33.5707 16.0166C33.005 14.9387 32.6907 13.7339 32.6907 12.4023C32.6907 11.0073 33.005 9.80251 33.5707 8.72454C34.1364 7.64658 34.9534 6.88567 36.022 6.31498C37.0905 5.74429 38.2847 5.42725 39.6046 5.42725C40.9873 5.42725 42.1816 5.74429 43.1872 6.31498C44.2557 6.88567 45.0728 7.70999 45.6385 8.72454C46.2042 9.80251 46.5184 11.0073 46.5184 12.4023C46.5184 13.7973 46.2042 15.0021 45.6385 16.0801C45.0728 17.158 44.2557 17.9189 43.1872 18.553C42.1187 19.1237 40.9245 19.4408 39.6046 19.4408C38.2218 19.3773 37.0276 19.0603 36.022 18.4896ZM41.6787 16.3337C42.3073 15.9532 42.7472 15.446 43.0615 14.7485C43.3758 14.0509 43.5643 13.29 43.5643 12.4023C43.5643 11.5146 43.3758 10.7537 43.0615 10.0561C42.7472 9.35864 42.3073 8.85136 41.6787 8.47091C41.0502 8.09045 40.3588 7.90022 39.6046 7.90022C38.8503 7.90022 38.0961 8.09045 37.5304 8.47091C36.9019 8.85136 36.4619 9.35864 36.1477 10.0561C35.8334 10.7537 35.6448 11.5146 35.6448 12.4023C35.6448 13.29 35.8334 14.0509 36.1477 14.7485C36.4619 15.446 36.9647 15.9532 37.5304 16.3337C38.159 16.7141 38.8503 16.9044 39.6046 16.9044C40.3588 16.9044 41.1131 16.7141 41.6787 16.3337Z" fill="#E60000"/>
            <path d="M51.2952 5.61749L51.7981 8.9782L51.2324 8.3441C51.6095 7.51978 52.1752 6.82227 52.8037 6.37841C53.4323 5.87113 54.3751 5.6809 55.5693 5.6809H56.1978V8.3441H54.9407C53.7465 8.3441 52.9294 8.72456 52.3637 9.48548C51.8609 10.2464 51.5467 11.2609 51.5467 12.4657V19.314H48.7183V5.61749H51.2952Z" fill="#E60000"/>
            <path d="M58.0834 1.74951H60.9118V5.55409H64.1801V8.02706H60.9118V15.1289C60.9118 15.6996 61.0375 16.0801 61.226 16.2703C61.4146 16.5239 61.7917 16.5874 62.2945 16.5874H64.4944V19.1237H61.7288C60.4718 19.1237 59.529 18.8067 58.9633 18.236C58.3976 17.6653 58.0834 16.7142 58.0834 15.446V1.74951Z" fill="#E60000"/>
            <path d="M69.2084 18.553C68.077 18.0458 67.2599 17.2848 66.6314 16.3337C66.0028 15.3826 65.6886 14.3046 65.6257 13.0364H68.5798C68.6427 14.1144 69.1455 15.0021 69.8997 15.6996C70.654 16.3971 71.7853 16.7142 73.0424 16.7142C74.1737 16.7142 75.0537 16.4605 75.7451 16.0166C76.4365 15.5094 76.8136 14.8753 76.8136 13.9875C76.8136 13.3534 76.625 12.8462 76.2479 12.4657C75.8708 12.0853 75.368 11.8316 74.7394 11.6414C74.1109 11.4512 73.1681 11.2609 71.9739 11.0073H71.8482C70.7168 10.8171 69.7112 10.5634 68.8941 10.183C68.077 9.80251 67.3856 9.29523 66.8199 8.59773C66.3171 7.90022 66.0657 6.94908 66.0657 5.80771C66.0657 4.72975 66.3171 3.7786 66.8828 2.95428C67.4485 2.12995 68.2027 1.49586 69.2084 0.988581C70.214 0.544714 71.3454 0.291077 72.6024 0.291077C73.9223 0.291077 75.1166 0.544715 76.1222 1.05199C77.1907 1.55927 78.0078 2.19336 78.5735 3.0811C79.202 3.96883 79.5163 4.98338 79.5163 6.06135H76.5622C76.4365 5.1102 75.9965 4.34929 75.3051 3.7786C74.6137 3.20792 73.6709 2.89087 72.6024 2.89087C71.5339 2.89087 70.654 3.14451 70.0255 3.58837C69.3969 4.03224 69.0827 4.72975 69.0827 5.55407C69.0827 6.18817 69.2712 6.63203 69.6483 7.01249C70.0254 7.32954 70.5283 7.64659 71.1568 7.83682C71.7853 8.02704 72.6653 8.21727 73.8595 8.47091C75.0537 8.66114 76.0593 8.97819 76.9393 9.29523C77.8192 9.61228 78.5106 10.183 79.0763 10.8805C79.642 11.578 79.8934 12.5291 79.8934 13.6705C79.8934 14.7485 79.5791 15.6996 79.0134 16.5873C78.4478 17.4751 77.6307 18.1092 76.5622 18.6164C75.4937 19.1237 74.3623 19.3139 73.0424 19.3139C71.5968 19.3774 70.3397 19.1237 69.2084 18.553Z" fill="#E60000"/>
            <path d="M85.0473 18.4896C83.9788 17.9189 83.1618 17.0946 82.5961 16.0801C82.0304 15.0021 81.7161 13.7973 81.7161 12.4023C81.7161 11.0073 81.9675 9.7391 82.5332 8.72454C83.0989 7.70999 83.8531 6.88567 84.8588 6.31498C85.8644 5.74429 86.9958 5.42725 88.3157 5.42725C89.6356 5.42725 90.767 5.68088 91.7726 6.18816C92.7783 6.69544 93.5325 7.45635 94.0982 8.47091C94.6639 9.48546 94.9781 10.6268 94.9781 11.895C94.9781 12.0853 94.9781 12.2121 94.9781 12.4023C94.9781 12.5925 94.9782 12.7828 94.9153 12.973H84.7331C84.7331 13.0364 84.7331 13.0364 84.7331 13.0364V13.0998C84.7959 13.8607 84.9216 14.5582 85.2359 15.1289C85.5502 15.6996 85.9901 16.1435 86.5558 16.4605C87.1215 16.7776 87.75 16.9678 88.5043 16.9678C89.3842 16.9678 90.1384 16.7776 90.7041 16.3337C91.3327 15.8898 91.7098 15.3191 91.8983 14.5582H94.7896C94.601 15.446 94.2867 16.2703 93.7211 16.9678C93.1554 17.6653 92.464 18.236 91.6469 18.6798C90.767 19.0603 89.8242 19.3139 88.7557 19.3139C87.3101 19.3774 86.053 19.0603 85.0473 18.4896ZM86.7444 8.15386C86.2416 8.4075 85.8016 8.78795 85.4873 9.29523C85.173 9.80251 84.9216 10.3098 84.8588 10.9439H92.0869C91.9612 9.92933 91.5841 9.105 90.9555 8.59772C90.327 8.02704 89.4471 7.7734 88.4414 7.7734C87.8129 7.70999 87.2472 7.83681 86.7444 8.15386Z" fill="#E60000"/>
            <path d="M100.069 18.4896C99.0007 17.9189 98.1837 17.0946 97.618 16.0801C97.0523 15.0021 96.738 13.7973 96.738 12.4023C96.738 11.0073 96.9894 9.7391 97.5551 8.72454C98.1208 7.70999 98.875 6.88567 99.8807 6.31498C100.886 5.74429 102.018 5.42725 103.338 5.42725C104.658 5.42725 105.789 5.68088 106.795 6.18816C107.8 6.69544 108.554 7.45635 109.12 8.47091C109.686 9.48546 110 10.6268 110 11.895C110 12.0853 110 12.2121 110 12.4023C110 12.5925 110 12.7828 109.937 12.973H99.755C99.755 13.0364 99.755 13.0364 99.755 13.0364V13.0998C99.8178 13.8607 99.9435 14.5582 100.258 15.1289C100.572 15.6996 101.012 16.1435 101.578 16.4605C102.143 16.7776 102.772 16.9678 103.526 16.9678C104.406 16.9678 105.16 16.7776 105.726 16.3337C106.355 15.8898 106.732 15.3191 106.92 14.5582H109.811C109.623 15.446 109.309 16.2703 108.743 16.9678C108.177 17.6653 107.486 18.236 106.669 18.6798C105.789 19.0603 104.846 19.3139 103.778 19.3139C102.332 19.3774 101.138 19.0603 100.069 18.4896ZM101.766 8.15386C101.263 8.4075 100.823 8.78795 100.509 9.29523C100.195 9.80251 99.9435 10.3098 99.8807 10.9439H107.109C106.983 9.92933 106.606 9.105 105.977 8.59772C105.349 8.02704 104.469 7.7734 103.463 7.7734C102.835 7.70999 102.269 7.83681 101.766 8.15386Z" fill="#E60000"/>
          </svg>
        </div>
        <nav>
          <Link to='/' element={<Acceuil/>} ref ={refAcceuil}>Acceuil</Link>
          <Link to='/user/18' element={<Profil/>} ref ={refProfil}>Profil</Link>
          <Link to='/reglage' element={<Reglage/>} ref ={refReglage}>Réglage</Link>
          <Link to='/communaute' element={<Communaute/>} ref ={refCommunaute}>Communauté</Link>
        </nav>
      </header>
      <main>
        <aside>
          <div id="icons">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
              <rect width="60" height="60" rx="6" fill="white"/>
              <path d="M32 22C34.2091 22 36 20.2091 36 18C36 15.7909 34.2091 14 32 14C29.7909 14 28 15.7909 28 18C28 20.2091 29.7909 22 32 22Z" fill="#FF0101"/>
              <path d="M50 38V34C45.52 34 41.68 32.08 38.8 28.64L36.12 25.44C35.36 24.52 34.24 24 33.06 24H30.96C29.78 24 28.66 24.52 27.9 25.44L25.22 28.64C22.32 32.08 18.48 34 14 34V38C19.54 38 24.38 35.66 28 31.5V36L20.24 39.1C18.9 39.64 18 40.96 18 42.42C18 44.4 19.6 46 21.58 46H26V45C26 42.24 28.24 40 31 40H37C37.56 40 38 40.44 38 41C38 41.56 37.56 42 37 42H31C29.34 42 28 43.34 28 45V46H42.42C44.4 46 46 44.4 46 42.42C46 40.96 45.1 39.64 43.76 39.1L36 36V31.5C39.62 35.66 44.46 38 50 38Z" fill="#FF0101"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
              <rect width="60" height="60" rx="6" fill="white"/>
              <path d="M29.3334 26.6666L25 31C25.4134 31.16 25.7467 31.36 26.0267 31.52C26.52 31.8266 26.8134 32 27.56 32C28.3067 32 28.6 31.8266 29.0934 31.52C29.7067 31.16 30.5334 30.6666 32.0134 30.6666C33.4934 30.6666 34.32 31.16 34.92 31.52C35.4134 31.8133 35.72 32 36.4534 32C37.1867 32 37.4934 31.8266 37.9867 31.52C38.1467 31.4266 38.3334 31.32 38.5334 31.2133L29.9734 22.6666C27.9067 20.6 26 19.9866 22.6667 20V23.3333C25.0934 23.32 26.52 23.8533 28 25.3333L29.3334 26.6666ZM45.3334 38H45.3067H45.3334ZM23.1334 36.6666C23.8667 36.6666 24.1734 36.8533 24.6667 37.1466C25.2667 37.5066 26.0934 38 27.5734 38C29.0534 38 29.88 37.5066 30.48 37.1466C30.9734 36.84 31.2667 36.6666 32.0134 36.6666C32.7467 36.6666 33.0534 36.8533 33.5467 37.1466C34.1467 37.5066 34.9734 38 36.4534 38C37.9334 38 38.76 37.5066 39.36 37.1466C39.8534 36.84 40.1467 36.6666 40.8934 36.6666C41.6267 36.6666 41.9334 36.8533 42.4267 37.1466C43.0267 37.5066 43.84 37.9866 45.3067 38V35.3333C44.5734 35.3333 44.2667 35.1466 43.7734 34.8533C43.1734 34.4933 42.3467 34 40.8667 34C39.3867 34 38.56 34.4933 37.96 34.8533C37.4667 35.16 37.16 35.3333 36.4267 35.3333C35.6934 35.3333 35.3867 35.1466 34.8934 34.8533C34.2934 34.4933 33.4667 34 31.9867 34C30.5067 34 29.68 34.4933 29.08 34.8533C28.5867 35.16 28.2934 35.3333 27.5467 35.3333C26.8134 35.3333 26.5067 35.1466 26.0134 34.8533C25.4134 34.4933 24.5867 34 23.1067 34C21.6267 34 20.8 34.4933 20.2 34.8533C19.7067 35.16 19.4134 35.3333 18.6667 35.3333V38C20.1467 38 20.9734 37.5066 21.6 37.1466C22.0934 36.84 22.4 36.6666 23.1334 36.6666ZM40.8934 40C39.4134 40 38.5867 40.4933 37.9867 40.8533C37.4934 41.16 37.1867 41.3333 36.4534 41.3333C35.72 41.3333 35.4134 41.1466 34.92 40.8533C34.32 40.4933 33.4934 40 32.0134 40C30.5334 40 29.7067 40.4933 29.0934 40.8533C28.6 41.16 28.3067 41.3333 27.56 41.3333C26.8134 41.3333 26.52 41.16 26.0267 40.8533C25.4267 40.4933 24.6 40 23.12 40C21.64 40 20.8134 40.4933 20.2 40.8533C19.7067 41.16 19.4134 41.3333 18.6667 41.3333V44C20.1467 44 20.9734 43.5066 21.5867 43.1466C22.08 42.84 22.3867 42.6666 23.12 42.6666C23.8534 42.6666 24.16 42.84 24.6534 43.1466C25.2534 43.5066 26.08 44 27.56 44C29.04 44 29.8667 43.5066 30.48 43.1466C30.9734 42.84 31.2667 42.6666 32.0134 42.6666C32.7467 42.6666 33.0534 42.8533 33.5467 43.1466C34.1467 43.5066 34.9734 44 36.4534 44C37.9334 44 38.7467 43.5066 39.36 43.1466C39.8534 42.84 40.1467 42.6666 40.8934 42.6666C41.6267 42.6666 41.9334 42.8533 42.4267 43.1466C43.0267 43.5066 43.8534 44 45.3334 44V41.3333C44.5867 41.3333 44.2934 41.16 43.8 40.8533C43.2 40.4933 42.3734 40 40.8934 40Z" fill="#FF0101"/>
              <path d="M38 26.6667C39.841 26.6667 41.3334 25.1743 41.3334 23.3333C41.3334 21.4924 39.841 20 38 20C36.1591 20 34.6667 21.4924 34.6667 23.3333C34.6667 25.1743 36.1591 26.6667 38 26.6667Z" fill="#FF0101"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
              <rect width="60" height="60" rx="6" fill="white"/>
              <path d="M37.1951 22.2439C38.9122 22.2439 40.3171 20.839 40.3171 19.122C40.3171 17.4049 38.9122 16 37.1951 16C35.478 16 34.0732 17.4049 34.0732 19.122C34.0732 20.839 35.478 22.2439 37.1951 22.2439ZM20.8049 32.3902C16.4341 32.3902 13 35.8244 13 40.1951C13 44.5659 16.4341 48 20.8049 48C25.1756 48 28.6098 44.5659 28.6098 40.1951C28.6098 35.8244 25.1756 32.3902 20.8049 32.3902ZM20.8049 45.6585C17.839 45.6585 15.3415 43.161 15.3415 40.1951C15.3415 37.2293 17.839 34.7317 20.8049 34.7317C23.7707 34.7317 26.2683 37.2293 26.2683 40.1951C26.2683 43.161 23.7707 45.6585 20.8049 45.6585ZM29.8585 30.0488L33.6049 26.3024L34.8537 27.5512C36.8829 29.5805 39.5366 30.8293 42.8146 30.8293V27.7073C40.4732 27.7073 38.6 26.7707 37.1951 25.3659L34.2293 22.4C33.4488 21.7756 32.6683 21.4634 31.7317 21.4634C30.7951 21.4634 30.0146 21.7756 29.5463 22.4L25.1756 26.7707C24.5512 27.3951 24.239 28.1756 24.239 28.9561C24.239 29.8927 24.5512 30.6732 25.1756 31.1415L30.1707 35.5122V43.3171H33.2927V33.639L29.8585 30.0488ZM42.6585 32.3902C38.2878 32.3902 34.8537 35.8244 34.8537 40.1951C34.8537 44.5659 38.2878 48 42.6585 48C47.0293 48 50.4634 44.5659 50.4634 40.1951C50.4634 35.8244 47.0293 32.3902 42.6585 32.3902ZM42.6585 45.6585C39.6927 45.6585 37.1951 43.161 37.1951 40.1951C37.1951 37.2293 39.6927 34.7317 42.6585 34.7317C45.6244 34.7317 48.1219 37.2293 48.1219 40.1951C48.1219 43.161 45.6244 45.6585 42.6585 45.6585Z" fill="#FF0101"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
              <rect width="60" height="60" rx="6" fill="white"/>
              <path d="M45.712 36.576L48 34.288L45.712 32L40 37.712L26.288 24L32 18.288L29.712 16L27.424 18.288L25.136 16L21.712 19.424L19.424 17.136L17.136 19.424L19.424 21.712L16 25.136L18.288 27.424L16 29.712L18.288 32L24 26.288L37.712 40L32 45.712L34.288 48L36.576 45.712L38.864 48L42.288 44.576L44.576 46.864L46.864 44.576L44.576 42.288L48 38.864L45.712 36.576Z" fill="#FF0101"/>
            </svg>
          </div>
          <div id='copyrigth'>
            <p>Copiryght, SportSee 2020</p>
          </div>
        </aside>
        <Outlet />
      </main>
    </LayoutStyled>
  )
}
