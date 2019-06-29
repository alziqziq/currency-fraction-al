import React, { Component } from 'react';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import Header from './components/Header';
import ImageList from './components/ImageList';
import Images from './assets';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      resultImg: '',
      inputValue: '',
      images: {
        limaPuluh: Images.limaPuluh,
        seratus: Images.seratus,
        limaRatus: Images.limaRatus,
        seribu: Images.seribu,
        limaRibu: Images.limaRibu,
        sepuluhRibu: Images.sepuluhRibu,
        duaPuluhRibu: Images.duaPuluhRibu,
        limaPuluhRibu: Images.limaPuluhRibu,
        seratusRibu: Images.seratusRibu
      }
    };
  }

  handleEnter = e => {
    if (e.key === 'Enter') {
      this.handleChange();
    }
  };

  handleChange = () => {
    let resultImg = this.state.resultImg
    let result = {};
    let val = this.state.inputValue;
    const currents = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];
    val = this.validate(val);

    if (!isNaN(val)) {
      for (var i = 0; i < currents.length; i++) {
        let list = currents[i];
        let temp = this.getCurrent(val, list);
  
        if (temp.bool) {
          if (result[list]) {
            result[list].total++;
          } else {
            result[list] = {
              total: 1,
              value: list
            };
          }
  
          val = temp.value;
          i--;
        }
  
        if (list === 50 && temp.value !== 0) {
          result[list] = {
            total: 'left',
            value: temp.value
          };
        }
  
        if (temp.bool && temp.value === 0) {
          break;
        }
      }

      let a = this.letsPrint(sortBy(result).reverse());
      result = a.result;
      resultImg = a.resultImg;
    } else {
      result = 'Uppsss... sepertinya kamu salah format<br><br>Format yang tersedia :<br><br>* 18.215<br>* Rp17500<br>* Rp17.500,00<br>* Rp 120.325<br>* 005.000<br>* 001000';
      resultImg = '';
    }

    this.setState({
      result,
      resultImg
    });
  };

  getCurrent = (val, current) => {
    let retVal = {};

    if (val - current >= 0) {
      retVal = {
        bool: true,
        value: val - current
      };
    } else {
      retVal = {
        bool: false,
        value: val % current
      };
    }

    return retVal;
  };

  letsPrint = result => {
    const state = this.state;
    let temp = '';
    let tempImg = '';
    let img = '';

    map(result, list => {
      if (list.total !== 'left') {
        temp += `${list.total} x Rp${list.value}, `;
        
        if (parseInt(list.value, 10) === 100000) {
          img = state.images.seratusRibu;
        } else if (parseInt(list.value, 10) === 50000) {
          img = state.images.limaPuluhRibu;
        } else if (parseInt(list.value, 10) === 20000) {
          img = state.images.duaPuluhRibu;
        } else if (parseInt(list.value, 10) === 10000) {
          img = state.images.sepuluhRibu;
        } else if (parseInt(list.value, 10) === 5000) {
          img = state.images.limaRibu;
        } else if (parseInt(list.value, 10) === 1000) {
          img = state.images.seribu;
        } else if (parseInt(list.value, 10) === 500) {
          img = state.images.limaRatus;
        } else if (parseInt(list.value, 10) === 100) {
          img = state.images.seratus;
        } else if (parseInt(list.value, 10) === 50) {
          img = state.images.limaPuluh;
        } else {
          img = '';
        }

        tempImg += `<h1>${list.total} x</h1> <img src="${img}"/><br>`;
      } else {
        temp += `sisa Rp${list.value} (tidak ada pecahan yang tersedia), `;
      }
    });

    return {
      result: temp.slice(0, -2),
      resultImg: tempImg
    };
  };

  updateInputValue = e => {
    let str = e.target.value;

    this.setState({
      inputValue: str
    });
  };

  validate = val => {
    var regex = /^(Rp)?( )?(\d+)(\.\d+)?(,00)?$/;

    if (regex.test(val)) {
      const regex_2 = /\d+(,)?/g;
      const result = val.match(regex_2);

      if (result[result.length-2] && result[result.length-2].charAt(result[result.length-2].length-1) === ',') {
        result[result.length-2] = result[result.length-2].substring(0, result[result.length-2].length-1);
        delete result[result.length-1];
      }
      
      return result.join('');
    } else {
      return 'ISNAN';
    }
  };

  render() {
    const state = this.state;

    return (
      <div className="App">
        <Header />
        <div className="container">
          <ImageList images={state.images} />

          <div className="container">
            <div className="row">
              <div className="input">
                <div className="col-xs-8 col-sm-10">
                  <input value={this.state.inputValue} onChange={this.updateInputValue} onKeyPress={this.handleEnter} type="text"/>
                </div>
                <div className="col-xs-4 col-sm-2">
                  <button onClick={this.handleChange}>Cek</button>
                </div>
              </div>
            </div>
          </div>
          
          <div id="RESULT" className="result" dangerouslySetInnerHTML={{ __html: this.state.result }} />
          <div className="result" dangerouslySetInnerHTML={{ __html: this.state.resultImg }} />
        </div>
      </div>
    );
  }
}

export default App;
