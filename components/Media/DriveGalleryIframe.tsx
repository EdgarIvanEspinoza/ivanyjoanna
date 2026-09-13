'use client';
import { useState } from 'react';
import styled from 'styled-components';

// Contenedor para el iframe que garantiza proporciones adecuadas
const IframeContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%; /* Proporción 4:3 - ajustar según necesidades */
  overflow: hidden;
  border: 1px solid #e5dcbf44;
  border-radius: 8px;
  background-color: #2d3321;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const ErrorMessage = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: #e5dcbf;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: #e5dcbf;
  font-size: 1.5rem;
  z-index: 5;
`;

interface DriveGalleryIframeProps {
  folderId: string; // ID de la carpeta de Google Drive
  showUI?: boolean; // Mostrar la interfaz de Google Drive (opcional)
}

export default function DriveGalleryIframe({ folderId, showUI = true }: DriveGalleryIframeProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Construir la URL para el iframe de Google Drive
  const embedUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}${showUI ? '#grid' : '#list'}`;

  return (
    <>
      {error ? (
        <ErrorMessage>
          <p>{error}</p>
          <p>Por favor, intente recargar la página o contacte al administrador.</p>
        </ErrorMessage>
      ) : (
        <IframeContainer>
          {loading && <LoadingOverlay>Cargando galería...</LoadingOverlay>}
          <StyledIframe 
            src={embedUrl}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError('No se pudo cargar la galería de Google Drive.');
            }}
            allow="autoplay"
            title="Google Drive Gallery"
          />
        </IframeContainer>
      )}
    </>
  );
}