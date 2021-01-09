import { useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";

const randCar = [
  "https://alaps-photos-kl.kcdn.kz/webp/82/824e2794-01fb-4c5b-a857-96384d18a1c7/",
  "https://alaps-photos-kl.kcdn.kz/webp/20/2075262d-13f7-4d8a-a8a8-8a55f8411d36/",
  "https://alaps-photos-kl.kcdn.kz/webp/4f/4ffc8963-65ba-44ef-a5a1-dcc69e5ebd06/",
  "https://alaps-photos-kl.kcdn.kz/webp/51/51385609-4f24-49f0-9a2f-0424df71c702/",
];

const photoSrc = `${randCar[Math.floor(Math.random() * randCar.length)]}${
  Math.floor(Math.random() * 6) + 1
}-full.webp`;

function App() {
  const [top, setTop] = useState(550);
  const [left, setLeft] = useState(450);
  const [deg, setDeg] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [width, setWidth] = useState(280);
  const [height, setHeight] = useState(130);

  const TestButton = () => {
    html2canvas(document.querySelector(".canva"), {
      letterRendering: 1,
      allowTaint: true,
      useCORS: true,
      // onRendered: (canvas) => console.log(canvas),
    }).then((canvas) => {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "html_image.png";
      link.href = canvas.toDataURL("image/png");
      link.target = "_blank";
      link.click();
    });
  };

  return (
    <div className="App">
      <div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 150,
            backgroundColor: "#f8efdfb0",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="tools"
        >
          <button onClick={TestButton}>Download</button>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="turn">Повернуть</label>
            <input
              id="turn"
              type="range"
              min="0"
              max="360"
              value={deg}
              onChange={(e) => setDeg(e.target.value)}
              step="1"
              placeholder="Повернуть"
            />
          </div>
          <div>
            <label htmlFor="positiontop">↕️ По вертикали (top)</label>
            <input
              style={{ width: "60vw" }}
              id="positiontop"
              type="range"
              min="-10"
              max="3000"
              value={top}
              onChange={(e) => setTop(e.target.value)}
              step="1"
            />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label htmlFor="positionleft">↔️ По горизонтали (left)</label>
            <input
              style={{ width: "60vw" }}
              id="positionleft"
              type="range"
              min="-10"
              max="2000"
              value={left}
              onChange={(e) => setLeft(e.target.value)}
              step="1"
            />
          </div>

          <div>
            <label htmlFor="skewtop">Кривизна по вертикали (top)</label>
            <input
              style={{ width: 300 }}
              id="skewtop"
              type="range"
              min="-80"
              max="80"
              value={skewY}
              onChange={(e) => setSkewY(e.target.value)}
              step="1"
            />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label htmlFor="skewleft">Кривизна по горизонтали (left)</label>
            <input
              style={{ width: 300 }}
              id="skewleft"
              type="range"
              min="-80"
              max="80"
              value={skewX}
              onChange={(e) => setSkewX(e.target.value)}
              step="1"
            />
          </div>

          <div>
            <label htmlFor="height">Высота</label>
            <input
              style={{ width: 600 }}
              id="height"
              type="range"
              min="10"
              max="600"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              step="1"
            />
          </div>
          <div>
            <label htmlFor="width">Ширина</label>
            <input
              style={{ width: 600 }}
              id="width"
              type="range"
              min="20"
              max="600"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              step="1"
            />
          </div>
        </div>
        <div
          className="canva"
          id="canva"
          style={{ width: "100%", height: "100%" }}
        >
          <div
            // onClick={editImage}
            // onMouseMove={dragEnd}
            // onDragEnd={dragEnd}
            // onDrag={changePosition}
            style={{
              position: "absolute",
              top: `${top}px`,
              left: `${left}px`,
              transform: `rotate(${deg}deg) skewX(${skewX}deg) skewY(${skewY}deg)`,
            }}
          >
            <img
              style={{
                borderRadius: "4px",
                objectFit: "contain",
                backgroundColor: "#036fc6",
              }}
              width={width}
              height={height}
              src="https://yt3.ggpht.com/ytc/AAUvwngX1zHKQDJeZAtZVOh6OHp_6fB5n-sukiRtSW6FJw=s900-c-k-c0x00ffffff-no-rj"
              alt=""
            />
          </div>
          <img
            style={{ width: "100%", height: "100%" }}
            src={photoSrc}
            alt="editing"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
