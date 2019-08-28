
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleList from 'Components/ArticleList/ArticleList';
import AButton from 'Components/AButton/AButton';

import { setReferenceRoute } from 'State/Layout/referenceRoutes';
import { setReferenceTabTitle } from 'State/Layout/referenceTabTitle';

import {
  API_QUICK_START,
  API_SCREEN_SNIPPETS,
  API_AUDIO_SNIPPETS,
  API_INPUT_SNIPPETS,
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

import QuickStart from './QuickStart/QuickStart';
import ScreenSnippets from './ScreenSnippets/ScreenSnippets';
import AudioSnippets from './AudioSnippets/AudioSnippets';
import InputSnippets from './InputSnippets/InputSnippets';
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

const ArticleTitles = {};
ArticleTitles[API_QUICK_START] = 'Quick Start';
ArticleTitles[API_SCREEN_SNIPPETS] = 'Screen Snippets';
ArticleTitles[API_AUDIO_SNIPPETS] = 'Audio Snippets';
ArticleTitles[API_INPUT_SNIPPETS] = 'Input Snippets';
ArticleTitles[API_AUDIO] = 'bitmelo.Audio';
ArticleTitles[API_ENGINE] = 'bitmelo.Engine';
ArticleTitles[API_FONT] = 'bitmelo.Font';
ArticleTitles[API_FONT_DATA] = 'bitmelo.FontData';
ArticleTitles[API_FREQUENCIES] = 'bitmelo.Frequencies';
ArticleTitles[API_INPUT] = 'bitmelo.Input';
ArticleTitles[API_KEYS] = 'bitmelo.Keys';
ArticleTitles[API_MAP_DATA] = 'bitmelo.MapData';
ArticleTitles[API_NOTES] = 'bitmelo.Notes';
ArticleTitles[API_SCREEN] = 'bitmelo.Screen';
ArticleTitles[API_SOUND] = 'bitmelo.Sound';
ArticleTitles[API_TILE_DATA] = 'bitmelo.TileData';
ArticleTitles[API_TILE_MAP] = 'bitmelo.TileMap';

class ApiReference extends React.Component {
  componentDidMount() {
    this.setTitle();
  }

  componentDidUpdate( prevProps ) {
    const { route: prevRoute } = prevProps;
    const { route } = this.props;

    if ( route !== prevRoute ) {
      this.setTitle();
    }
  }

  setTitle() {
    const { route, _setReferenceTabTitle } = this.props;
    if ( route.current.length <= 1 ) {
      _setReferenceTabTitle( 'API Reference' );
    }
    else {
      const article = route.current[route.current.length - 1];
      if ( ArticleTitles[article] ) {
        _setReferenceTabTitle( ArticleTitles[article] );
      }
      else {
        _setReferenceTabTitle( 'API Reference' );
      }
    }
  }

  handleClassSelected( key ) {
    const { _setReferenceRoute, route, section } = this.props;
    const newRoute = [];
    newRoute.push( route.current[0] );
    newRoute.push( key );
    _setReferenceRoute( section, newRoute );
  }

  renderClassList() {
    const items = [
      {
        title: ArticleTitles[API_QUICK_START],
        key: API_QUICK_START,
      },
      {
        title: ArticleTitles[API_SCREEN_SNIPPETS],
        key: API_SCREEN_SNIPPETS,
      },
      {
        title: ArticleTitles[API_AUDIO_SNIPPETS],
        key: API_AUDIO_SNIPPETS,
      },
      {
        title: ArticleTitles[API_INPUT_SNIPPETS],
        key: API_INPUT_SNIPPETS,
      },
      {
        title: ArticleTitles[API_AUDIO],
        key: API_AUDIO,
      },
      {
        title: ArticleTitles[API_ENGINE],
        key: API_ENGINE,
      },
      {
        title: ArticleTitles[API_FONT],
        key: API_FONT,
      },
      {
        title: ArticleTitles[API_FONT_DATA],
        key: API_FONT_DATA,
      },
      {
        title: ArticleTitles[API_FREQUENCIES],
        key: API_FREQUENCIES,
      },
      {
        title: ArticleTitles[API_INPUT],
        key: API_INPUT,
      },
      {
        title: ArticleTitles[API_KEYS],
        key: API_KEYS,
      },
      {
        title: ArticleTitles[API_MAP_DATA],
        key: API_MAP_DATA,
      },
      {
        title: ArticleTitles[API_NOTES],
        key: API_NOTES,
      },
      {
        title: ArticleTitles[API_SCREEN],
        key: API_SCREEN,
      },
      {
        title: ArticleTitles[API_SOUND],
        key: API_SOUND,
      },
      {
        title: ArticleTitles[API_TILE_DATA],
        key: API_TILE_DATA,
      },
      {
        title: ArticleTitles[API_TILE_MAP],
        key: API_TILE_MAP,
      },
    ];

    return (
      <Fragment>
        <ArticleList
          items={ items }
          onItemSelected={ k => this.handleClassSelected( k ) }
        />
        <div className="full-source">
          <AButton href="https://github.com/byersdz/bitmelo">
            Click here to view the entire Bitmelo engine source on Github
          </AButton>
        </div>
      </Fragment>
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
        case API_QUICK_START: {
          content = <QuickStart />;
          break;
        }
        case API_SCREEN_SNIPPETS: {
          content = <ScreenSnippets />;
          break;
        }
        case API_AUDIO_SNIPPETS: {
          content = <AudioSnippets />;
          break;
        }
        case API_INPUT_SNIPPETS: {
          content = <InputSnippets />;
          break;
        }
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
  _setReferenceTabTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _setReferenceRoute: setReferenceRoute,
    _setReferenceTabTitle: setReferenceTabTitle,
  }, dispatch );
}

export default connect( null, mapDispatchToProps )( ApiReference );
