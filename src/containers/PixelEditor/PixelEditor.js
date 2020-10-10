
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

import {
  PENCIL_TOOL,
  ERASER_TOOL,
  BUCKET_TOOL,
  MOVE_TOOL,
  RECT_SELECT_TOOL,
  LINE_TOOL,
} from '../../state/PixelTools/selectedTool';
import { TILE_DRAW_TOOL, TILE_ERASE_TOOL } from '../../state/PixelTools/selectedTileTool';

import { bucketToolStart } from './Tools/bucketTool';
import { pencilToolStart, pencilToolMove } from './Tools/pencilTool';
import { eraserToolStart, eraserToolMove } from './Tools/eraserTool';
import { tileDrawToolStart, tileDrawToolMove } from './Tools/tileDrawTool';
import { tileEraserToolStart, tileEraserToolMove } from './Tools/tileEraserTool';
import { moveToolStart, moveToolMove } from './Tools/moveTool';

import { combineGrids } from '../../utils/gridHelpers';
import { DESELECT_SELECTION, eventMatchesHotkey } from '../../utils/hotkeys';

import MainCanvas from './MainCanvas/MainCanvas';
import OverlayCanvas from './OverlayCanvas/OverlayCanvas';

import backgroundImage from './background.png';

import './PixelEditor.scss';

const scales = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  32,
  40,
  48,
  56,
  64,
  80,
  96,
  112,
  128,
  160,
  192,
  224,
  256,
];

class PixelEditor extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      scale: 4,
      isEditing: false,
      editingTool: '',
      editingData: {},
      isPanning: false,
      pointerStartX: 0,
      pointerStartY: 0,
      pointerCurrentX: 0,
      pointerCurrentY: 0,
      offsetX: 0,
      offsetY: 0,
      scrollAmount: 0,
      spaceIsDown: false,
      altIsDown: false,
    };

    this.containerRef = React.createRef();
    this.updateDimensions = this.updateDimensions.bind( this );

    this.handlePointerMove = this.handlePointerMove.bind( this );
    this.handlePointerUp = this.handlePointerUp.bind( this );
    this.handlePointerExit = this.handlePointerExit.bind( this );
    this.handleKeyDown = this.handleKeyDown.bind( this );
    this.handleKeyUp = this.handleKeyUp.bind( this );
    this.handleWindowFocus = this.handleWindowFocus.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'resize', this.updateDimensions );
    document.addEventListener( 'pointermove', this.handlePointerMove );
    document.addEventListener( 'pointerup', this.handlePointerUp );
    document.addEventListener( 'pointercancel', this.handlePointerExit );
    window.addEventListener( 'keydown', this.handleKeyDown );
    window.addEventListener( 'keyup', this.handleKeyUp );
    window.addEventListener( 'focus', this.handleWindowFocus );

    this.updateDimensions();
    this.setInitialPositioning();
  }

  componentDidUpdate( prevProps ) {
    const {
      navigationPanelIsOpen,
      referencePanelIsOpen,
      dataWidth,
      dataHeight,
    } = this.props;
    const {
      navigationPanelIsOpen: prevNavIsOpen,
      referencePanelIsOpen: prevRefIsOpen,
      dataWidth: lastDataWidth,
      dataHeight: lastDataHeight,
    } = prevProps;

    if (
      navigationPanelIsOpen !== prevNavIsOpen
      || referencePanelIsOpen !== prevRefIsOpen
    ) {
      this.updateDimensions();
    }

    if ( dataWidth !== lastDataWidth || dataHeight !== lastDataHeight ) {
      this.setInitialPositioning();
    }
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.updateDimensions );
    document.removeEventListener( 'pointermove', this.handlePointerMove );
    document.removeEventListener( 'pointerup', this.handlePointerUp );
    document.removeEventListener( 'pointercancel', this.handlePointerExit );
    window.removeEventListener( 'keydown', this.handleKeyDown );
    window.removeEventListener( 'keyup', this.handleKeyUp );
    window.removeEventListener( 'focus', this.handleWindowFocus );
  }

  updateDimensions() {
    const clientRect = this.containerRef.current.getBoundingClientRect();
    this.setState( {
      width: this.containerRef.current.offsetWidth,
      height: this.containerRef.current.offsetHeight,
      left: clientRect.left,
      top: clientRect.top,
    } );
  }

  handleWindowFocus() {
    this.setState( { spaceIsDown: false } );
    this.setState( { altIsDown: false } );
  }

  handleKeyDown( event ) {
    const { onDeselect, anyModalIsOpen } = this.props;

    if ( eventMatchesHotkey( event, DESELECT_SELECTION ) ) {
      // still prevent the default as that will create a bookmark
      event.preventDefault();

      if ( !anyModalIsOpen ) {
        onDeselect();
      }
    }

    if ( anyModalIsOpen ) {
      return;
    }

    if ( event.which === 32 ) { // space
      this.setState( { spaceIsDown: true } );
      event.preventDefault();
    }
    else if ( event.which === 18 ) { // alt
      this.setState( { altIsDown: true } );
      event.preventDefault();
    }
  }

  handleKeyUp( event ) {
    if ( event.which === 32 ) {
      this.setState( { spaceIsDown: false } );
      // event.preventDefault();
    }
    else if ( event.which === 18 ) {
      this.setState( { altIsDown: false } );
      // event.preventDefault();
    }
  }

  handlePointerDown( event ) {
    event.preventDefault();
    const {
      isPanning,
      isEditing,
      offsetX,
      offsetY,
      scale,
      spaceIsDown,
      altIsDown,
    } = this.state;

    const {
      selectedTool,
      selectedTileTool,
      selectedPaletteIndex,
      altPaletteIndex,
      data,
      dataWidth,
      dataHeight,
      isTileEditor,
      tileSize,
      selectionData,
      selectionWidth,
      selectionHeight,
      onEyeDropper,
      pixelToolSettings,
      onDataChange,
      editorSelection,
      onCreateEditorSelection,
      onEditorSelectionChange,
    } = this.props;

    if ( isPanning || isEditing ) {
      return;
    }

    // left or right click
    if ( event.button === 0 || event.button === 2 ) {
      // if space is held down always start a pan
      if ( spaceIsDown ) {
        this.startPan( event.nativeEvent.offsetX, event.nativeEvent.offsetY );
        return;
      }

      let editingTool = selectedTool;
      let paletteIndex = selectedPaletteIndex;

      if ( isTileEditor ) {
        editingTool = selectedTileTool;
      }

      // use alternate tools for right click
      if ( event.button === 2 ) {
        if ( !isTileEditor ) {
          if ( selectedTool === PENCIL_TOOL || selectedTool === BUCKET_TOOL ) {
            paletteIndex = altPaletteIndex;
          }
        }
      }

      let actualScale = scales[scale];
      if ( isTileEditor ) {
        actualScale *= tileSize;
      }

      const pixelX = PixelEditor.pixelPositionForCanvasPosition(
        event.nativeEvent.offsetX,
        offsetX,
        actualScale,
      );

      let pixelY = PixelEditor.pixelPositionForCanvasPosition(
        event.nativeEvent.offsetY,
        offsetY,
        actualScale,
      );

      pixelY = dataHeight - pixelY - 1;

      // use eyedropper if alt is held down
      if ( altIsDown && onEyeDropper ) {
        if ( pixelX >= 0 && pixelX < dataWidth && pixelY >= 0 && pixelY < dataHeight ) {
          const eyeDroppedId = data[pixelY * dataWidth + pixelX];
          if ( event.button === 0 ) {
            onEyeDropper( { id: eyeDroppedId, alt: false } );
          }
          else {
            onEyeDropper( { id: eyeDroppedId, alt: true } );
          }
        }
        return;
      }

      // Create Editing Data
      let editingData = {};
      editingData.startX = pixelX;
      editingData.startY = pixelY;

      editingData.lastX = pixelX;
      editingData.lastY = pixelY;

      editingData.currentX = pixelX;
      editingData.currentY = pixelY;

      editingData.editorSelection = cloneDeep( editorSelection );

      editingData.buffer = new Array( dataWidth * dataHeight );
      editingData.buffer.fill( -1 );

      editingData.originalData = cloneDeep( data );
      editingData.dataWidth = dataWidth;
      editingData.dataHeight = dataHeight;

      if ( editingData.editorSelection && editingData.editorSelection.isActive ) {
        editingData.originalEditorSelection = cloneDeep( editorSelection );
      }

      if ( editingTool === TILE_ERASE_TOOL ) {
        editingData.paletteId = 0;
      }
      else {
        editingData.paletteId = paletteIndex;
      }

      // apply immediately completing tools
      switch ( editingTool ) {
        case BUCKET_TOOL: {
          bucketToolStart( editingData, onEditorSelectionChange, onDataChange );
          return;
        }
        default: break;
      }

      // start continuosly editing tools
      switch ( editingTool ) {
        case PENCIL_TOOL: {
          editingData = pencilToolStart( editingData, pixelToolSettings );
          break;
        }
        case ERASER_TOOL: {
          editingData = eraserToolStart( editingData, pixelToolSettings );
          break;
        }
        case TILE_DRAW_TOOL: {
          const tileDrawOptions = {
            selectionData,
            selectionWidth,
            selectionHeight,
            button: event.button,
          };

          editingData = tileDrawToolStart( editingData, tileDrawOptions );
          break;
        }
        case TILE_ERASE_TOOL: {
          editingData = tileEraserToolStart( editingData );
          break;
        }
        case MOVE_TOOL: {
          editingData = moveToolStart( editingData, onCreateEditorSelection );
          break;
        }
        case LINE_TOOL: {
          console.log( editingData );
          break;
        }
        default: break;
      }

      this.setState( {
        isEditing: true,
        editingTool,
        editingData,
      } );
    }
    else if ( event.button === 1 ) {
      // middle click
      this.startPan( event.nativeEvent.offsetX, event.nativeEvent.offsetY );
    }
  }

  startPan( startX, startY ) {
    this.setState( {
      isPanning: true,
      pointerStartX: startX,
      pointerStartY: startY,
    } );
  }

  handlePointerUp( event ) {
    event.preventDefault();
    const {
      left,
      top,
      isPanning,
      offsetX,
      offsetY,
      pointerStartX,
      pointerStartY,
      isEditing,
    } = this.state;

    const { clientX, clientY } = event;

    if ( isPanning ) {
      const offsetPosition = this.getOffsetFromPanning(
        offsetX,
        offsetY,
        pointerStartX,
        pointerStartY,
        clientX - left,
        clientY - top,
      );
      this.setState( {
        offsetX: offsetPosition.x,
        offsetY: offsetPosition.y,
        isPanning: false,
      } );
    }

    if ( event.button === 0 || event.button === 2 ) {
      if ( isEditing ) {
        this.commitEditingChanges();
        this.setState( { isEditing: false } );
      }
    }
  }

  handlePointerMove( event ) {
    event.preventDefault();
    const {
      left,
      top,
      offsetX,
      offsetY,
      scale,
      isEditing,
      editingTool,
      editingData,
    } = this.state;

    const {
      dataHeight,
      isTileEditor,
      tileSize,
      onCursorChange,
    } = this.props;

    const { clientX, clientY } = event;
    this.setState( {
      pointerCurrentX: clientX - left,
      pointerCurrentY: clientY - top,
    } );

    let actualScale = scales[scale];
    if ( isTileEditor ) {
      actualScale *= tileSize;
    }

    const pixelX = PixelEditor.pixelPositionForCanvasPosition(
      clientX - left,
      offsetX,
      actualScale,
    );

    let pixelY = PixelEditor.pixelPositionForCanvasPosition(
      clientY - top,
      offsetY,
      actualScale,
    );

    pixelY = dataHeight - pixelY - 1;

    if ( onCursorChange ) {
      onCursorChange( {
        x: pixelX,
        y: pixelY,
      } );
    }

    if ( isEditing ) {
      editingData.lastX = editingData.currentX;
      editingData.lastY = editingData.currentY;
      editingData.currentX = pixelX;
      editingData.currentY = pixelY;

      let newEditingData = editingData;

      switch ( editingTool ) {
        case PENCIL_TOOL: {
          newEditingData = pencilToolMove( editingData );
          break;
        }
        case ERASER_TOOL: {
          newEditingData = eraserToolMove( editingData );
          break;
        }
        case TILE_DRAW_TOOL: {
          newEditingData = tileDrawToolMove( editingData );
          break;
        }
        case TILE_ERASE_TOOL: {
          newEditingData = tileEraserToolMove( editingData );
          break;
        }
        case MOVE_TOOL: {
          newEditingData = moveToolMove( editingData );
          break;
        }

        default: break;
      }

      this.setState( { editingData: newEditingData } );
    }
  }

  handlePointerExit( event ) {
    event.preventDefault();
    const {
      isPanning,
      offsetX,
      offsetY,
      pointerStartX,
      pointerStartY,
      pointerCurrentX,
      pointerCurrentY,
      isEditing,
    } = this.state;

    if ( isEditing ) {
      this.commitEditingChanges();
      this.setState( { isEditing: false } );
    }
    else if ( isPanning ) {
      const offsetPosition = this.getOffsetFromPanning(
        offsetX,
        offsetY,
        pointerStartX,
        pointerStartY,
        pointerCurrentX,
        pointerCurrentY,
      );
      this.setState( {
        offsetX: offsetPosition.x,
        offsetY: offsetPosition.y,
        isPanning: false,
      } );
    }
  }

  handleWheel( event ) {
    const {
      width,
      height,
      isPanning,
      isEditing,
      scrollAmount,
      pointerCurrentX,
      pointerCurrentY,
      offsetX,
      offsetY,
      scale,
    } = this.state;

    const {
      dataWidth,
      dataHeight,
      isTileEditor,
    } = this.props;

    if ( isPanning || isEditing ) {
      return;
    }

    const actualScale = scales[scale];
    const pixelX = ( pointerCurrentX - offsetX ) / actualScale;
    const pixelY = ( pointerCurrentY - offsetY ) / actualScale;

    let newAmount = scrollAmount + event.deltaY;

    let cutoff = 99;
    if ( event.deltaMode === 1 ) {
      cutoff = 2;
    }
    else if ( event.deltaMode === 2 ) {
      cutoff = 1;
    }

    let newScale = scale;
    if ( newAmount < -cutoff ) {
      if ( newScale < scales.length - 1 ) {
        newScale += 1;
        if ( isTileEditor && newScale > 15 ) { // limit the actual scale to 16 when editing tiles
          newScale = 15;
        }
      }
      newAmount = 0;
    }
    else if ( newAmount > cutoff ) {
      if ( newScale > 0 ) {
        newScale -= 1;
      }
      newAmount = 0;
    }

    if ( newScale !== scale ) {
      const newActualScale = scales[newScale];

      const targetX = pixelX * newActualScale;
      const targetY = pixelY * newActualScale;

      let newOffsetX = pointerCurrentX - targetX;
      let newOffsetY = pointerCurrentY - targetY;

      newOffsetX = this.getLimitedOffset( width, dataWidth, newScale, newOffsetX );
      newOffsetY = this.getLimitedOffset( height, dataHeight, newScale, newOffsetY );

      this.setState( {
        offsetX: newOffsetX,
        offsetY: newOffsetY,
      } );
    }

    this.setState( { scrollAmount: newAmount, scale: newScale } );
  }

  setInitialPositioning() {
    const {
      dataWidth,
      dataHeight,
      isTileEditor,
      tileSize,
    } = this.props;

    const width = this.containerRef.current.offsetWidth;
    const height = this.containerRef.current.offsetHeight;

    let xScale = width * 0.8 / dataWidth;
    let yScale = height * 0.8 / dataHeight;

    if ( isTileEditor ) {
      xScale /= tileSize;
      yScale /= tileSize;
    }

    let targetScale = xScale;
    if ( yScale < targetScale ) {
      targetScale = yScale;
    }

    let dataIsTooLargeForScreen = false;
    if ( targetScale < 1 ) {
      dataIsTooLargeForScreen = true;
    }
    if ( isTileEditor && targetScale < 2 ) {
      dataIsTooLargeForScreen = true;
    }

    let maxTarget = 24;
    if ( isTileEditor ) {
      maxTarget = 4;
    }

    if ( targetScale > maxTarget ) {
      targetScale = maxTarget;
    }

    let newScale = 0;
    for ( let i = 0; i < scales.length; i += 1 ) {
      if ( targetScale < scales[i] ) {
        break;
      }
      newScale = i;
    }

    if ( isTileEditor && newScale === 0 ) {
      newScale = 1; // the minimum initial scale for the tile editor should be 2
    }

    let actualScale = scales[newScale];
    if ( isTileEditor ) {
      actualScale *= tileSize;
    }

    let offsetX = 0;
    let offsetY = 0;
    if ( dataIsTooLargeForScreen ) {
      // position on the bottom left
      const margin = 32;
      offsetX = margin;
      offsetY = height - dataHeight * actualScale - margin;

      if ( dataWidth * actualScale < width - margin ) {
        offsetX = ( width - ( dataWidth * actualScale ) ) * 0.5;
      }

      if ( dataHeight * actualScale < height - margin ) {
        offsetY = ( height - ( dataHeight * actualScale ) ) * 0.5;
      }
    }
    else {
      offsetX = ( width - ( dataWidth * actualScale ) ) * 0.5;
      offsetY = ( height - ( dataHeight * actualScale ) ) * 0.5;
    }

    this.setState( { scale: newScale, offsetX, offsetY } );
  }

  getOffsetFromPanning( offsetX, offsetY, startX, startY, currentX, currentY ) {
    const { width, height, scale } = this.state;
    const { dataWidth, dataHeight } = this.props;

    const xDiff = currentX - startX;
    const yDiff = currentY - startY;

    let newX = offsetX + xDiff;
    let newY = offsetY + yDiff;

    newX = this.getLimitedOffset( width, dataWidth, scale, newX );
    newY = this.getLimitedOffset( height, dataHeight, scale, newY );
    return {
      x: newX,
      y: newY,
    };
  }

  getLimitedOffset( viewWidth, dataWidth, scale, offset ) {
    const { isTileEditor, tileSize } = this.props;

    let actualScale = scales[scale];
    if ( isTileEditor ) {
      actualScale *= tileSize;
    }

    const scaledDataWidth = dataWidth * actualScale;
    let newOffset = offset;
    if ( scaledDataWidth * 2 < viewWidth ) {
      // limit to the edges of the data
      if ( offset < 0 ) {
        newOffset = 0;
      }
      else if ( offset > viewWidth - scaledDataWidth ) {
        newOffset = viewWidth - scaledDataWidth;
      }
    }
    else {
      const halfView = viewWidth * 0.5;
      if ( scaledDataWidth + offset < halfView ) {
        newOffset = halfView - scaledDataWidth;
      }
      else if ( offset > halfView ) {
        newOffset = halfView;
      }
    }
    return newOffset;
  }

  commitEditingChanges() {
    const { editingData, editingTool } = this.state;
    const {
      onDataChange,
      data,
      editorSelection,
      onEditorSelectionChange,
      onCreateEditorSelection,
      onRepositionEditorSelection,
    } = this.props;

    if (
      editingTool === PENCIL_TOOL
      || editingTool === ERASER_TOOL
      || editingTool === TILE_DRAW_TOOL
      || editingTool === TILE_ERASE_TOOL
    ) {
      if ( editingData.editorSelection && editingData.editorSelection.isActive ) {
        // use the editor selection
        onEditorSelectionChange( cloneDeep( editingData.editorSelection ) );
      }
      else {
        const newData = new Array( data.length );
        const { buffer } = editingData;
        for ( let i = 0; i < newData.length; i += 1 ) {
          if ( buffer[i] >= 0 ) {
            newData[i] = buffer[i];
          }
          else {
            newData[i] = data[i];
          }
        }
        onDataChange( newData );
      }
    }
    else if ( editingTool === MOVE_TOOL ) {
      if (
        editingData.startSelectionXOffset === editingData.currentSelectionXOffset
        && editingData.startSelectionYOffset === editingData.currentSelectionYOffset
      ) {
        // selection did not move
        return;
      }
      const newEditorSelection = cloneDeep( editorSelection );
      newEditorSelection.offsetX = editingData.currentSelectionXOffset;
      newEditorSelection.offsetY = editingData.currentSelectionYOffset;
      onEditorSelectionChange( newEditorSelection );
    }
    else if ( editingTool === RECT_SELECT_TOOL ) {
      const newEditorSelection = this.createEditorSelection(
        editingData.startX,
        editingData.startY,
        editingData.lastX,
        editingData.lastY,
      );

      if ( newEditorSelection ) {
        if ( editorSelection && editorSelection.isActive ) {
          onRepositionEditorSelection( newEditorSelection );
        }
        else {
          onCreateEditorSelection( newEditorSelection );
        }
      }
    }
  }

  createEditorSelection( startX, startY, lastX, lastY ) {
    const { dataWidth, dataHeight, data } = this.props;

    let minX = startX < lastX ? startX : lastX;
    let minY = startY < lastY ? startY : lastY;

    let maxX = lastX > startX ? lastX : startX;
    let maxY = lastY > startY ? lastY : startY;

    if (
      minX >= dataWidth
      || minY >= dataHeight
      || maxX < 0
      || maxY < 0
    ) {
      return null;
    }

    if ( minX < 0 ) {
      minX = 0;
    }

    if ( minY < 0 ) {
      minY = 0;
    }

    if ( maxX >= dataWidth ) {
      maxX = dataWidth - 1;
    }

    if ( maxY >= dataHeight ) {
      maxY = dataHeight - 1;
    }

    const width = maxX - minX + 1;
    const height = maxY - minY + 1;

    const selectionData = new Array( width * height );
    for ( let y = 0; y < height; y += 1 ) {
      for ( let x = 0; x < width; x += 1 ) {
        const sourceIndex = ( y + minY ) * dataWidth + x + minX;
        selectionData[y * width + x] = data[sourceIndex];
      }
    }

    const editorSelection = {
      offsetX: minX,
      offsetY: minY,
      width,
      height,
      data: selectionData,
      isActive: true,
    };

    return editorSelection;
  }

  render() {
    const {
      width,
      height,
      scale,
      offsetX,
      offsetY,
      isPanning,
      pointerStartX,
      pointerStartY,
      pointerCurrentX,
      pointerCurrentY,
      editingTool,
      editingData,
      isEditing,
    } = this.state;

    const {
      children,
      data,
      dataWidth,
      dataHeight,
      palette,
      isTileEditor,
      tileSize,
      tilesets,
      selectedTileTool,
      selectionWidth,
      selectionHeight,
      selectedTool,
      pixelToolSettings,
      editorSelection,
    } = this.props;

    let pannedXOffset = offsetX;
    let pannedYOffset = offsetY;

    if ( isPanning ) {
      const newOffset = this.getOffsetFromPanning(
        offsetX,
        offsetY,
        pointerStartX,
        pointerStartY,
        pointerCurrentX,
        pointerCurrentY,
      );
      pannedXOffset = newOffset.x;
      pannedYOffset = newOffset.y;
    }

    let mainData = [...data];

    let editorSelectionCopy = cloneDeep( editorSelection );

    // draw the selection data if active
    if ( editorSelection && editorSelection.isActive ) {
      const destination = {
        data: mainData,
        width: dataWidth,
        height: dataHeight,
      };

      if ( isEditing ) {
        if ( editingTool === MOVE_TOOL ) {
          editorSelectionCopy.offsetX = editingData.currentSelectionXOffset;
          editorSelectionCopy.offsetY = editingData.currentSelectionYOffset;
        }
        else if (
          editingTool === PENCIL_TOOL
          || editingTool === ERASER_TOOL
        ) {
          // use the temporary editingData editorSelection instead
          if ( editingData.editorSelection && editingData.editorSelection.isActive ) {
            editorSelectionCopy = cloneDeep( editingData.editorSelection );
          }
        }
      }

      mainData = combineGrids( editorSelectionCopy, destination );
    }

    if ( isEditing ) {
      if (
        editingTool === PENCIL_TOOL
        || editingTool === ERASER_TOOL
        || editingTool === TILE_DRAW_TOOL
        || editingTool === TILE_ERASE_TOOL
      ) {
        for ( let i = 0; i < mainData.length; i += 1 ) {
          const editingDataPoint = editingData.buffer[i];
          if ( editingDataPoint >= 0 ) {
            mainData[i] = editingDataPoint;
          }
        }
      }
      else if ( editingTool === RECT_SELECT_TOOL ) {
        editorSelectionCopy = this.createEditorSelection(
          editingData.startX,
          editingData.startY,
          editingData.lastX,
          editingData.lastY,
        );
      }
    }

    const actualScale = scales[scale];

    let indicatorScale = actualScale;
    if ( isTileEditor ) {
      indicatorScale *= tileSize;
    }

    const indicatorX = PixelEditor.pixelPositionForCanvasPosition( pointerCurrentX, offsetX, indicatorScale );
    let indicatorY = PixelEditor.pixelPositionForCanvasPosition( pointerCurrentY, offsetY, indicatorScale );
    indicatorY = dataHeight - indicatorY - 1;

    let showIndicator = true;

    if ( isPanning ) {
      showIndicator = false;
    }

    let indicatorWidth = 1;
    let indicatorHeight = 1;

    if ( isTileEditor ) {
      if ( selectedTileTool === TILE_DRAW_TOOL ) {
        indicatorWidth = selectionWidth;
        indicatorHeight = selectionHeight;
      }
    }
    else {
      if ( selectedTool === PENCIL_TOOL ) {
        indicatorWidth = pixelToolSettings.pencilSize;
        indicatorHeight = pixelToolSettings.pencilSize;
      }
      if ( selectedTool === ERASER_TOOL ) {
        indicatorWidth = pixelToolSettings.eraserSize;
        indicatorHeight = pixelToolSettings.eraserSize;
      }
      if ( selectedTool === MOVE_TOOL ) {
        showIndicator = false;
      }
      if ( selectedTool === RECT_SELECT_TOOL ) {
        showIndicator = false;
      }
    }

    const style = {
      backgroundImage: `url(${ backgroundImage })`,
    };

    return (
      <div
        className="pixel-editor"
        ref={ this.containerRef }
        style={ style }
      >
        <OverlayCanvas
          width={ width }
          height={ height }
          onPointerDown={ e => this.handlePointerDown( e ) }
          onWheel={ e => this.handleWheel( e ) }
          offsetX={ Math.floor( pannedXOffset ) }
          offsetY={ Math.floor( pannedYOffset ) }
          showIndicator={ showIndicator }
          indicatorX={ indicatorX }
          indicatorY={ indicatorY }
          indicatorWidth={ indicatorWidth }
          indicatorHeight={ indicatorHeight }
          scale={ actualScale }
          dataWidth={ dataWidth }
          dataHeight={ dataHeight }
          isTileEditor={ isTileEditor }
          tileSize={ tileSize }
          editorSelection={ editorSelectionCopy }
        />
        <MainCanvas
          width={ width }
          height={ height }
          scale={ actualScale }
          data={ mainData }
          dataWidth={ dataWidth }
          dataHeight={ dataHeight }
          offsetX={ Math.floor( pannedXOffset ) }
          offsetY={ Math.floor( pannedYOffset ) }
          palette={ palette }
          isTileEditor={ isTileEditor }
          tileSize={ tileSize }
          tilesets={ tilesets }
        />
        { children }
      </div>
    );
  }
}

PixelEditor.pixelPositionForCanvasPosition = ( position, offset, scale ) => {
  return Math.floor( ( position - offset ) / scale );
};

PixelEditor.propTypes = {
  children: PropTypes.node,
  data: PropTypes.arrayOf( PropTypes.number ).isRequired,
  dataWidth: PropTypes.number.isRequired,
  dataHeight: PropTypes.number.isRequired,
  palette: PropTypes.arrayOf( PropTypes.string ).isRequired,
  selectedPaletteIndex: PropTypes.number.isRequired,
  altPaletteIndex: PropTypes.number,
  navigationPanelIsOpen: PropTypes.bool.isRequired,
  referencePanelIsOpen: PropTypes.bool.isRequired,
  selectedTool: PropTypes.string.isRequired,
  selectedTileTool: PropTypes.string.isRequired,
  onDataChange: PropTypes.func.isRequired,
  isTileEditor: PropTypes.bool,
  tileSize: PropTypes.number,
  tilesets: PropTypes.array,
  selectionData: PropTypes.array,
  selectionWidth: PropTypes.number,
  selectionHeight: PropTypes.number,
  onCursorChange: PropTypes.func,
  onEyeDropper: PropTypes.func,
  pixelToolSettings: PropTypes.object.isRequired,
  editorSelection: PropTypes.object,
  onEditorSelectionChange: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onCreateEditorSelection: PropTypes.func.isRequired,
  onRepositionEditorSelection: PropTypes.func.isRequired,
  anyModalIsOpen: PropTypes.bool.isRequired,
};

PixelEditor.defaultProps = {
  children: null,
  isTileEditor: false,
  tileSize: 1,
  tilesets: [],
  selectionData: [],
  selectionWidth: 0,
  selectionHeight: 0,
  altPaletteIndex: 0,
  onCursorChange: null,
  onEyeDropper: null,
  editorSelection: null,
};

function mapStateToProps( state ) {
  return {
    navigationPanelIsOpen: state.layout.navigationPanelIsOpen,
    referencePanelIsOpen: state.layout.referencePanelIsOpen,
    selectedTool: state.pixelTools.selectedTool,
    selectedTileTool: state.pixelTools.selectedTileTool,
    pixelToolSettings: state.pixelTools.pixelToolSettings,
    anyModalIsOpen: state.layout.modalCount > 0,
  };
}

export default connect( mapStateToProps )( PixelEditor );
