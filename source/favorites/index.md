---
title: 收藏
date: 2023-06-17 17:57:16
---

<style>

.wBox {
  width: 100%;
  /* background-color: red; */
  display:grid;
  grid-gap:1.5rem;
  margin-bottom:1.5rem;
  grid-template-columns: repeat(2,1fr);
}
.item{
    /* position: relative;
    margin: 0;
    padding: 1.5rem;
    padding-left: 6rem;
    overflow: auto;
    border-left: none;
    border: 0.1rem #e6e6e6 solid;
    background: none;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    border-radius: 0.4rem;
    transition: all 0.3s ease-in-out;
    line-height: 1.4; */
}
@media screen and (min-width: 768px) {
.wBox{
    grid-template-columns: repeat(3,1fr);
    
}
}

.fancy {
 background-color: transparent;
 border: 2px solid #000;
 border-radius: 0;
 box-sizing: border-box;
 color: #fff;
 cursor: pointer;
 display: inline-block;
 float: right;
 font-weight: 700;
 letter-spacing: 0.05em;
 margin: 0;
 outline: none;
 overflow: visible;
 padding: 1.25em 2em;
 position: relative;
 text-align: center;
 text-decoration: none;
 text-transform: none;
 transition: all 0.3s ease-in-out;
 user-select: none;
 font-size: 13px;
}

.fancy::before {
 content: " ";
 width: 1.5625rem;
 height: 2px;
 background: black;
 top: 50%;
 left: 1.5em;
 position: absolute;
 transform: translateY(-50%);
 transform-origin: center;
 transition: background 0.3s linear, width 0.3s linear;
}

.fancy .text {
 font-size: 1.125em;
 line-height: 1.33333em;
 padding-left: 2em;
 display: block;
 text-align: left;
 transition: all 0.3s ease-in-out;
 text-transform: uppercase;
 text-decoration: none;
 color: black;
}

.fancy .top-key {
 height: 2px;
 width: 1.5625rem;
 top: -2px;
 left: 0.625rem;
 position: absolute;
 background: #e8e8e8;
 transition: width 0.5s ease-out, left 0.3s ease-out;
}

.fancy .bottom-key-1 {
 height: 2px;
 width: 1.5625rem;
 right: 1.875rem;
 bottom: -2px;
 position: absolute;
 background: #e8e8e8;
 transition: width 0.5s ease-out, right 0.3s ease-out;
}

.fancy .bottom-key-2 {
 height: 2px;
 width: 0.625rem;
 right: 0.625rem;
 bottom: -2px;
 position: absolute;
 background: #e8e8e8;
 transition: width 0.5s ease-out, right 0.3s ease-out;
}

.fancy:hover {
 color: white;
 background: black;
}

.fancy:hover::before {
 width: 0.9375rem;
 background: white;
}

.fancy:hover .text {
 color: white;
 padding-left: 1.5em;
}

.fancy:hover .top-key {
 left: -2px;
 width: 0px;
}

.fancy:hover .bottom-key-1,
 .fancy:hover .bottom-key-2 {
 right: 0;
 width: 0;
}
</style>

### meige

<div class="wBox">
<a class="fancy item" href="#">
  <span class="top-key"></span>
  <span class="text">Buy Tickets</span>
  <span class="bottom-key-1"></span>
  <span class="bottom-key-2"></span>
</a>
<a class="fancy item" href="#">
  <span class="top-key"></span>
  <span class="text">Buy Tickets</span>
  <span class="bottom-key-1"></span>
  <span class="bottom-key-2"></span>
</a>
<a class="fancy item" href="#">
  <span class="top-key"></span>
  <span class="text">Buy Tickets</span>
  <span class="bottom-key-1"></span>
  <span class="bottom-key-2"></span>
</a>
<a class="fancy item" href="#">
  <span class="top-key"></span>
  <span class="text">Buy Tickets</span>
  <span class="bottom-key-1"></span>
  <span class="bottom-key-2"></span>
</a>
</div>