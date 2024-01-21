import type { IControl, Map } from 'maplibre-gl';

type OpacityControlOption = {
  baseLayers: Record<string, string>,
  overLayers: Record<string, string>,
  opacityControl: boolean,
}

export default class OpacityControl implements IControl {
  constructor(options: Partial<OpacityControlOption>);
  onAdd(map: Map): HTMLElement;
  onRemove(): void;
}

export {}