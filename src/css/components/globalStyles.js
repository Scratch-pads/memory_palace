import { createGlobalStyle} from "styled-components"
const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  
  .panel-background {
    background: ${({ theme }) => theme.panelBackground};
  }
  
  .header-footer{
    background: ${({ theme }) => theme.headerAndFooter};
  }

  .clickablePassive{
    background: ${({theme}) => theme.clickablePassive};
  }
  .clickable:hover, .clickable:active{
    background: ${({ theme }) => theme.clickable};
  }
  .clickable-icon:hover, .clickable-icon:active{
    color: ${({ theme }) => theme.clickableIcon};
  }
  .clickable-logo:hover, .clickable-logo:active{
    //color
  }
  
  .menu-expanded-btns{
    color: ${({theme}) => theme.menuExpandedBtns};
  }
  .menu-expanded-btns:hover, .menu-expanded-btns:active{
    color: ${({theme}) => theme.text};
  }
  
  .form-control{
    color: ${({theme}) => theme.formControl};
  }
  .form-control:hover, .form-control:active{
    background: ${({ theme }) => theme.clickable};
  }
  
  .paused{
    background-color: ${({ theme }) => theme.paused}
  `

export {GlobalStyles};