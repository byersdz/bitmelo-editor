import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';

import Spinner from '../../components/Spinner/Spinner';
import createProjectScript from '../../utils/Convert/createProjectScript';
import { generatePngFromData } from '../../utils/download';

import './ImageGenerator.scss';

class ImageGenerator extends React.PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      showIframe: true,
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
    const { onChangeImage } = this.props;

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
      onChangeImage( pngData );
      this.setState( { showIframe: false } );
    }
  }

  render() {
    const { projectData, generatedImage } = this.props;
    const { showIframe } = this.state;

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

    const coverRender = generatedImage ? (
      <img className="generated-image" src={ generatedImage } alt="cover" />
    ) : null;

    const loadingRender = !generatedImage ? (
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
  generatedImage: PropTypes.string.isRequired,
  onChangeImage: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    projectData: state,
  };
}

export default connect( mapStateToProps )( ImageGenerator );
