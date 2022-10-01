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
  left: 350px;
`;

const SeriesApi = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/tv/popular?api_key=b18edc39107ffeb7f7472ba9e760799c&language=pt-BR&page=1"
});

export default class Series extends Component {
  state = {
    series: [],
    buscadas: []
  };
  componentDidMount() {
    this.getSeries();
  }

  getSeries = async () => {
    const resposta = await SeriesApi.get();
    console.log(resposta);

    const allSeries = resposta.data.results.map((item) => {
      return {
        ...item,
        imagem: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
      };
    });
    this.setState({
      series: allSeries
    });
  };

  handleChange = (e) => {
    const SeriesBuscadas = this.state.series.filter((item) => {
      if (
        item.original_name.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return true;
      }
    });
    this.setState({
      buscadas: SeriesBuscadas
    });
  };
  render() {
    return (
      <>
        <Input onChange={this.handleChange} />
        {this.state.buscadas.map((item, index) => (
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
