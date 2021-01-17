import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';

import Spinner from '../../components/Spinner/Spinner';
import createProjectScript from '../../utils/Convert/createProjectScript';
import { generatePngFromData } from '../../utils/download';

import './ImageGenerator.scss';

class ImageGenerator extends React.PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      showIframe: true,
      coverPng: null,
    };

    this.handleMessage = this.handleMessage.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'message', this.handleMessage );
  }

  componentWillUnmount() {
    window.removeEventListener( 'message', this.handleMessage );
  }

  handleMessage( event ) {
    if ( !event.data.type || !event.data.payload ) {
      return;
    }

    if ( event.data.type === 'SET_COVER_IMAGE' ) {
      const payload = get( event, 'data.payload' );

      if ( !payload ) {
        return;
      }

      const width = get( payload, 'width' );
      const height = get( payload, 'height' );
      const screenData = get( payload, 'screenData' );
      const palette = get( payload, 'palette' );

      const settings = {
        width,
        height,
        scale: 1,
        data: screenData,
        palette,
        dataWidth: width,
        dataHeight: height,
      };

      const pngData = generatePngFromData( settings );
      this.setState( { showIframe: false, coverPng: pngData } );
    }
  }

  render() {
    const { projectData } = this.props;
    const { showIframe, coverPng } = this.state;

    let iFrameRender = null;
    if ( showIframe ) {
      const projectScript = createProjectScript( projectData, { isGenerator: true } );

      const iframeSrc = `
      <html>
      <head>
      </head>
      <body>
        <div id="main-container">
          <div id="bitmelo-container"></div>
        </div>
        <script>
        ${ projectScript }
          window.parent.postMessage(
            { type: 'SET_COVER_IMAGE',
              payload: {
                screenData: engine.screen._screenData,
                width: engine.screen.width,
                height: engine.screen.height,
                palette: engine.screen._palette,
              }
            }, '*'
          );
        </script>
      </body>
      </html>
      `;

      iFrameRender = (
        <iframe
          className="generator-iframe"
          srcDoc={ iframeSrc }
          title="play"
          sandbox="allow-scripts"
        />
      );
    }

    const coverRender = coverPng ? (
      <img className="generated-image" src={ coverPng } alt="cover" />
    ) : null;

    const loadingRender = !coverPng ? (
      <Spinner />
    ) : null;
    return (
      <div className="image-generator">
        <div className="label">
          Cover Image
        </div>
        { loadingRender }
        { coverRender }
        { iFrameRender }
      </div>
    );
  }
}

ImageGenerator.propTypes = {
  projectData: PropTypes.object.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectData: state,
  };
}

export default connect( mapStateToProps )( ImageGenerator );
