import React, { useState } from "react";

const words = [
  { id: 1, word: "apple", meaning: "りんご", color: "#c1121f" },
  { id: 2, word: "grape", meaning: "ブドウ", color: "#480ca8" },
  { id: 3, word: "forest", meaning: "森", color: "#283618" }
];

// カード1枚ごとのコンポーネント
const WordCard = ({ item }) => {
  const [isFront, setIsFront] = useState(true);

  return (
    <div style={styles.page}>
      <div 
        style={{ ...styles.card, backgroundColor: item.color }} 
        onClick={() => setIsFront(!isFront)}
        className="card-touchable"
      >
        <h1 style={styles.text}>
          {isFront ? item.word : item.meaning}
        </h1>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div style={styles.safeArea}>
      {/* PagerView の役割を果たすコンテナ */}
      <div style={styles.pagerView} className="hide-scrollbar">
        {words.map((item) => (
          <WordCard key={item.id} item={item} />
        ))}
      </div>

      {/* インラインCSS（擬似クラス用） */}
      <style>{`
        .card-touchable {
          transition: opacity 0.1s, transform 0.1s;
          cursor: pointer;
          user-select: none;
        }
        .card-touchable:active {
          opacity: 0.8;
          transform: scale(0.98);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari用スクロールバー非表示 */
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE, Edge用 */
          scrollbar-width: none;  /* Firefox用 */
        }
      `}</style>
    </div>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  pagerView: {
    flex: 1,
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory", // 横方向のスナップを有効化
    WebkitOverflowScrolling: "touch",
  },
  page: {
    minWidth: "100vw", // 1ページを画面幅いっぱいに
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    scrollSnapAlign: "start", // スナップの停止位置
  },
  card: {
    width: "100%",
    maxWidth: "500px", // PCで見たときに広がりすぎないように制限
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    color: "#ffffff",
  },
  text: {
    fontSize: "40px",
    fontWeight: "bold",
    margin: 0,
    fontFamily: "sans-serif",
  },
};