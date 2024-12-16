// script.js

// 気象庁APIのURL
const apiURL = "https://www.jma.go.jp/bosai/forecast/data/forecast/010000.json";

// 各地域のエリアコード
const areaCodes = {
    kushiro: "160010", // 釧路地方
    tokyo: "130010",   // 東京地方
    saitama: "110010"  // 埼玉地方
};

// 地域データを取得して表示する関数
async function fetchWeather(region) {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        // 該当地域のデータを取得
        const areaData = data[0].timeSeries[0].areas.find(area => area.area.code === areaCodes[region]);
        const tempData = data[0].timeSeries[1].areas.find(area => area.area.code === areaCodes[region]);

        // 今日と明日の天気
        const todayWeather = areaData.weathers[0];
        const tomorrowWeather = areaData.weathers[1];

        // 今日と明日の気温
        const todayMinTemp = tempData.temps[0];
        const todayMaxTemp = tempData.temps[1];
        const tomorrowMinTemp = tempData.temps[2];
        const tomorrowMaxTemp = tempData.temps[3];

        // HTMLに反映
        document.querySelector(".region-name").textContent = region === "kushiro" ? "釧路" : region === "tokyo" ? "東京" : "埼玉";
        document.querySelector(".weather").textContent = todayWeather;
        document.querySelector(".min-temp").textContent = todayMinTemp || "-";
        document.querySelector(".max-temp").textContent = todayMaxTemp || "-";
        document.querySelector(".weather-tomorrow").textContent = tomorrowWeather;
        document.querySelector(".min-temp-tomorrow").textContent = tomorrowMinTemp || "-";
        document.querySelector(".max-temp-tomorrow").textContent = tomorrowMaxTemp || "-";

    } catch (error) {
        console.error("天気データの取得に失敗しました:", error);
    }
}

// 初期表示とプルダウンメニューの設定
document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById("region-select");

    // 初期表示（釧路地方）
    fetchWeather("kushiro");

    // 地域切り替え時のイベント
    selectElement.addEventListener("change", () => {
        const selectedRegion = selectElement.value;
        fetchWeather(selectedRegion);
    });
});
