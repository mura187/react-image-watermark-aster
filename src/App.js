import { useState } from "react";
import html2canvas from "html2canvas";
import Hammer from "react-hammerjs";
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
  const [isSaved, setSaved] = useState(false);
  const [white, setWhite] = useState(false);
  const [svg, setSvg] = useState(false);
  const [imgWidth, setImgWidth] = useState("80%");
  const [imgHeight, setImgHeight] = useState("80%");
  const testBtn = () => {
    setSaved(true);
    setLeft(left + 10);
    setTop(top + 10);
    // setImgWidth("100%");
    // setImgHeight("100%");
  };

  const downloadButton = () => {
    // setLeft(left + 10);
    // setTop(top + 17);
    html2canvas(document.querySelector(".canva"), {
      letterRendering: 1,
      allowTaint: true,
      useCORS: true,
      // onRendered: (canvas) => console.log(canvas),
    }).then((canvas) => {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "aster_image.png";
      link.href = canvas.toDataURL("image/png");
      link.target = "_blank";
      link.click();
      setSaved(false);
    });
  };

  const dragEnd = (e) => {
    // console.log(e);
    setLeft(e.center.x - 25);
    setTop(e.center.y - 10);
  };
  const handleWidth = (e) => {
    console.log("width", e);
    if (width > 100 && e.additionalEvent === "panright") {
      setWidth(width + 2);
    }
    if (width > 100 && e.additionalEvent === "panleft") {
      setWidth(width - 2);
    }
  };

  const handleHeight = (e) => {
    console.log("height", e);
    if (height > 70 && e.additionalEvent === "panup") {
      setHeight(height + 2);
    }
    if (height > 70 && e.additionalEvent === "pandown") {
      setHeight(height - 2);
    }
  };
  return (
    <div className="App">
      <div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            backgroundColor: "#f8efdfb0",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="tools"
        >
          <button
            style={{ width: "50%" }}
            disabled={!isSaved}
            onClick={downloadButton}
          >
            Скачать ⬇️
          </button>
          <button style={{ width: "50%" }} onClick={testBtn}>
            Сохранить 💾
          </button>
          <div style={{ margin: "8px 0" }}>
            <label htmlFor="white">Белый лого</label>
            <input
              id="white"
              type="checkbox"
              value={white}
              onChange={() => (white ? setWhite(false) : setWhite(true))}
              placeholder="Белый лого"
            />
          </div>
          <div style={{ margin: "8px 0" }}>
            <label htmlFor="forsvg">SVG</label>
            <input
              id="forsvg"
              type="checkbox"
              value={svg}
              onChange={() => (white ? setSvg(false) : setSvg(true))}
              placeholder="SVG"
            />
          </div>
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
            <label htmlFor="positiontop">По вертикали⏫⏬</label>
            <input
              style={{ width: "60vw" }}
              id="positiontop"
              type="range"
              min="-10"
              max="3000"
              value={top}
              onChange={(e) => setTop(+e.target.value)}
              step="1"
            />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label htmlFor="positionleft">По горизонтали⏪⏩</label>
            <input
              style={{ width: "60vw" }}
              id="positionleft"
              type="range"
              min="-10"
              max="2000"
              value={left}
              onChange={(e) => setLeft(+e.target.value)}
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
            {!isSaved && (
              <>
                <Hammer
                  direction="DIRECTION_VERTICAL"
                  onPan={handleHeight}
                  options={{
                    recognizers: {
                      pinch: { enable: true },
                    },
                  }}
                >
                  <img
                    width={`${(width * 20) / 100}px`}
                    height={`${(height * 20) / 100}px`}
                    src="/vert-arrow.svg"
                    alt=""
                    style={{
                      marginLeft: `${width - 120}px`,
                      background: "#7e8080ba",
                      padding: 4,
                      borderRadius: 5,
                    }}
                  />
                </Hammer>
              </>
            )}
            <Hammer
              onPan={dragEnd}
              options={{
                recognizers: {
                  pinch: { enable: true },
                },
              }}
            >
              <img
                style={{
                  borderRadius: "4px",
                }}
                width={width}
                height={height}
                src={`/aster-carplate${white ? "-white" : ""}.${
                  svg ? "svg" : "png"
                }`}
                alt=""
              />
            </Hammer>
            {!isSaved && (
              <Hammer
                direction="DIRECTION_HORIZONTAL"
                onPan={handleWidth}
                options={{
                  recognizers: {
                    pinch: { enable: true },
                  },
                }}
              >
                <img
                  width={`${(width * 20) / 100}px`}
                  height={`${(height * 20) / 100}px`}
                  src="/vert-arrow.svg"
                  alt=""
                  style={{
                    marginLeft: `${height - 120}px`,
                    transform: "rotate(90deg)",
                    background: "#7e8080ba",
                    padding: 8,
                    borderRadius: 5,
                  }}
                />
              </Hammer>
            )}
          </div>
          <img
            style={{ width: imgWidth, height: imgHeight }}
            src={photoSrc}
            alt="editing"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
