
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleList from 'Components/ArticleList/ArticleList';

import { setReferenceRoute } from 'State/Layout/referenceRoutes';

import {
  API_AUDIO,
  API_ENGINE,
  API_FONT,
  API_FONT_DATA,
  API_FREQUENCIES,
  API_INPUT,
  API_KEYS,
  API_MAP_DATA,
  API_NOTES,
  API_SCREEN,
  API_SOUND,
  API_TILE_DATA,
  API_TILE_MAP,
} from 'Utils/articles';

import Audio from './Audio/Audio';
import Engine from './Engine/Engine';
import Font from './Font/Font';
import FontData from './FontData/FontData';
import FrequenciesAPI from './FrequenciesAPI/FrequenciesAPI';
import InputAPI from './InputAPI/InputAPI';
import KeysAPI from './KeysAPI/KeysAPI';
import MapDataAPI from './MapDataAPI/MapDataAPI';
import NotesAPI from './NotesAPI/NotesAPI';
import ScreenAPI from './ScreenAPI/ScreenAPI';
import SoundAPI from './SoundAPI/SoundAPI';
import TileDataAPI from './TileDataAPI/TileDataAPI';
import TileMapAPI from './TileMapAPI/TileMapAPI';

import './ApiReference.scss';

class ApiReference extends React.Component {
  handleClassSelected( key ) {
    const { _setReferenceRoute, route, section } = this.props;
    const newRoute = [];
    newRoute.push( route.current[0] );
    newRoute.push( key );
    console.log( newRoute );
    _setReferenceRoute( section, newRoute );
  }

  renderClassList() {
    const items = [
      {
        title: 'Quick Start',
        key: 'qs',
      },
      {
        title: 'bitmelo.Audio',
        key: API_AUDIO,
      },
      {
        title: 'bitmelo.Engine',
        key: API_ENGINE,
      },
      {
        title: 'bitmelo.Font',
        key: API_FONT,
      },
      {
        title: 'bitmelo.FontData',
        key: API_FONT_DATA,
      },
      {
        title: 'bitmelo.Frequencies',
        key: API_FREQUENCIES,
      },
      {
        title: 'bitmelo.Input',
        key: API_INPUT,
      },
      {
        title: 'bitmelo.Keys',
        key: API_KEYS,
      },
      {
        title: 'bitmelo.MapData',
        key: API_MAP_DATA,
      },
      {
        title: 'bitmelo.Notes',
        key: API_NOTES,
      },
      {
        title: 'bitmelo.Screen',
        key: API_SCREEN,
      },
      {
        title: 'bitmelo.Sound',
        key: API_SOUND,
      },
      {
        title: 'bitmelo.TileData',
        key: API_TILE_DATA,
      },
      {
        title: 'bitmelo.TileMap',
        key: API_TILE_MAP,
      },
    ];

    return (
      <ArticleList
        items={ items }
        onItemSelected={ k => this.handleClassSelected( k ) }
      />
    );
  }

  render() {
    const { route } = this.props;

    const currentRoute = route.current;

    let content = null;
    if ( currentRoute.length <= 1 ) {
      content = this.renderClassList();
    }
    else {
      switch ( currentRoute[currentRoute.length - 1] ) {
        case API_AUDIO: {
          content = <Audio />;
          break;
        }
        case API_ENGINE: {
          content = <Engine />;
          break;
        }
        case API_FONT: {
          content = <Font />;
          break;
        }
        case API_FONT_DATA: {
          content = <FontData />;
          break;
        }
        case API_FREQUENCIES: {
          content = <FrequenciesAPI />;
          break;
        }
        case API_INPUT: {
          content = <InputAPI />;
          break;
        }
        case API_KEYS: {
          content = <KeysAPI />;
          break;
        }
        case API_MAP_DATA: {
          content = <MapDataAPI />;
          break;
        }
        case API_NOTES: {
          content = <NotesAPI />;
          break;
        }
        case API_SCREEN: {
          content = <ScreenAPI />;
          break;
        }
        case API_SOUND: {
          content = <SoundAPI />;
          break;
        }
        case API_TILE_DATA: {
          content = <TileDataAPI />;
          break;
        }
        case API_TILE_MAP: {
          content = <TileMapAPI />;
          break;
        }
        default: {
          content = this.renderClassList();
          break;
        }
      }
    }

    return (
      <div className="api-reference">
        { content }
      </div>
    );
  }
}

ApiReference.propTypes = {
  route: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  _setReferenceRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceRoute: setReferenceRoute,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( ApiReference );
