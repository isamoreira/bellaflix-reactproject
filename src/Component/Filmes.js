import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Input = styled.input`
  border: solid 3px #cb6ce6;
  width: 200px;
  height: 20px;
  position: relative;
  left: 680px;
`;

const Lista = styled.ul`
  width: 400px;
  height: 460px;
  list-style: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: solid 2px;
`;

const Titulo = styled.li`
  font-weight: 900;
  margin-bottom: 5px;
`;

const Img = styled.img`
  position: relative;
  bottom: 360px;
  left: 115px;
`;

const Index = styled.div`
  position: relative;
  left: 400px;
`;

const MoviesApi = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/popular?api_key=d595a5668e695d5eceb1a3afe07cbd87&language=en-US&page=1"
});

export default class Movies extends Component {
  state = {
    movies: [],
    buscados: []
  };
  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const resposta = await MoviesApi.get();
    console.log(resposta);

    const allMovies = resposta.data.results.map((item) => {
      return {
        ...item,
        imagem: `https://image.tmdb.org/t/p/w500${item.poster_path}`
      };
    });
    this.setState({
      movies: allMovies
    });
  };

  handleChange = (e) => {
    const Moviesbuscados = this.state.movies.filter((item) => {
      if (
        item.original_name.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return true;
      }
    });
    this.setState({
      buscados: Moviesbuscados
    });
  };
  render() {
    return (
      <>
        <Input onChange={this.handleChange} />
        {this.state.buscados.map((item, index) => (
          <Index key={index}>
            <Lista>
              <Titulo>{item.original_name}</Titulo>
              <li>{item.overview}</li>
            </Lista>
            <Img src={item.imagem} alt={item.name} />
          </Index>
        ))}
      </>
    );
  }
}
