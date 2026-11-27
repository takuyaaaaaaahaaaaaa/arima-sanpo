# 有馬さんぽ

有馬温泉の食べ歩き・観光スポットを探し、お気に入りから徒歩散策ルートを作る静的Webアプリです。旅行前と旅行中にスマートフォンで利用できます。

**公開先:** https://takuyaaaaaaahaaaaaa.github.io/arima-sanpo/

## 開発

`python3 -m http.server 4173` でローカルプレビュー。`npm run build` で構文・掲載データ・写真出典を検証し、`npm test` で徒歩経路の基本動作を検証します。依存パッケージのインストールは不要です。GitHub Pages は `main` ブランチのルートを公開します。

スポット追加・更新は `data/spots.json`、写真追加は `data/photos.json` と `assets/` を編集します。未確認の価格・営業・位置は `null` にし、推測値を入れないでください。2026年12月29日・30日の営業は通常営業と別に `yearEnd` へ記録します。

## データと制約

有馬温泉観光協会の[公式散策マップ](https://stroly.com/maps/1706503555)、各店舗公式情報、OpenStreetMapを参照。掲載の確認日は2026年11月28日ですが、すべての店舗の営業継続・年末営業を確認したわけではありません。位置が確認できないスポットは地図ピンを出しません。価格を確認できない場合は「価格未確認」と表示します。

地図・徒歩道路データは © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)、ODbL。歩行ルートは道路ネットワークで計算し、階段には負担の重み付けをしています。標高・通行止め・店舗入口までの接続・現地の混雑を反映していません。直線距離を徒歩距離として表示しません。

写真は [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Arima_Onsen) のCCライセンス作品を縮小・圧縮して使用。各作品の作者・出典・ライセンスは `data/photos.json` とアプリ内の詳細に記載しています。写真のないカードは専用デザインで表示します。外部のLeaflet・MarkerCluster・OpenStreetMapタイルはインターネット接続が必要です。タイルは公式タイルサーバーへの通常の閲覧リクエストのみで、オフライン保存や大量取得は行いません。

お気に入りは利用者の端末のlocalStorageに保存され、アカウントやサーバーには送信されません。
