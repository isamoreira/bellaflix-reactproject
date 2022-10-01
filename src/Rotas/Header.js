import React, { Component } from "react";
import Home from "../Component/Home.js";
import Series from "../Component/Series.js";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Logo from "./filmworks.png";
import styled from "styled-components";
import Filmes from "../Component/Filmes";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 30vw;
`;

const Button = styled.button`
  list-style-type: none;
  width: 70px;
  height: 30px;
  position: relative;
  background-color: #ff66c4;
  top: 50px;
  right: 180px;
  margin: 2px;
`;

const H2 = styled.h2`
  color: #cb6ce6;
`;

export default class Header extends Component {
  render() {
    return (
      <BrowserRouter>
        <Nav>
          <Img src={Logo} alt="" />
          <H2>O que iremos assistir?</H2>
          <Button>
            <Link to="/series"> Series</Link>
          </Button>
          <Button>
            <Link to="/filmes"> Filmes</Link>
          </Button>
        </Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/series" element={<Series />} />
          <Route path="/filmes" element={<Filmes />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
