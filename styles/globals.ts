import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    font-display: auto;
    @font-face {
        font-family: 'Alibaba-Black';
        src: url('static/font/AlibabaSans-Black.otf');
    }
    @font-face {
        font-family: 'Alibaba-Bold';
        src: url('static/font/AlibabaSans-Bold.otf');
    }
    @font-face {
        font-family: 'Alibaba-Light';
        src: url('static/font/AlibabaSans-Light.otf');
    }
    @font-face {
        font-family: 'Alibaba-Medium';
        src: url('static/font/AlibabaSans-Medium.otf');
    }
    @font-face {
        font-family: 'Alibaba-Regular';
        src: url('static/font/AlibabaSans-Regular.otf');
    }
    body, div, dl, dt, dd, ul, li, h1, h2, h3, h4, h5, h6, input, p, form, a, textarea{
        margin: 0;
        padding: 0;
        font-size: 12px; 
        font-family: 'Alibaba-Regular';
    }
    html, body{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    ol, ul, li {
        list-style: none;
    }
    
    a {
        text-decoration: none;
        display: block;
    }
    
    img{
        border: none;
        display: block;
    }
    
    /* 给需要清除浮动的标签的class加上clearfloat类 */
    .clearfloat {  
        zoom: 1;        /* 适配IE */
    }
    .clearfloat:after {
        display: block;
        clear: both;
        content: '';
        visibility: hidden;
        height: 0;  
    }

    .show {
        display: block;
    }

    .hide {
        display: none;
    }
`;
