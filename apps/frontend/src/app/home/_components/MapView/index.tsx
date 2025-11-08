'use client'

import { useState } from 'react'
import { Map as MapGL, type ViewState } from 'react-map-gl'
import styles from './index.module.css'

const INITIAL_VIEW_STATE = {
  longitude: 139.767125,
  latitude: 35.681236,
  zoom: 14,
}

export const MapView = () => {
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE)

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!mapboxToken) {
    console.error('Mapbox Access Token が .env.local で設定されていません。')
    return <div className={styles.error}>Mapbox トークンがありません。</div>
  }

  return (
    <div className={styles.mapContainer}>
      <MapGL
        {...viewState}
        mapboxAccessToken={mapboxToken}
        onMove={(evt: { viewState: ViewState }) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
