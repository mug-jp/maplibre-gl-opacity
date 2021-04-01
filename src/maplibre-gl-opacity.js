// デフォルトオプション設定
const defaultOptions = {
    baseLayers: null,
    overLayers: null,
    opacityControl: false,
};

class OpacityControl {
    constructor(options) {
        // オプション設定
        this._baseLayersOption = options.baseLayers || defaultOptions.baseLayers;
        this._overLayersOption = options.overLayers || defaultOptions.overLayers;
        this._opacityControlOption = options.opacityControl || defaultOptions.opacityControl;
    }

    // ラジオボタン作成
    _radioButtonControlAdd(layerId) {
        // 初期レイヤ定義
        const initLayer = Object.keys(this._baseLayersOption)[0];
        // ラジオボタン追加
        const radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');
        radioButton.id = layerId;
        // 初期レイヤのみ表示
        if (layerId === initLayer) {
            radioButton.checked = true;
            this._map.setLayoutProperty(layerId, 'visibility', 'visible');
        } else {
            this._map.setLayoutProperty(layerId, 'visibility', 'none');
        }
        this._container.appendChild(radioButton);
        // ラジオボタンイベント
        radioButton.addEventListener('change', (event) => {
            // 選択レイヤ表示
            event.target.checked = true;
            this._map.setLayoutProperty(layerId, 'visibility', 'visible');
            // 選択レイヤ以外非表示
            Object.keys(this._baseLayersOption).map((layer) => {
                if (layer !== event.target.id) {
                    document.getElementById(layer).checked = false;
                    this._map.setLayoutProperty(layer, 'visibility', 'none');
                }
            });
        });
        // レイヤ名追加
        const layerName = document.createElement('span');
        layerName.appendChild(document.createTextNode(this._baseLayersOption[layerId]));
        this._container.appendChild(layerName);
    }

    // チェックボックス作成
    _checkBoxControlAdd(layerId) {
        // チェックボックス追加
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.id = layerId;
        // 全レイヤ非表示
        this._map.setLayoutProperty(layerId, 'visibility', 'none');
        this._container.appendChild(checkBox);
        // チェックボックスイベント
        checkBox.addEventListener('change', (event) => {
            // レイヤの表示・非表示
            if (event.target.checked) {
                this._map.setLayoutProperty(layerId, 'visibility', 'visible');
            } else {
                this._map.setLayoutProperty(layerId, 'visibility', 'none');
            }
        });
        // レイヤ名追加
        const layerName = document.createElement('span');
        layerName.appendChild(document.createTextNode(this._overLayersOption[layerId]));
        this._container.appendChild(layerName);
    }

    // スライドバー作成
    _rangeControlAdd(layerId) {
        // スライドバー追加
        const range = document.createElement('input');
        range.type = 'range';
        range.min = 0;
        range.max = 100;
        range.value = 100;
        this._container.appendChild(range);
        // スライドバースイベント
        range.addEventListener('input', (event) => {
            // 透過度設定
            this._map.setPaintProperty(layerId, 'raster-opacity', Number(event.target.value / 100));
        });
    }

    // コントロール作成
    _opacityControlAdd() {
        // コントロール設定
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.id = 'opacity-control';
        // 背景レイヤ設定
        if (this._baseLayersOption) {
            Object.keys(this._baseLayersOption).map((layer) => {
                const layerId = layer;
                const br = document.createElement('br');
                // ラジオボタン作成
                this._radioButtonControlAdd(layerId);
                this._container.appendChild(br);
            });
        }
        // 区切り線
        if (this._baseLayersOption && this._overLayersOption) {
            const hr = document.createElement('hr');
            this._container.appendChild(hr);
        }
        // オーバーレイヤ設定
        if (this._overLayersOption) {
            Object.keys(this._overLayersOption).map((layer) => {
                const layerId = layer;
                const br = document.createElement('br');
                // チェックボックス作成
                this._checkBoxControlAdd(layerId);
                this._container.appendChild(br);
                // スライドバー作成
                if (this._opacityControlOption) {
                    this._rangeControlAdd(layerId);
                    this._container.appendChild(br);
                }
            });
        }
    }

    onAdd(map) {
        this._map = map;
        // コントロール作成
        this._opacityControlAdd();
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = null;
    }
}

export default OpacityControl;
