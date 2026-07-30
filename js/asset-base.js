/**
 * Elyce WMS v3.1.1 — Resolución de rutas de assets vs URL (/experiencia vs .html)
 */
(function (global) {
  'use strict';

  function resolveAsset(path) {
    return new URL(path, window.location.href).href;
  }

  global.ElyceAssets = {
    resolve: resolveAsset
  };
})(typeof window !== 'undefined' ? window : this);
