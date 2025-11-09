declare module 'react-map-gl' {
  import * as React from 'react'
  import type { MapboxOptions, Map as MapboxMap } from 'mapbox-gl'

  export interface ViewState {
    longitude: number
    latitude: number
    zoom: number
    bearing?: number
    pitch?: number
  }

  export interface MapProps extends Partial<MapboxOptions> {
    mapboxAccessToken: string
    mapStyle: string
    onMove?: (event: { viewState: ViewState }) => void
    style?: React.CSSProperties
  }

  export default class MapGL extends React.Component<MapProps> {
    getMap(): MapboxMap
  }
}
